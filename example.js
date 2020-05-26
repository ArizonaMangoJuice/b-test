const puppeteer = require('puppeteer');
const {installMouseHelper} = require('./install-mouse-helper');
function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
const date = new Date();

async function tabLoop(num, func){
  const results = [];
  
  for(let i = 0; i < num; i++){
    results.push(func.press('Tab'));
  }

  return await Promise.all(results);
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 15, 
    });

    const page = await browser.newPage();
    
    await installMouseHelper(page);

    await page.goto('https://www.nike.com/login', {
      waitUntil: 'networkidle0',
    });

        await tabLoop(5,  page.keyboard);
        await page.waitFor(200);
        
        await page.keyboard.type('');
        console.log('typed username');

        await tabLoop(1,  page.keyboard);

        await page.waitFor(200);

        await page.keyboard.type('');
        console.log('typed pasword');

        await tabLoop(5,  page.keyboard);
        await page.keyboard.press('Space');

        await page.waitFor(5000);

        await page.goto('https://www.nike.com/launch/t/air-max-1-huarache-dna-ch1-pack', {
          waitUntil: 'networkidle0',
        });

        await page.keyboard.press('Space');
        await page.keyboard.press('Space');
        await page.keyboard.press('Space');

        await page.waitFor(100);
        await page.mouse.click(300,250);
        await page.mouse.click(300,500);

        await page.waitFor(2550);
        
        await page.goto('https://www.nike.com/us/en/checkout', {
          waitUntil: 'networkidle0',
        });
        
        await page.waitFor(5000);
        await tabLoop(14,  page.keyboard);

        
        await page.keyboard.type('');

        await page.waitFor(1000);

        await tabLoop(1,  page.keyboard);
        await page.keyboard.type('');
        await page.waitFor(1000);

        await tabLoop(1,  page.keyboard);
        await page.keyboard.type('');

        await tabLoop(6,  page.keyboard);

        await page.keyboard.press('Space');

        let dateString = date.toDateString().split(' ').join('')
        await page.screenshot({path: 'example' + dateString + '.png'});
})();