import { spawn } from 'child_process';
import http from 'http';

const chromeProcess = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--remote-allow-origins=*',
  '--user-data-dir=C:\\Users\\aksha\\AppData\\Local\\Temp\\chrome_err_debug',
  '--no-first-run',
  '--no-default-browser-check'
]);

// Wait 1.5s for Chrome to bind port
await new Promise(r => setTimeout(r, 1500));

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

try {
  const version = await getJson('http://127.0.0.1:9222/json/version');
  const wsUrl = version.webSocketDebuggerUrl;
  console.log('Connected to Chrome WebSocket:', wsUrl);

  const ws = new WebSocket(wsUrl);
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

  // Create target page
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

  ws.addEventListener('message', event => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      console.log('CONSOLE [' + msg.params.type + ']:', msg.params.args.map(a => a.value || a.description).join(' '));
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      console.error('EXCEPTION:', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
    }
  });

  await sendSession('Runtime.enable');
  await sendSession('Page.enable');

  console.log('Navigating to http://localhost:3000/fetal-medicine ...');
  await sendSession('Page.navigate', { url: 'http://localhost:3000/fetal-medicine' });

  await new Promise(r => setTimeout(r, 2500));

  // Evaluate DOM
  const evalRes = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const main = document.querySelector('main');
      return {
        mainExists: !!main,
        mainHTML: main ? main.innerHTML.substring(0, 300) : null,
        title: document.title,
        heading: document.querySelector('h1, h2')?.innerText
      };
    })()`,
    returnByValue: true
  });

  console.log('EVAL RESULT:', JSON.stringify(evalRes.result.value, null, 2));

  await send('Target.closeTarget', { targetId });
  ws.close();
} catch (e) {
  console.error('Error running debug check:', e);
} finally {
  chromeProcess.kill();
}
