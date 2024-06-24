import dotenv from "dotenv";
import express from "express";
import { ChatOpenAI } from "@langchain/openai";

dotenv.config();
const app = express();

let chatHistory = [
  [
    "system",
    "Jij bent AnimalSelect, een behulpzame chatbot die is ontworpen om gebruikers te helpen bij het vinden van de perfecte dierenvriend. Je bent specifiek gericht op het helpen van mensen met een beperkt budget om een huisdier te vinden dat betaalbaar is en weinig onderhoud vergt. Je kunt vragen stellen om hun voorkeuren, levensstijl en behoeften te begrijpen en zo de beste dierensuggesties te doen. Jouw doel is om de gebruiker een dier voor te stellen dat goed bij hen past, rekening houdend met factoren zoals ruimte, tijd, allergieën, gezinsgrootte, persoonlijke voorkeuren en financiële beperkingen.",
  ],
];

const questions = [
  "In wat voor soort huis woon je (appartement, rijtjeshuis, vrijstaand huis, flat etc.)?",
  "Heb je een tuin of balkon?",
  "Hoeveel tijd kun je dagelijks besteden aan de zorg voor een huisdier?",
  "Heb je al ervaring met huisdieren? Zo ja, welke?",
  "Wat is je budget voor huisdierverzorging (voeding, medische kosten, speelgoed, enz.) per maand?",
  "Wat voor soort huisdier zou je willen? (hond, kat, vogel, vis)",
];

let questionIndex = 0;
let budget = null;
let hasSpace = null;
let timeAvailable = null;
let petType = null; // Added to track user preference for pet type
let initialQuestionsComplete = false;

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

app.post("/chat", async (req, res) => {
  try {
    const chat = req.body.chat;

    if (!chat) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let messages = [...chatHistory, ["human", chat]];

    if (!initialQuestionsComplete) {
      if (questionIndex < questions.length) {
        const currentQuestion = questions[questionIndex];
        questionIndex++;

        if (questionIndex === 2) {
          // Checking for space after garden/balcony question
          hasSpace = chat.toLowerCase().includes("nee") ? false : true;
        }

        if (questionIndex === 3) {
          // Checking for time available
          timeAvailable = chat.toLowerCase().includes("veel") ? "high" : "low";
        }

        if (questionIndex === 5) {
          // Checking for pet type preference
          petType = chat.toLowerCase();
        }

        chatHistory.push(["human", chat]);
        chatHistory.push(["ai", currentQuestion]);

        console.log("Chat History:", chatHistory);

        return res.json({ response: currentQuestion, max_tokens: 20 });
      } else {
        // Check if the user has no budget or space for a pet
        if (budget === 0 || !hasSpace) {
          const advice =
            "Het lijkt erop dat je momenteel geen budget of ruimte hebt voor een huisdier. Misschien is het een goed idee om te wachten totdat je situatie verbetert. je geeft kort en duidelijk antwoord. Ondertussen kun je overwegen om vrijwilligerswerk te doen bij een dierenasiel of op een andere manier tijd door te brengen met dieren zonder de volledige verantwoordelijkheid van eigendom. Jouw doel is om de gebruiker een dier voor te stellen dat goed bij hen past, rekening houdend met verschillende factoren zoals ruimte, tijd, allergieën, gezinsgrootte, budget en persoonlijke voorkeuren";
          chatHistory.push(["human", chat]);
          chatHistory.push(["ai", advice]);

          // Resetting state for future interactions
          questionIndex = 0;
          budget = null;
          hasSpace = null;
          petType = null;
          initialQuestionsComplete = true;

          console.log("Chat History:", chatHistory);

          return res.json({ response: advice });
        }

        // Suggest breeds based on user input
        const breedPrompt = `
        Op basis van de volgende informatie:
        - Woonplaats: ${hasSpace ? "ruimte" : "geen ruimte"}
        - Dagelijkse beschikbare tijd: ${
          timeAvailable === "high" ? "veel" : "weinig"
        }
        - Maandelijks budget: ${budget} euro
        - Gewenst huisdier: ${petType}
        Kun je een lijst maken van de top  huisdierrassen die het beste passen bij deze levensstijl en budget.
        `;

        messages.push(["human", breedPrompt]);

        const response = await model.invoke(messages, { max_tokens: 20 });

        chatHistory.push(["human", chat]);
        chatHistory.push(["ai", response.content]);

        console.log("Chat History:", chatHistory);

        // Mark initial questions as complete
        initialQuestionsComplete = true;

        return res.json({ response: response.content });
      }
    } else {
      // Handle subsequent questions from the user with max_tokens set to 20
      const response = await model.invoke(messages, { max_tokens: 20 });

      chatHistory.push(["human", chat]);
      chatHistory.push(["ai", response.content]);

      console.log("Chat History:", chatHistory);

      return res.json({ response: response.content });
    }
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
