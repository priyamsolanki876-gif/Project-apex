'use client'
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleExecute = async () => {
    setResponse("Processing...");
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setResponse(data.text || data.error);
  };

  return (
    <div style={{ padding: '20px', background: '#000', color: '#fff' }}>
      <h1>APEX ENGINE</h1>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} style={{ color: '#000', width: '100%', height: '100px' }} />
      <button onClick={handleExecute} style={{ marginTop: '10px' }}>EXECUTE</button>
      <div style={{ marginTop: '20px' }}>{response}</div>
    </div>
  );
}
