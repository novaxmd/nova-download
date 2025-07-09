const puppeteer = require("puppeteer");

module.exports = async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Missing URL" });

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto("https://ssstwitter.com", { waitUntil: "networkidle2" });

    await page.type("input[name='url']", videoUrl);
    await page.click("button[type='submit']");

    await page.waitForSelector(".result-overlay a", { timeout: 15000 });
    const link = await page.$eval(".result-overlay a", el => el.href);

    await browser.close();
    return res.json({ success: true, url: link });
  } catch (e) {
    return res.status(500).json({ error: "Failed to fetch Twitter video", details: e.toString() });
  }
};