
export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing Instagram URL" });

  // Placeholder logic
  res.status(200).json({ platform: "Instagram", url });
}
