const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
const options = { headless: false, slowMo: 200 };
const url = 'http://192.168.0.103:5500';

describe('Custom Test', function () {
    let browser, page; // Така декларираме 2 променливи наведнъж

    this.timeout(10000); // Пишем това, защото иначе ни излиза грешка, че не ени стига времето за изпълнение

    // Пишем това, за да си спестим 18 и 19 ред
    before(async () => browser = await chromium.launch(options));
    beforeEach(async() => page = await browser.newPage()); // Преди всеки page искам да ми рефрешваш да е чисто нов
    afterEach(async() => await page.close());
    after(async() => await browser.close());

    it('Successful login', async function () {
        // const browser = await chromium.launch(options); // Стартираме браузъра
        // const page = await browser.newPage(); // правим си страницата

        await page.goto(url);
        // await page.screenshot({path: 'screen.png'});

        await page.click('text=Login'); // селектор за Playwrite
        await page.fill('input[name=email]', 'peter@abv.bg'); // CSS selector
        await page.fill('input[name=password]', '123456');
        await page.click('input[value=Login]');
        let logoutBtnText = await page.textContent('#logout-btn');

        // page.on('dialog', async dialog => {
        //     console.log(dialog.message());

        //     await dialog.accept();
        //     // await browser.close();
        //     done();
        // })
        
        // expect(dialog.message()).to.be.equal('successfully logged in');
        expect(logoutBtnText).to.be.equal('Logout');
    })

    // it('Check result', async () => {
    //     await page.route('**/data/recipes', route => route.fulfill({
    //         status: 200,
    //         body: JSON.stringify([{title, img}])
    //     }));

    //     await page.goto(url);
    //     const [response] = await Promise.all([
    //         page.waitForResponse('**/data/recipes'),
    //         page.click('.active')
    //     ]);

    // })
})