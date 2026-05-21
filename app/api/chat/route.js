import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || prompt.trim() === '') {
      return Response.json(
        { error: 'Prompt cannot be empty' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return Response.json(
      { response: text },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: 'Failed to generate response. Please check your API key and try again.' },
      { status: 500 }
    );
  }
}
