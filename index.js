const puppeteer = require('puppeteer');

(async () => {
  const URL = 'https://www.extrategy.net/'

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(URL)
  await page.click('.l-header__site_navigation__menu_primary__item:nth-child(3)')
  await page.waitForNavigation({waitFor: 'networkidle'})
  await page.click('.list_type11.row li:nth-child(5)')
  await page.waitForNavigation({waitFor: 'networkidle'})
  await page.screenshot({path: 'example.png'})

  browser.close()
})()
