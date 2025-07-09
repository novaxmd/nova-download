const express = require("express");
const app = express();
const facebook = require("./platforms/facebook");
const twitter = require("./platforms/twitter");
const instagram = require("./platforms/instagram");

app.get("/", (req, res) => {
  res.send("🟢 Social Media Video Downloader API is Running.");
});

app.get("/api/facebook", facebook);
app.get("/api/twitter", twitter);
app.get("/api/instagram", instagram);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
