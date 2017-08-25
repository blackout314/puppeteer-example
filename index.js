const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const path = require('path')

const URL = 'https://www.extrategy.net/en/values'

const run = async (browser, device) => {
  const page = await browser.newPage()
  const imagePath = path.join(__dirname, 'results', `${device.name}.png`)

  try {
    await page.emulate(device)
    await page.goto(URL)
    await page.click('.list_type11__item__wrapper__link')
    await page.waitForNavigation({waitFor: 'networkidle'})
    await page.screenshot({path: imagePath})
  } catch (e) {
    console.error(`Error in testing ${device.name}: ${e.message}`)
  }

  return page.close()
}

(async () => {
  const browser = await puppeteer.launch()
  for (let index = 0; index < devices.length; index++) {
    const device = devices[index]
    console.log(`Testing ${device.name}`)
    await run(browser, device)
  }
  return browser.close()
})()
