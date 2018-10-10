const puppeteer = require("puppeteer");

(async function main() {
  try {
    const browser = await puppeteer.launch({
      headless: false,

      executablePath: "/opt/google/chrome/google-chrome",
      args: [
        "--diable-extensions-except= /home/nish/.config/google-chrome/Default/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/4.13.0_0/manifest.json"
      ],
      devtools: true
      // args: ["--remote-debugging-port=9222"]
    });
    // const browserWSEndpoint = browser.wsEndpoint();
    // console.log(browserWSEndpoint);
    const page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
    );

    await page.goto("http://localhost:3000/");
    // await page.waitForSelector("");

    // const form = await page.$('form[name="purhcaseTicketForm"]');
    // const form = await page.$("#root > div > form.form3");
    // const form = await page.$("#purchase-form");
    // console.log(form);
    // await form.evaluate(form => form.submit());
    // console.log(page);

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
    console.log("done6");
  } catch (e) {
    console.log("our error", e);
  }
})();
