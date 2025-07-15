/**
 * Simple bilingual chatbot API using OpenAI.
 */
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }));

app.post("/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Missing message" });

    try {
        const resp = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant. You can respond in Swahili or English, based on the user's language. If user writes in Swahili, respond in Swahili, otherwise in English.`
                },
                { role: "user", content: message }
            ],
            temperature: 0.7
        });
        const reply = resp.data.choices[0].message.content;
        res.json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "OpenAI error" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Chatbot API running on port ${port}`));
