import dotenv from "dotenv";
import express from "express";
import { ChatOpenAI } from "@langchain/openai";

dotenv.config();
const app = express();

let chatHistory = [
  ["system",
    "Jij bent AnimalSelect, een behulpzame chatbot die is ontworpen om gebruikers te helpen bij het vinden van de perfecte dierenvriend. Je kunt vragen stellen om hun voorkeuren, levensstijl en behoeften te begrijpen en zo de beste dierensuggesties te doen."]
];

app.use(express.json());

const model = new ChatOpenAI({
  temperature: 0.7,
  apiKey: process.env.OPENAI_API_KEY,
  engineName: process.env.ENGINE_NAME,
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/joke", async (req, res) => {
  try {
    const joke = await model.invoke("Tell me a joke!");
    console.log(joke.content);
    res.json({ joke: joke.content });
  } catch (error) {
    console.error("Error fetching joke:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the joke" });
  }
});

app.post("/chat", async (req, res) => {
  try {
    const chat = req.body.chat;

    if (!chat) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if this is the first user message
    // const isFirstMessage = chatHistory.length === 1; // Only the system message is present

    // if (isFirstMessage) {
      // chatHistory.push(["human", chat]);
      // chatHistory.push(["ai", firstResponse]);
      // return res.json({ response: firstResponse });
    // }

    let messages = [...chatHistory, ["human", chat]];

    const response = await model.invoke(messages);

    chatHistory.push(["human", chat]);
    chatHistory.push(["ai", response.content]);

    console.log(chatHistory);

    res.json({ response: response.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Can't get the answer" });
  }
});

const PORT = process.env.EXPRESS_PORT || 8000;

try {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
