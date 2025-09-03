import express from 'express';
import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';
import * as admin from 'firebase-admin';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hello");
})


app.post("/gemini", (req, res) => {
    const {location,budget,days_of_stay}=req.body;
    const themes=null;
    const itineraryPrompt = `
You are an expert travel planner and itinerary generator, known for creating personalized, efficient, and memorable travel plans. Your goal is to design a detailed daily itinerary for a user based on their specific travel parameters.

User Travel Parameters:
*   Destination: ${location}
*   Total Budget for Trip: ${budget}
*   Number of Days: ${days_of_stay}
*   Interests/Themes (if available, otherwise omit): ${themes || 'None specified'}

Itinerary Generation Instructions:

1.  Structure: Provide a day-by-day plan for each of the ${days_of_stay} days.
2.  Daily Breakdown: For each day, include:
    *   Morning (Activities & Breakfast): Suggest 1-2 primary activities or attractions. Include a recommendation for breakfast that aligns with the budget and location.
    *   Afternoon (Activities & Lunch): Suggest 1-2 primary activities or attractions, potentially continuing from the morning or moving to a new area. Include a recommendation for lunch.
    *   Evening (Activities & Dinner): Suggest an evening activity (e.g., local market, cultural show, relaxed stroll) and a dinner recommendation.
    *   Accommodation Suggestion: Briefly mention the type of accommodation (e.g., "mid-range hotel", "boutique guesthouse", "no-cost hostel") that fits the overall budget, without naming specific properties.
3.  Content Detail:
    *   Relevance: All suggestions must be highly relevant to ${location} and the specified themes.
    *   Budget Alignment: All activity, dining, and transport suggestions must strictly adhere to the ${budget}. If the budget is tight, suggest no-cost or very low-cost options.
    *   Practicality: Suggest practical transportation options within the location (e.g., walking, public transport, local auto-rickshaws, rideshares).
    *   Variety: Ensure a good mix of cultural, recreational, culinary, and relaxation experiences.
4.  Cost Estimation: For each day, provide a rough estimated daily cost breakdown (e.g., activities, food, transport), ensuring the total aligns with the overall ${budget}. Summing up for total budget is not required, just daily estimates.
5.  Language: Maintain a helpful, engaging, and enthusiastic tone.
6.  Flexibility Note: Conclude with a brief statement acknowledging that the itinerary is a suggestion and can be customized.
`;
    const ai = genkit({
        plugins: [googleAI()],
        model: gemini15Flash,
    });
    const helloFlow = ai.defineFlow('helloFlow', async (name) => {
        const { text } = await ai.generate(itineraryPrompt);
        console.log(text);
    });

    helloFlow('Chris');
    res.send("Hello");
})

app.post("/login",(req,res)=>{

})
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on ${process.env.SERVER_PORT}`);
})