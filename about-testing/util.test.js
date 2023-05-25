const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test('should output name and age', () => {
  const text = generateText('Klethonio', 29);

  expect(text).toBe('Klethonio (29 years old)');
});

// test('should output data-less text', () => {
//   const text = generateText('', null);

//   expect(text).toBe(' (null years old)');
// });

test('should generate a valid text output', () => {
  const text = checkAndGenerate('Klethonio', 29);

  expect(text).toBe('Klethonio (29 years old)');
});

test('should create an element with text and corrent class', async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // headless: false,
    // slowMo: 8,
    // args: ['--window-size=1366,768'],
  });
  const page = await browser.newPage();

  await page.goto('http://127.0.0.1:5500/about-testing/');

  await page.click('input#name');
  await page.type('input#name', 'Dikaii');
  await page.click('input#age');
  await page.type('input#age', '29');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', el => el.textContent);

  expect(finalText).toBe('Dikaii (29 years old)');
}, 10000);
