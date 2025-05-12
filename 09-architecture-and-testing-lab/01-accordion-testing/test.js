const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables

describe('E2E tests', async function () {
  this.timeout(5000); // Sometimes the app doesn't run, if don't write this row.

  before(async () => { browser = await chromium.launch( {headless: false, slowMo: 500} ); });
  after(async () => { await browser.close(); });
  beforeEach(async () => { page = await browser.newPage(); });
  afterEach(async () => { await page.close(); });

  it('loads article titles', async () => {
    await page.goto('http://localhost:5500/');
    // await page.screenshot({ path: 'page.png' }); // This is for screenshot generation.

    await page.waitForSelector('.accordion div.head>span');

    const content = await page.textContent('#main');

    // await page.waitForTimeout(300); // За забавяне на сървира, ако тротлингът е включен.

    expect(content).to.contain('Scalable Vector Graphics');
    expect(content).to.contain('Open standard');
    expect(content).to.contain('Unix');
    expect(content).to.contain('ALGOL');
  });

  it('has working More button', async () => {
    await page.goto('http://localhost:5500/');

    await page.click('text=More');
    await page.waitForSelector('.extra p');

    const text = await page.textContent('.extra p');
    const visible = await page.isVisible('.extra p');

    expect(text).to.contain('Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)');
    expect(visible).to.be.true;
  });

  it('has working Less button', async () => {
    await page.goto('http://localhost:5500/');

    await page.click('text=More');

    await page.waitForSelector('.extra p');

    let visible = await page.isVisible('.extra p');
    expect(visible).to.be.true;

    await page.click('text=Less');
    visible = await page.isVisible('.extra p');
    expect(visible).to.be.false;
  });
});