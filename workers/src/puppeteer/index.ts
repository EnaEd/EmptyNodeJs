import puppeteer from "puppeteer";

export class Scraper {
  public Scrape = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.upwork.com/ab/account-security/login");
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
      let loginInput = (<HTMLInputElement>(
        document.getElementById("login_username")
      )).value;
      loginInput = "apworkauthtest@gmail.com";
      debugger;
      (document.querySelector(
        ".btn-block-sm.full-width.btn.btn-primary.m-0.text-capitalize"
      ) as HTMLElement).click();

      var intervalId = window.setInterval(() => {
        let passwordInput = (<HTMLInputElement>(
          document.getElementById("login_password")
        )).value;
        if (passwordInput) {
          debugger;
          passwordInput = "parolaParola1";
          (document.querySelector(
            ".btn-block-sm.width-sm.btn.btn-primary.m-0.text-capitalize"
          ) as HTMLElement).click();
          clearInterval(intervalId);
        }
      }, 2000);

      return "test";
    });

    browser.close();
    return result;
  };
}
