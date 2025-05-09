import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChatBotGPT = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi! Ask me about any country.', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook to navigate back

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            { role: 'system', content: 'You are a helpful assistant that answers questions about countries.' },
            { role: 'user', content: input }
          ]
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json'
          }
        }
      );

      const botReply = res.data.choices[0].message.content;
      setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: 'Failed to fetch response.', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        ← Back
      </button>

      {/* Chat Box */}
      <div className="border rounded-xl p-4 shadow-lg bg-white">
        <div className="h-96 overflow-y-scroll space-y-2 mb-4 border p-2 rounded">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-sm p-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-100 text-right'
                  : 'bg-gray-100 text-left'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="text-sm italic text-gray-500">Bot is typing...</div>
          )}
        </div>
        <div className="flex">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me something..."
            className="flex-grow border rounded-l px-3 py-2 outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-r"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotGPT;
