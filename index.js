// index.js const express = require("express"); const puppeteer = require("puppeteer"); const app = express(); const port = process.env.PORT || 3000;

app.get("/api/facebook", async (req, res) => { const videoUrl = req.query.url; if (!videoUrl) return res.status(400).json({ error: "Missing Facebook video URL" });

try { const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] }); const page = await browser.newPage(); await page.goto("https://www.fbdown.net/", { waitUntil: "networkidle2" });

await page.type("#url", videoUrl);
await page.click("#send");
await page.waitForSelector(".button.is-success.is-fullwidth", { timeout: 15000 });

const downloadLink = await page.$eval(".button.is-success.is-fullwidth", el => el.href);
await browser.close();

res.json({ success: true, download: downloadLink });

} catch (error) { console.error("Error fetching video:", error); res.status(500).json({ success: false, error: "Failed to get download link." }); } });

app.get("/", (req, res) => { res.send("✅ Facebook Video Downloader API by B.M.B-TECH is running!"); });

app.listen(port, () => { console.log(✅ API running on http://localhost:${port}); });

  
