const puppeteer = require("puppeteer");

module.exports = async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Missing URL" });

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto("https://snapsave.app", { waitUntil: "networkidle2" });

    await page.type("#url", videoUrl);
    await page.click("button[type='submit']");

    await page.waitForSelector(".download-items a", { timeout: 15000 });
    const link = await page.$eval(".download-items a", el => el.href);

    await browser.close();
    return res.json({ success: true, url: link });
  } catch (e) {
    return res.status(500).json({ error: "Failed to fetch Facebook video", details: e.toString() });
  }
};