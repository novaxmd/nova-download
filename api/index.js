const express = require("express");
const axios = require("axios");
const app = express();

app.get("/fb", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).json({ error: "Missing Facebook video URL" });
  }

  try {
    const { data } = await axios.get(`https://fdownloader.net/api/ajax/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
      },
      data: new URLSearchParams({ q: videoUrl }).toString()
    });

    const match = data?.links?.[0]?.url;
    if (match) {
      return res.json({ url: match });
    } else {
      return res.status(404).json({ error: "No downloadable video found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch video" });
  }
});

module.exports = app;
