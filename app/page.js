'use client'
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Page() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const executeEngine = async () => {
    setLoading(true);
    try {
      // Direct call to gemini-1.5-pro
      const genAI = new GoogleGenerativeAI("AIzaSyDawoHsciRH885uv6fz74R8M0sUmYIYjJA");
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
      <h1 style={{ color: '#ff4444', letterSpacing: '2px' }}>SUKUNA ENGINE</h1>
      <textarea 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        style={{ width: '100%', height: '150px', background: '#1a1a1a', color: '#fff', border: '1px solid #333', padding: '10px' }} 
        placeholder="Enter your command..."
      />
      <button 
        onClick={executeExecute} 
        disabled={loading}
        style={{ marginTop: '10px', background: '#ff4444', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
      >
        {loading ? "EXECUTING..." : "ACTIVATE"}
      </button>
      <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
        {response}
      </div>
    </div>
  );
}
