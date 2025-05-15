const {chromium} = require('playwright-chromium');
// всяка операция с Playwrite е задължително с async отпред и връща Promises

// Трябва да е пуснат сървъра и да сме отворили приложението в браузъра

// IIFE
(async function() {
    const browser = await chromium.launch({headless: false, slowMo: 100}); // Връща Promise; по default launch() е true
    // {headless: false, slowMo: 100} --> използва се само за debug режим
    const page = await browser.newPage(); // Създаваме обект от браузъра

    await page.goto('http://192.168.0.103:5500'); // Така му казваме на кой сайт да отиде
    await page.screenshot({path: 'screenshot.png'}); // На този път/линк запази скрийншот

    // await browser.close(); // така затваряме браузъра, за да го освободим като ресурс
})();