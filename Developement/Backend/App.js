import express from 'express';
import { gemini20Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';
import cors from 'cors';

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions={
    origin :'*',
    methods :['GET', 'POST'],
    credentials :true
}

app.use(cors(corsOptions));


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
    res.status(200).send("hello");
})


app.post("/gemini", async(req, res) => {
    const {public_key}=req.body;
    const { location, budget, days_of_stay, num_of_people, themes, travel_style} = req.body;
    try{
        if(public_key!=process.env.API_ACCESS_KEY){
            console.log(public_key==process.env.API_ACCESS_KEY);
           return res.status(500).send("Not authenticated");
        }
    }catch(error){
        console.log(error);
    }
    
   const itineraryPrompt = `
Respond ONLY with a valid JSON array of objects. 
o not include markdown formatting (e.g., backticks json), explanations, greetings, or any extra text.Ensure all strings are properly escaped and do not contain unescaped newlines. Use backticks only if necessary for multiline strings.
Your entire response MUST strictly conform to the example provided below.
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

        const { text } = aiResponse;
    const cleanedResponse = text.replace(/^```json\s*|\s*```$/g, '');

    try {
        const jsonResponse = JSON.parse(cleanedResponse);
        res.status(200).json(jsonResponse); // Send JSON, not a string
    } catch (e) {
        console.error("JSON parsing failed:", e);
        res.status(500).json({ error: "Failed to parse AI response as JSON." });
    }

    } catch (error) {
        console.error("Error generating itinerary:", error);
        if (error instanceof SyntaxError) {
            res.status(500).send("Error: AI did not return valid JSON. Please refine the prompt or check model output. Raw output might be in logs.");
        } else {
            res.status(500).send("An unexpected error occurred while generating the itinerary.");
        }
    }
});

export default app;