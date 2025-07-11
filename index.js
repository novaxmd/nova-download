const express = require("express");
const axios = require("axios");
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Facebook Video API by BMB-XMD is Live");
});

app.get("/fb", async (req, res) => {
  const url = req.query.url;
  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ success: false, message: "❌ Invalid Facebook URL." });
  }

  try {
    const response = await axios.get(`https://www.getfvid.com/downloader?url=${encodeURIComponent(url)}`);
    const match = response.data.match(/href="(https:\/\/[^"]+\.mp4)"/);

    if (!match || !match[1]) {
      return res.status(404).json({ success: false, message: "⚠️ Video not found. Try another link." });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      url: match[1],
      by: "BMB-XMD"
    });
  } catch (error) {
    console.error("Facebook Video Error:", error.message);
    return res.status(500).json({ success: false, message: "🔥 Internal Server Error." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
