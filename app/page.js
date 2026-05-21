'use client'
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Page() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const executeEngine = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Local .env.local file mein API Key nahi mili!");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const result = await model.generateContent(input);
      setResponse(result.response.text());
    } catch (err) {
      setResponse("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', background: '#0a0a0a', color: '#fff', fontFamily: 'sans-serif', minHeight: '100vh' }}>
      <h1 style={{ color: '#ff4444', letterSpacing: '2px', fontWeight: '900' }}>SUKUNA ENGINE v1.0</h1>
      <textarea 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        style={{ width: '100%', height: '150px', background: '#1a1a1a', color: '#fff', border: '1px solid #333', padding: '10px', fontSize: '16px', borderRadius: '4px' }} 
        placeholder="Enter your domain control command..."
      />
      <button 
        onClick={executeEngine} 
        disabled={loading}
        style={{ marginTop: '15px', background: '#ff4444', color: '#fff', padding: '12px 25px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', borderRadius: '4px' }}
      >
        {loading ? "EXPANDING DOMAIN..." : "DISMANTLE"}
      </button>
      <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
        {response}
      </div>
    </div>
  );
}
