import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        return new Response(JSON.stringify({ error: "API Key missing" }), { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent(prompt);
    return new Response(JSON.stringify({ text: result.response.text() }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
