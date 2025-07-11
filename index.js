const express = require("express");
const axios = require("axios");
const app = express();

app.get("/", (req, res) => {
  res.send("Facebook Video API by BMB-XMD is Live ✅");
});

app.get("/fb", async (req, res) => {
  const url = req.query.url;
  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ success: false, message: "Invalid URL" });
  }

  try {
    const result = await axios.get(`https://www.getfvid.com/downloader?url=${encodeURIComponent(url)}`);
    const matches = result.data.match(/href="(https:\/\/[^"]+\.mp4)"/);
    if (!matches || !matches[1]) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    return res.json({
      success: true,
      url: matches[1],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
