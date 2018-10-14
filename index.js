const puppeteer = require("puppeteer");
// const dappeteer = require("dappeteer");
// const web3 = require("./src/web3");
// const pathToExtension = `/home/nish/.config/google-chrome/Default/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/4.13.0_0/manifest.json`;
(async function main() {
  // const pathToExtension = require("path").join(
  //   __dirname,
  //   `/home/nish/.config/google-chrome/Default/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/4.14.0_0/popup.html`
  // );
  // try {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 100,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: true
    // dumpio: true
    // args: [
    //   `--disable-extensions-except=${pathToExtension}`,
    //   `--load-extension=${pathToExtension}`,
    //   "--no-sandbox"
    //   // "--disable-setuid-sandbox"
    // ]
  });
  // const metamask = await dappeteer.getMetamask(browser);
  // await metamask.importAccount(
  // "december bomb print venue quantum balcony model slogan trouble blade arena believe",
  // "qweasf##1"
  // );
  // await metamask.switchNetwork("rinkeby");
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
  );
  await page.goto("http://localhost:3000/");
  await page.waitForSelector("#root > div > h4:nth-child(10)");
  console.log("done1");
  await page.focus("#purchase-form > div > input:nth-child(2)");
  console.log("done2");
  await page.keyboard.type("PuppeteerBot");
  console.log("done3");
  await page.focus("#purchase-form > div > input:nth-child(5)");
  console.log("done4");
  await page.keyboard.type("0.01");
  console.log("done5");
  await page.click("#purchase-form > button");
  // await metamask.confirmTransaction();
  console.log("done6");
  // } catch (e) {
  // console.log("our error", e);
  // }
})();
