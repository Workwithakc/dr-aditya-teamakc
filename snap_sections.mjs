import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const chromeProcess = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9224',
  '--remote-allow-origins=*',
  '--user-data-dir=C:\\Users\\aksha\\AppData\\Local\\Temp\\chrome_scroll_profile',
  '--no-first-run',
  '--no-default-browser-check'
]);

await new Promise(r => setTimeout(r, 1800));

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

const v = await getJson('http://127.0.0.1:9224/json/version');
const ws = new WebSocket(v.webSocketDebuggerUrl);
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
await sendSession('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });

async function snapSection(url, selector, filename) {
  await sendSession('Page.navigate', { url });
  await new Promise(r => setTimeout(r, 2200));
  await sendSession('Runtime.evaluate', {
    expression: "document.querySelector('" + selector + "')?.scrollIntoView({ behavior: 'instant', block: 'start' })"
  });
  await new Promise(r => setTimeout(r, 600));
  const { data } = await sendSession('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('validation_artifacts/' + filename, Buffer.from(data, 'base64'));
  console.log('Snapped:', filename);
}

await snapSection('http://localhost:3000/fetal-medicine', '[data-testid="fetal-clinical-showcase"]', 'section_fetal_showcase.png');
await snapSection('http://localhost:3000/pregnancy-care', '[data-testid="emergency-obstetric-case"]', 'section_preg_emergency.png');
await snapSection('http://localhost:3000/pregnancy-care', '[data-testid="pregnancy-cases-gallery"]', 'section_preg_gallery.png');
await snapSection('http://localhost:3000/fertility-care', '[data-testid="ivf-milestone-showcase"]', 'section_ivf_milestone.png');
await snapSection('http://localhost:3000/locations?city=Kalyan', '[data-testid="location-panel"]', 'section_location_kalyan.png');

await send('Target.closeTarget', { targetId });
ws.close();
chromeProcess.kill();
