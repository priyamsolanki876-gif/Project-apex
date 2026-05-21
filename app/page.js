'use client'
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askEngine = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setResponse(data.error ? "Error: " + data.error : data.text);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', background: '#000', color: '#fff', height: '100vh' }}>
      <h1>APEX ENGINE</h1>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} style={{ color: '#000', width: '100%', height: '100px' }} />
      <button onClick={askEngine} disabled={loading}>{loading ? "PROCESSING..." : "EXECUTE"}</button>
      <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>{response}</div>
    </div>
  );
}
