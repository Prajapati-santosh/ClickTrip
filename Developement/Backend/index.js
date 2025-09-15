import express from 'express';
import { gemini20Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.setTimeout(300000);
  res.setTimeout(300000);
  next();
});


const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash, // Setting the default model here
});

app.get("/", (req, res) => {
    res.send("Hello");
})


app.post("/gemini", async(req, res) => {
    const { location, budget, days_of_stay, num_of_people, themes, travel_style} = req.body;

   const itineraryPrompt = `
Your entire response MUST be a array of objects, strictly conforming to the example provided below.
DO NOT include any conversational text, greetings, explanations, or any other content outside the pure array.

You are an expert travel planner and itinerary generator, known for creating personalized, efficient, and memorable travel plans. Your goal is to design a detailed daily itinerary for a user based on their specific travel parameters.

User Travel Parameters:
* Destination: ${location}
* Total Budget for Trip: ${budget}
* Number of Days: ${days_of_stay}
* Interests/Themes (if available, otherwise omit): ${themes || 'None specified'}
* Number of people on the trip: ${num_of_people || 1}
* Preferred travel mode: ${travel_style || 'Not specified'}

Itinerary Generation Instructions:

1. Provide a day-by-day plan for each of the ${days_of_stay} days.
2. For each day, include:
   * A concise summary of the day's activities, combining cultural, recreational, culinary, and relaxation experiences.
   * Mention any notable places or events relevant to ${location} and the specified themes.
   * Suggest practical transportation options (e.g., walking, public transport, local auto-rickshaws, rideshares).
   * Recommend a type of accommodation suitable for the budget (e.g., "mid-range hotel", "budget guesthouse", "hostel").
   * Provide a rough estimated daily cost breakdown (e.g., activities, food, transport), ensuring the total aligns with the overall ${budget}.
3. All suggestions must strictly adhere to the ${budget}. If the budget is tight, suggest no-cost or very low-cost options.
4. Ensure a good mix of cultural, recreational, culinary, and relaxation experiences.
5. Maintain a helpful, engaging, and enthusiastic tone.
6. Conclude with a brief statement acknowledging that the itinerary is a suggestion and can be customized. (Note: This instruction will be implicitly handled *within* the JSON structure, perhaps as part of a general note or the daily plan descriptions, as the LLM is forbidden from adding text outside the JSON).

Example of expected JSON array structure:
[
  {
    "title": "Day 1: Discover Local Culture",
    "summary": "Begin your journey with a walking tour of the historic district, visit key landmarks, enjoy local street food, and end the day with a cultural performance.",
    "transportation": "Walking and public bus",
    "accommodationSuggestion": "Budget guesthouse near city center",
    "dailyCostEstimate": "Activities: ₹500, Food: ₹700, Transport: ₹200"
  },
  {
    "title": "Day 2: Nature and Relaxation",
    "summary": "Explore a nearby nature park, enjoy a picnic lunch, and relax at a local spa in the evening.",
    "transportation": "Auto-rickshaw and rideshare",
    "accommodationSuggestion": "Mid-range hotel near the park",
    "dailyCostEstimate": "Activities: ₹800, Food: ₹600, Transport: ₹300"
  }
]
`;

    try {
        const aiResponse = await ai.generate({
            model: gemini20Flash,
            prompt: itineraryPrompt,
            options: {
                    timeout: 60000 // 60 seconds
            }
        });

        const {text} = aiResponse;
        const cleanedResponse = text.replace(/^```json\s*|\s*```$/g, '');
        console.log('Raw AI output:', cleanedResponse);
        res.send(cleanedResponse);

    } catch (error) {
        console.error("Error generating itinerary:", error);
        if (error instanceof SyntaxError) {
            res.status(500).send("Error: AI did not return valid JSON. Please refine the prompt or check model output. Raw output might be in logs.");
        } else {
            res.status(500).send("An unexpected error occurred while generating the itinerary.");
        }
    }
});


app.post("/login", (req, res) => {

})
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on ${process.env.SERVER_PORT}`);
})

