import { pathToFileURL } from 'node:url';
if (!process.env.PUPPETEER_MODULE || !process.env.CHROME_PATH) throw Error('Set PUPPETEER_MODULE and CHROME_PATH to your installed Puppeteer module and Chrome executable.');
const { default: puppeteer } = await import(pathToFileURL(process.env.PUPPETEER_MODULE).href);
const baseURL = process.env.TEST_URL || 'http://127.0.0.1:5173';
console.log('Launching browser');
const browser = await puppeteer.launch({executablePath:process.env.CHROME_PATH,headless:true,timeout:15000});
console.log('Browser ready');
const page=await browser.newPage();
await page.setRequestInterception(true);
page.on('request', r => new URL(r.url()).origin === new URL(baseURL).origin ? r.continue() : r.abort());
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
const pause=()=>new Promise(r=>setTimeout(r,700));
const check=(ok,label)=>{if(!ok)throw Error(label); console.log('PASS '+label)};
try {
 await page.setViewport({width:1365,height:900});
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 await page.goto(baseURL + '/rooms',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('main h1');
 await page.evaluate(()=>window.scrollTo({top:600,behavior:'instant'})); await pause();
 check(await page.evaluate(()=>window.scrollY===600),'desktop scroll');
 await page.click('[aria-label="Open AI Concierge Chatbot & Front Desk"]'); await pause();
 check(await page.evaluate(()=>window.scrollY===600),'chat does not move page');
 await page.click('[aria-label="Close Concierge"]');
 await page.evaluate(()=>Array.from(document.querySelectorAll('header button')).find(b=>b.textContent.includes('Book')).click()); await pause();
 check(await page.evaluate(()=>document.documentElement.style.overflow==='hidden'),'booking locks background');
 await page.click('[aria-label="Close Reservation Modal"]'); await pause();
 check(await page.evaluate(()=>document.documentElement.style.overflow===''),'closing booking releases scroll');
 await page.evaluate(()=>document.querySelector('header a[href="/"]').click()); await pause();
 await page.waitForFunction(() => location.pathname === '/' && document.querySelector('main h1')); await new Promise(r=>setTimeout(r,1500));
 console.log('Route position',await page.evaluate(()=>({y:scrollY,path:location.pathname})));
 check(await page.evaluate(()=>window.scrollY===0),'navigation resets scroll');
 await page.goBack(); await pause();
 check(await page.evaluate(()=>window.scrollY===600),'back restores scroll');
 await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true}); await pause();
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'mobile no horizontal overflow');
 await page.click('[aria-label="Toggle Navigation Menu"]'); await pause();
 check(await page.evaluate(()=>document.documentElement.style.overflow==='hidden'),'mobile menu locks scroll');
 await page.click('[aria-label="Toggle Navigation Menu"]'); await pause();
 check(await page.evaluate(()=>document.documentElement.style.overflow===''),'mobile menu releases scroll');
 check(errors.length===0,'no runtime errors: '+errors.join('; '));
} finally {await browser.close()}


