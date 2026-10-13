import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const outDir = 'j:\\Web_Agency\\01_Client_Projects\\Dr.aditya-teamakc-main\\audit_screenshots';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Start Chrome headless
const chromeProcess = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9224',
  '--remote-allow-origins=*',
  '--user-data-dir=C:\\Users\\aksha\\AppData\\Local\\Temp\\chrome_audit_profile',
  '--no-first-run',
  '--no-default-browser-check'
]);

await new Promise(r => setTimeout(r, 2000));

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

const version = await getJson('http://127.0.0.1:9224/json/version');
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

// Set sessionStorage to bypass preloader during audit
await sendSession('Page.navigate', { url: 'http://localhost:3000/' });
await new Promise(r => setTimeout(r, 1000));
await sendSession('Runtime.evaluate', {
  expression: `sessionStorage.setItem('agy_preloaded', 'true');`
});

const viewports = [
  { name: 'android-small', width: 360, height: 800, mobile: true },
  { name: 'iphone-se', width: 375, height: 667, mobile: true },
  { name: 'iphone-14', width: 390, height: 844, mobile: true },
  { name: 'samsung-s20', width: 412, height: 915, mobile: true },
  { name: 'ipad-portrait', width: 768, height: 1024, mobile: false },
  { name: 'ipad-pro', width: 1024, height: 768, mobile: false },
  { name: 'pc-desktop', width: 1440, height: 900, mobile: false }
];

const routes = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/fetal-medicine', name: 'fetal-medicine' },
  { path: '/fertility-care', name: 'fertility-care' },
  { path: '/pregnancy-care', name: 'pregnancy-care' },
  { path: '/gynaecology', name: 'gynaecology' },
  { path: '/patient-stories', name: 'stories' },
  { path: '/resources', name: 'resources' },
  { path: '/locations', name: 'locations' },
  { path: '/contact', name: 'contact' }
];

async function setViewport(width, height, mobile) {
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile
  });
}

const auditFindings = [];

for (const vp of viewports) {
  await setViewport(vp.width, vp.height, vp.mobile);

  for (const route of routes) {
    await sendSession('Page.navigate', { url: `http://localhost:3000${route.path}` });
    await new Promise(r => setTimeout(r, 600));

    // Audit script inside page
    const res = await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        const hasHorizontalOverflow = scrollWidth > docWidth + 1 || bodyScrollWidth > docWidth + 1;

        // Find any elements exceeding docWidth
        const allElements = Array.from(document.querySelectorAll('*'));
        const overflowingElements = [];
        for (const el of allElements) {
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 2) {
            overflowingElements.push({
              tag: el.tagName.toLowerCase(),
              className: (typeof el.className === 'string' ? el.className : '').slice(0, 60),
              id: el.id || '',
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              docWidth
            });
            if (overflowingElements.length >= 8) break;
          }
        }

        // Check text alignment issues in headings
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, .display-heading, .hero-heading')).map(h => ({
          text: h.innerText.slice(0, 30),
          textAlign: window.getComputedStyle(h).textAlign,
          width: Math.round(h.getBoundingClientRect().width)
        }));

        // Check images with 0 width/height
        const brokenImages = Array.from(document.querySelectorAll('img')).filter(img => {
          const r = img.getBoundingClientRect();
          return (r.width === 0 || r.height === 0) && img.offsetParent !== null;
        }).map(img => img.src);

        return {
          docWidth,
          scrollWidth,
          bodyScrollWidth,
          hasHorizontalOverflow,
          overflowingElements,
          brokenImages
        };
      })()`,
      returnByValue: true
    });

    const data = res.result.value;
    if (data.hasHorizontalOverflow || data.overflowingElements.length > 0 || data.brokenImages.length > 0) {
      auditFindings.push({
        viewport: vp.name,
        width: vp.width,
        route: route.path,
        hasOverflow: data.hasHorizontalOverflow,
        scrollDiff: data.scrollWidth - data.docWidth,
        overflowingElements: data.overflowingElements,
        brokenImages: data.brokenImages
      });
    }

    // Take screenshots for mobile-small, iphone-14, and pc-desktop on key pages
    if ((vp.name === 'iphone-14' || vp.name === 'android-small' || vp.name === 'pc-desktop') && 
        (route.name === 'home' || route.name === 'fetal-medicine' || route.name === 'pregnancy-care' || route.name === 'locations')) {
      const { data: imgData } = await sendSession('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, `${vp.name}_${route.name}.png`), Buffer.from(imgData, 'base64'));
    }
  }
}

console.log('=== AUDIT COMPLETE ===');
console.log('Findings count:', auditFindings.length);
console.log(JSON.stringify(auditFindings, null, 2));

try {
  chromeProcess.kill();
} catch {}
process.exit(0);
