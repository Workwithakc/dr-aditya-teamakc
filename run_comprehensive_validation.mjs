import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const outDir = 'j:\\Web_Agency\\01_Client_Projects\\Dr.aditya-teamakc-main\\validation_artifacts';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const chromeProcess = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9223',
  '--remote-allow-origins=*',
  '--user-data-dir=C:\\Users\\aksha\\AppData\\Local\\Temp\\chrome_val_profile',
  '--no-first-run',
  '--no-default-browser-check'
]);

await new Promise(r => setTimeout(r, 1800));

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

const version = await getJson('http://127.0.0.1:9223/json/version');
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);

let id = 1;
function send(method, params = {}) {
  return new Promise(resolve => {
    const msgId = id++;
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === msgId) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
}

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

function sendSession(method, params = {}) {
  return new Promise(resolve => {
    const msgId = id++;
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === msgId) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, sessionId, method, params }));
  });
}

await sendSession('Runtime.enable');
await sendSession('Page.enable');
await sendSession('DOM.enable');

const testResults = [];

async function setViewport(width, height) {
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 900
  });
}

async function captureScreenshot(filename) {
  const { data } = await sendSession('Page.captureScreenshot', { format: 'png' });
  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
  console.log(`Saved screenshot: ${filename}`);
}

async function evalInPage(fnStr) {
  const res = await sendSession('Runtime.evaluate', {
    expression: `(${fnStr})()`,
    returnByValue: true
  });
  return res.result.value;
}

try {
  console.log('=== STARTING AUTOMATED CLINICAL & RESPONSIVE VALIDATION SUITE ===\n');

  // 1. HOMEPAGE MOBILE & DESKTOP TESTS
  console.log('--- TEST 1: Homepage Mobile (390px) & Desktop (1280px) ---');
  await setViewport(390, 844);
  await sendSession('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2000));

  const homeMobileCheck = await evalInPage(() => {
    const heroCopy = document.querySelector('.hero-copy');
    const heroHeading = document.querySelector('.hero-heading');
    const heroEyebrow = document.querySelector('.hero-eyebrow');
    const heroActions = document.querySelector('.hero-actions');
    const heroPhoto = document.querySelector('.hero-photo');
    const doctorCard = document.querySelector('.hero-doctor-card');
    const photoCaption = document.querySelector('.photo-caption');
    const allDoctorImgs = Array.from(document.querySelectorAll('img')).filter(img => 
      img.src.includes('dr-aditya-portrait') || img.src.includes('dr-aditya.webp')
    );

    const docWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;

    return {
      hasHorizontalOverflow: scrollWidth > docWidth + 1,
      docWidth,
      scrollWidth,
      heroCopyTextAlign: window.getComputedStyle(heroCopy).textAlign,
      heroHeadingTextAlign: window.getComputedStyle(heroHeading).textAlign,
      heroEyebrowJustify: window.getComputedStyle(heroEyebrow).justifyContent,
      heroActionsJustify: window.getComputedStyle(heroActions).justifyContent,
      heroPhotoAspectRatio: window.getComputedStyle(heroPhoto).aspectRatio,
      photoCaptionExists: !!photoCaption,
      doctorCardPosition: window.getComputedStyle(doctorCard).position,
      doctorCardMarginTop: window.getComputedStyle(doctorCard).marginTop,
      doctorCardBottom: window.getComputedStyle(doctorCard).bottom,
      doctorImgCountOnHome: allDoctorImgs.length,
      doctorName: doctorCard?.querySelector('strong')?.innerText,
      doctorDegrees: doctorCard?.querySelector('.doctor-card-degrees')?.innerText,
    };
  });

  console.log('Home Mobile Check:', homeMobileCheck);
  testResults.push({
    name: 'Home Mobile Zero Overflow',
    pass: !homeMobileCheck.hasHorizontalOverflow
  });
  testResults.push({
    name: 'Home Mobile Copy Center-Aligned',
    pass: homeMobileCheck.heroCopyTextAlign === 'center'
  });
  testResults.push({
    name: 'Home Doctor Portrait Whole View (aspect ratio 0.68)',
    pass: homeMobileCheck.heroPhotoAspectRatio.includes('0.68') || homeMobileCheck.heroPhotoAspectRatio.includes('17 / 25')
  });
  testResults.push({
    name: 'Home No Duplicate Name-over-name Caption',
    pass: !homeMobileCheck.photoCaptionExists
  });
  testResults.push({
    name: 'Home Only 1 Doctor Photo on Entire Page',
    pass: homeMobileCheck.doctorImgCountOnHome === 1
  });

  await captureScreenshot('01_home_mobile.png');

  // Desktop view
  await setViewport(1280, 800);
  await new Promise(r => setTimeout(r, 1000));
  const homeDesktopCheck = await evalInPage(() => {
    return {
      hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    };
  });
  testResults.push({
    name: 'Home Desktop Zero Overflow',
    pass: !homeDesktopCheck.hasHorizontalOverflow
  });
  await captureScreenshot('02_home_desktop.png');

  // TEST 1B: Booking Dialog & Calendly Integration
  console.log('\n--- TEST 1B: Booking Dialog & Calendly Integration ---');
  await evalInPage(() => {
    const bookBtn = document.querySelector('[data-testid="hero-book"]');
    if (bookBtn) bookBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  const bookingDialogCheck = await evalInPage(() => {
    const dialog = document.querySelector('[data-testid="booking-dialog"]');
    const tabCalendar = document.querySelector('[data-testid="booking-tab-calendar"]');
    const tabWhatsapp = document.querySelector('[data-testid="booking-tab-whatsapp"]');
    const calendlyIframe = document.querySelector('[data-testid="booking-calendly-iframe"]');
    const externalLink = document.querySelector('[data-testid="booking-calendly-external-link"]');
    return {
      dialogExists: !!dialog,
      tabCalendarActive: tabCalendar?.classList.contains('active'),
      tabWhatsappExists: !!tabWhatsapp,
      iframeSrc: calendlyIframe?.src,
      externalLinkHref: externalLink?.href
    };
  });
  console.log('Booking Dialog Check:', bookingDialogCheck);
  testResults.push({
    name: 'Booking Dialog Opens with Calendly Tab Active',
    pass: bookingDialogCheck.dialogExists && bookingDialogCheck.tabCalendarActive
  });
  testResults.push({
    name: 'Calendly Embed URL Configured Correctly',
    pass: !!bookingDialogCheck.iframeSrc && bookingDialogCheck.iframeSrc.includes('calendly.com/siddharthgunay/orthopaedic-consultation-dr-siddharth-gunay')
  });

  // Switch to WhatsApp tab in dialog
  await evalInPage(() => {
    const tabWhatsapp = document.querySelector('[data-testid="booking-tab-whatsapp"]');
    if (tabWhatsapp) tabWhatsapp.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const whatsappTabCheck = await evalInPage(() => {
    const nameInput = document.querySelector('[data-testid="booking-name-input"]');
    const phoneInput = document.querySelector('[data-testid="booking-phone-input"]');
    const serviceSelect = document.querySelector('[data-testid="booking-service-select"]');
    const locationSelect = document.querySelector('[data-testid="booking-location-select"]');
    return {
      nameInputExists: !!nameInput,
      phoneInputExists: !!phoneInput,
      serviceSelectExists: !!serviceSelect,
      locationSelectExists: !!locationSelect
    };
  });
  console.log('WhatsApp Tab Check:', whatsappTabCheck);
  testResults.push({
    name: 'Booking Dialog Switches to WhatsApp Form with All Features',
    pass: whatsappTabCheck.nameInputExists && whatsappTabCheck.phoneInputExists && whatsappTabCheck.serviceSelectExists && whatsappTabCheck.locationSelectExists
  });

  // Close dialog via escape key
  await sendSession('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await sendSession('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await new Promise(r => setTimeout(r, 800));

  // 2. FETAL MEDICINE PAGE TESTS
  console.log('\n--- TEST 2: Fetal Medicine Page (/fetal-medicine) ---');
  await sendSession('Page.navigate', { url: 'http://localhost:3000/fetal-medicine' });
  await new Promise(r => setTimeout(r, 2000));

  const fetalCheck = await evalInPage(() => {
    const showcase = document.querySelector('[data-testid="fetal-clinical-showcase"]');
    const cards = Array.from(document.querySelectorAll('.clinical-card'));
    const faceCard = cards.find(c => c.innerText.includes('3D imaging of face in 3rd trimester'));
    const twinsCard = cards.find(c => c.innerText.includes('3D imaging of the baby has unparalleled aesthetic value'));
    const kalyanScanCard = cards.find(c => c.innerText.includes('Alfi Diagnostics & Smart Clinics, Kalyan'));
    const thaneClinicCard = cards.find(c => c.innerText.includes('Ova Fertility & Women Care, Tieten Medicity'));

    const docWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;

    return {
      hasHorizontalOverflow: scrollWidth > docWidth + 1,
      showcaseExists: !!showcase,
      cardCount: cards.length,
      faceCardFound: !!faceCard,
      twinsCardFound: !!twinsCard,
      kalyanScanCardFound: !!kalyanScanCard,
      thaneClinicCardFound: !!thaneClinicCard
    };
  });

  console.log('Fetal Medicine Check:', fetalCheck);
  testResults.push({
    name: 'Fetal Medicine Zero Overflow',
    pass: !fetalCheck.hasHorizontalOverflow
  });
  testResults.push({
    name: 'Fetal Medicine Clinical Showcase Rendered',
    pass: fetalCheck.showcaseExists && fetalCheck.cardCount >= 6
  });
  testResults.push({
    name: 'Fetal 3D Face Scan Caption Exact Match',
    pass: fetalCheck.faceCardFound
  });
  testResults.push({
    name: 'Fetal 3D Baby Scan Caption Exact Match',
    pass: fetalCheck.twinsCardFound
  });
  testResults.push({
    name: 'Fetal Kalyan & Thane Facility Cards Present',
    pass: fetalCheck.kalyanScanCardFound && fetalCheck.thaneClinicCardFound
  });

  // Test modal click on fetal page
  await evalInPage(() => {
    const firstCard = document.querySelector('.clinical-card');
    if (firstCard) firstCard.click();
  });
  await new Promise(r => setTimeout(r, 500));
  const dialogOpen = await evalInPage(() => {
    const dialog = document.querySelector('[data-testid="clinical-dialog"]');
    const img = document.querySelector('[data-testid="clinical-dialog-image"]');
    return {
      dialogExists: !!dialog,
      imageSrc: img?.src
    };
  });
  testResults.push({
    name: 'Fetal Medicine Lightbox Dialog Opens with High-Res Image',
    pass: dialogOpen.dialogExists && !!dialogOpen.imageSrc
  });
  await captureScreenshot('03_fetal_medicine_dialog.png');

  // Close dialog
  await evalInPage(() => {
    const closeBtn = document.querySelector('[data-testid="dialog-close-button"]');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await captureScreenshot('04_fetal_medicine_desktop.png');

  // 3. PREGNANCY CARE TESTS
  console.log('\n--- TEST 3: Pregnancy Care Page (/pregnancy-care) ---');
  await sendSession('Page.navigate', { url: 'http://localhost:3000/pregnancy-care' });
  await new Promise(r => setTimeout(r, 2000));

  const pregCheck = await evalInPage(() => {
    const emergencySection = document.querySelector('[data-testid="emergency-obstetric-case"]');
    const quote = document.querySelector('.emergency-quote')?.innerText;
    const statBoxes = Array.from(document.querySelectorAll('.emergency-stat-box')).map(b => b.innerText);
    const gallery = document.querySelector('[data-testid="pregnancy-cases-gallery"]');
    const caseCards = Array.from(document.querySelectorAll('.clinical-case-card'));

    const caseAccreta = caseCards.find(c => c.innerText.includes('Another caesarean hysterectomy done for a woman with placenta accreta spectrum'));
    const case2am = caseCards.find(c => c.innerText.includes('Emergency caesarean section at 2 AM - quite a common occurrence in the life of a gynaecologist'));
    const caseCerclage = caseCards.find(c => c.innerText.includes('Cervical cerclage for a woman with short cervix and multiple abortions'));
    const casePrevia = caseCards.find(c => c.innerText.includes('Caesarean section done for a woman with bleeding placenta previa'));
    const caseRupture = caseCards.find(c => c.innerText.includes('Delivered a baby after a ruptured uterus arrived in a female with history of myomectomy'));
    const caseMulund = caseCards.find(c => c.innerText.includes('Early morning pregnancy OPD at Mulund'));

    const docWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;

    return {
      hasHorizontalOverflow: scrollWidth > docWidth + 1,
      emergencySectionExists: !!emergencySection,
      quoteMatches: quote?.includes('48 instruments, 31 mops, 17 suture materials, 7.5 litres of blood loss'),
      statCount: statBoxes.length,
      galleryExists: !!gallery,
      caseCount: caseCards.length,
      caseAccretaFound: !!caseAccreta,
      case2amFound: !!case2am,
      caseCerclageFound: !!caseCerclage,
      casePreviaFound: !!casePrevia,
      caseRuptureFound: !!caseRupture,
      caseMulundFound: !!caseMulund
    };
  });

  console.log('Pregnancy Care Check:', pregCheck);
  testResults.push({
    name: 'Pregnancy Care Zero Overflow',
    pass: !pregCheck.hasHorizontalOverflow
  });
  testResults.push({
    name: 'Critical Obstetric Surgery Section & Exact Story Match',
    pass: pregCheck.emergencySectionExists && pregCheck.quoteMatches
  });
  testResults.push({
    name: 'All 6 Pregnancy Operative & OPD Cases Verified in Gallery',
    pass: pregCheck.caseAccretaFound && pregCheck.case2amFound && pregCheck.caseCerclageFound && 
          pregCheck.casePreviaFound && pregCheck.caseRuptureFound && pregCheck.caseMulundFound && pregCheck.caseCount === 6
  });
  testResults.push({
    name: 'Ruptured Uterus Post-Myomectomy Case Verified',
    pass: pregCheck.caseRuptureFound
  });
  testResults.push({
    name: 'Mulund Pregnancy OPD Case in Gallery Verified',
    pass: pregCheck.caseMulundFound
  });
  await captureScreenshot('05_pregnancy_care_desktop.png');

  // Mobile check for pregnancy care
  await setViewport(390, 844);
  await new Promise(r => setTimeout(r, 1000));
  const pregMobileOverflow = await evalInPage(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
  });
  testResults.push({
    name: 'Pregnancy Care Mobile Zero Overflow',
    pass: !pregMobileOverflow
  });
  await captureScreenshot('06_pregnancy_care_mobile.png');

  // 4. FERTILITY CARE TESTS
  console.log('\n--- TEST 4: Fertility Care Page (/fertility-care) ---');
  await setViewport(1280, 800);
  await sendSession('Page.navigate', { url: 'http://localhost:3000/fertility-care' });
  await new Promise(r => setTimeout(r, 2000));

  const fertilityCheck = await evalInPage(() => {
    const ivfShowcase = document.querySelector('[data-testid="ivf-milestone-showcase"]');
    const heading = ivfShowcase?.querySelector('h2')?.innerText;
    const bodyText = ivfShowcase?.innerText;
    const docWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;

    return {
      hasHorizontalOverflow: scrollWidth > docWidth + 1,
      ivfShowcaseExists: !!ivfShowcase,
      twinsMentioned: bodyText?.includes('Twins delivered with IVF, PGT-A & ERA')
    };
  });

  console.log('Fertility Care Check:', fertilityCheck);
  testResults.push({
    name: 'Fertility Care Zero Overflow',
    pass: !fertilityCheck.hasHorizontalOverflow
  });
  testResults.push({
    name: 'IVF Twins Milestone Showcase Rendered',
    pass: fertilityCheck.ivfShowcaseExists && fertilityCheck.twinsMentioned
  });
  await captureScreenshot('07_fertility_care_desktop.png');

  // 5. LOCATIONS PAGE TESTS & TAB SWITCHING
  console.log('\n--- TEST 5: Locations Page (/locations) & Facility Images ---');
  await sendSession('Page.navigate', { url: 'http://localhost:3000/locations' });
  await new Promise(r => setTimeout(r, 2000));

  const locCheck = await evalInPage(() => {
    const panel = document.querySelector('[data-testid="location-panel"]');
    const clinicImg = document.querySelector('[data-testid="location-clinic-image"]');
    const docWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;

    return {
      hasHorizontalOverflow: scrollWidth > docWidth + 1,
      panelExists: !!panel,
      clinicImgSrc: clinicImg?.src
    };
  });

  console.log('Locations Thane Check:', locCheck);
  testResults.push({
    name: 'Locations Page Zero Overflow',
    pass: !locCheck.hasHorizontalOverflow
  });
  testResults.push({
    name: 'Locations Authentic Thane Clinic Image Displayed',
    pass: locCheck.panelExists && locCheck.clinicImgSrc.includes('dr-aditya-thane-clinic')
  });

  // Switch to Mulund tab
  await evalInPage(() => {
    const mulundTab = document.querySelector('[data-testid="location-tab-mulund"]');
    if (mulundTab) mulundTab.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const mulundCheck = await evalInPage(() => {
    const clinicImg = document.querySelector('[data-testid="location-clinic-image"]');
    const clinicName = document.querySelector('[data-testid="location-name"]')?.innerText;
    return {
      clinicImgSrc: clinicImg?.src,
      clinicName
    };
  });
  console.log('Locations Mulund Check:', mulundCheck);
  testResults.push({
    name: 'Locations Mulund Tab Shows Authentic OPD Image',
    pass: mulundCheck.clinicImgSrc.includes('dr-aditya-mulund-opd') && mulundCheck.clinicName.includes('Maher Maternity')
  });

  // Switch to Kalyan tab
  await evalInPage(() => {
    const kalyanTab = document.querySelector('[data-testid="location-tab-kalyan"]');
    if (kalyanTab) kalyanTab.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const kalyanCheck = await evalInPage(() => {
    const clinicImg = document.querySelector('[data-testid="location-clinic-image"]');
    const clinicName = document.querySelector('[data-testid="location-name"]')?.innerText;
    return {
      clinicImgSrc: clinicImg?.src,
      clinicName
    };
  });
  console.log('Locations Kalyan Check:', kalyanCheck);
  testResults.push({
    name: 'Locations Kalyan Tab Shows Authentic Fetal Scan Image',
    pass: kalyanCheck.clinicImgSrc.includes('dr-aditya-fetal-scan-kalyan') && kalyanCheck.clinicName.includes('Alfi Diagnostics')
  });
  await captureScreenshot('08_locations_desktop.png');

  // 6. ALL OTHER ROUTES RESPONSIVE ZERO OVERFLOW VERIFICATION
  console.log('\n--- TEST 6: Multi-Page Multi-Device Responsiveness (Mobile 390px, Tablet 768px, Desktop 1280px) ---');
  const otherPages = [
    { url: 'http://localhost:3000/gynecology-care', name: 'Gynecology Care' },
    { url: 'http://localhost:3000/about', name: 'About Dr. Aditya' },
    { url: 'http://localhost:3000/contact', name: 'Contact & Appointments' },
    { url: 'http://localhost:3000/faq', name: 'FAQs' },
    { url: 'http://localhost:3000/patient-stories', name: 'Patient Stories' }
  ];

  for (const page of otherPages) {
    // Desktop 1280px
    await setViewport(1280, 800);
    await sendSession('Page.navigate', { url: page.url });
    await new Promise(r => setTimeout(r, 1200));
    let hasOverflow = await evalInPage(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    testResults.push({
      name: `${page.name} [Desktop 1280px] Zero Overflow`,
      pass: !hasOverflow
    });

    // Tablet 768px
    await setViewport(768, 1024);
    await new Promise(r => setTimeout(r, 800));
    hasOverflow = await evalInPage(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    testResults.push({
      name: `${page.name} [Tablet 768px] Zero Overflow`,
      pass: !hasOverflow
    });

    // Mobile 390px
    await setViewport(390, 844);
    await new Promise(r => setTimeout(r, 800));
    hasOverflow = await evalInPage(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    testResults.push({
      name: `${page.name} [Mobile 390px] Zero Overflow`,
      pass: !hasOverflow
    });
  }

  // Print Test Summary
  console.log('\n========================================');
  console.log('        TEST SUITE FINAL SUMMARY        ');
  console.log('========================================');
  let passedCount = 0;
  testResults.forEach((t, i) => {
    const mark = t.pass ? '✓ PASS' : '✗ FAIL';
    if (t.pass) passedCount++;
    console.log(`${mark} [${i + 1}/${testResults.length}] ${t.name}`);
  });
  console.log(`\nTOTAL: ${passedCount}/${testResults.length} tests passed.`);

  await send('Target.closeTarget', { targetId });
  ws.close();
} catch (e) {
  console.error('Validation test error:', e);
} finally {
  chromeProcess.kill();
}
