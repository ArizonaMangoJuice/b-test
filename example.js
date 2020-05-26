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
        await page.waitFor(400);
        
        await page.keyboard.type('');
        console.log('typed username');

        await tabLoop(1,  page.keyboard);

        await page.waitFor(400);

        await page.keyboard.type('');
        console.log('typed pasword');

        await tabLoop(5,  page.keyboard);
        await page.keyboard.press('Space');

        await page.waitFor(5000);

        await page.goto('https://www.nike.com/launch/t/sb-dunk-low-ben-and-jerrys-chunk-dunky-5-26', {
          waitUntil: 'networkidle0',
        });

        await page.keyboard.press('Space');
        await page.keyboard.press('Space');
        await page.keyboard.press('Space');

        await page.waitFor(100);
        await page.mouse.click(300,284);
        await page.mouse.click(300,500);

        await page.waitFor(2550);
        
        await page.goto('https://www.nike.com/us/en/checkout', {
          waitUntil: 'networkidle0',
        });
        
        await tabLoop(16,  page.keyboard);
        console.log('tabbed')
        // await page.waitFor(6000);
        await page.waitFor(500);
        
        await page.keyboard.type('', {delay: 30});

        // await page.waitFor(2500);

        // await tabLoop(1,  page.keyboard);
        // console.log('tabbed')
        
        // await page.keyboard.type('');
        // // await page.waitFor(1000);

        // await tabLoop(1,  page.keyboard);
        // console.log('tabbed')
        
        // await page.keyboard.type('');

        await tabLoop(3,  page.keyboard);
        console.log('tabbed')
        await page.waitFor(500);

        await page.keyboard.press('Enter');
        console.log('before picture')
        
        let dateString = date.toDateString().split(' ').join('')
        await page.screenshot({path: 'example' + dateString + '.png'});
        console.log('done')
        
})();