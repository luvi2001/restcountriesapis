import React, { useState } from 'react';
import axios from 'axios';

const ChatBotGPT = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi! Ask me about any country.', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
          model: 'mistralai/mistral-7b-instruct', // you can try 'nousresearch/nous-capybara-7b'
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
    <div className="max-w-md mx-auto mt-10 border rounded-xl p-4 shadow-lg bg-white">
      <div className="h-96 overflow-y-scroll space-y-2 mb-4 border p-2 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={`text-sm p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-sm italic text-gray-500">Bot is typing...</div>}
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
  );
};

export default ChatBotGPT;
