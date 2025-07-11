const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("✅ Facebook Video Downloader API by B.M.B-TECH is running.");
});

app.get("/fb", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Missing Facebook video URL." });

  try {
    const api = `https://fb-video-downloader-api.vercel.app/api/facebook?url=${encodeURIComponent(videoUrl)}`;
    const response = await axios.get(api);

    if (!response.data || !response.data.url) {
      return res.status(404).json({ error: "Video not found or not downloadable." });
    }

    res.json({
      status: true,
      message: "Facebook video fetched successfully.",
      data: {
        title: response.data.title || "Facebook Video",
        url: response.data.url
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video.", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
