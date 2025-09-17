import request from 'supertest';
import app from '../App';


describe("tests get route looks for hello back", () => {
    it("expects hello", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
    })
});
describe("Tests gemini response", () => {
    const obj = {
        "location": "Kyoto, Japan",
        "budget": "Mid-range (around $1000-$1500 USD per person)",
        "days_of_stay": 2,
        "num_of_people": 2,
        "themes": "Culture, Temples, Food, Nature, Relaxation"
    }
    it("Expects gemini response to be (500) and response instance", async () => {
        const res = await request(app).post("/gemini").send(obj);
        expect(res.statusCode).toEqual(500);
    },300000)
})

