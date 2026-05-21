import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    
    // Yahan apni key direct paste karke dekho (Testing ke liye sirf)
    const apiKey = "YAHAN_APNI_API_KEY_PASTE_KAR"; 
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent(prompt);
    return new Response(JSON.stringify({ text: result.response.text() }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
