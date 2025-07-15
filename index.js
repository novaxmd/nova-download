const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Facebook Video Downloader API by BMB XMD");
});

app.get("/api/fb", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Missing video URL" });

  try {
    const response = await axios.get(videoUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(response.data);
    const sd = $("meta[property='og:video']").attr("content") || null;
    const hd = $("meta[property='og:video:secure_url']").attr("content") || null;
    const title = $("meta[property='og:title']").attr("content") || "Facebook Video";
    const thumbnail = $("meta[property='og:image']").attr("content") || null;

    if (!sd && !hd) {
      return res.status(404).json({ error: "Video not found or not public" });
    }

    res.json({
      status: true,
      title,
      thumbnail,
      videoUrl: hd || sd,
      quality: hd ? "HD" : "SD"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "Failed to fetch video" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
