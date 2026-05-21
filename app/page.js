'use client';

import { useState } from 'react';
import { Loader } from 'lucide-react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExecute = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setResponse(data.response);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleExecute();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">APEX ENGINE</h1>
          <p className="text-neutral-400 text-sm">Powered by Gemini 1.5 Flash</p>
        </div>

        {/* Main Container */}
        <div className="border border-neutral-800 rounded-xl bg-neutral-900/50 backdrop-blur-md p-8 space-y-6">
          {/* Input Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-300">
              COMMAND INPUT
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your prompt here..."
              className="w-full bg-black border border-neutral-700 rounded-lg p-4 text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 resize-none"
              rows={4}
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
              <p className="font-semibold">ERROR:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Execute Button */}
          <button
            onClick={handleExecute}
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-neutral-200 disabled:bg-neutral-600 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                PROCESSING...
              </>
            ) : (
              'EXECUTE'
            )}
          </button>

          {/* Response Section */}
          {(response || loading) && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-neutral-300">
                ENGINE RESPONSE
              </label>
              <div className="bg-black border border-neutral-700 rounded-lg p-4 min-h-[120px] max-h-[400px] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Loader className="w-4 h-4 animate-spin" />
                    Initializing response...
                  </div>
                ) : (
                  <p className="text-neutral-100 leading-relaxed whitespace-pre-wrap">
                    {response}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
              }`}
            />
            <p className="text-xs text-neutral-400">
              {loading ? 'PROCESSING' : 'READY'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
