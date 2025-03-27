import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message, ChatState, SYSTEM_PROMPT } from './types';
import { ChatMessage } from './components/ChatMessage';
import { VoiceInput } from './components/VoiceInput';
import { Send, Sparkles } from 'lucide-react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [{ role: 'system', content: SYSTEM_PROMPT }],
    isLoading: false,
    error: null,
  });
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = { role: 'user', content: text };
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: true,
      error: null,
    }));
    setInput('');

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const chat = model.startChat({
        history: chatState.messages.filter(msg => msg.role !== 'system').map(msg => ({
          role: msg.role,
          parts: msg.content,
        })),
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
        },
      });

      const result = await chat.sendMessage(text);
      const response = await result.response;
      const responseText = response.text();

      const assistantMessage: Message = { role: 'assistant', content: responseText };
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('API Error:', error);
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to get response. Please try again.',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col items-center px-4 w-full">
      <div className="max-w-4xl w-full p-6 h-full flex flex-col">
        <header className="text-center py-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-teal-400 animate-pulse" size={28} />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-300 to-cyan-400 text-transparent bg-clip-text">
              AI Mail Assistant
            </h1>
          </div>
          <p className="text-gray-300 mt-1 text-sm italic">Your smart and soothing workspace</p>
        </header>

        <div className="flex-1 overflow-y-auto bg-gray-700 rounded-2xl shadow-2xl p-4 mb-4 w-full max-h-[70vh] min-h-[50vh]">
          {chatState.messages.filter(msg => msg.role !== 'system').map((message, index) => (
            <ChatMessage key={index} message={message} className="bg-gray-600 text-white p-3 rounded-lg"/>
          ))}
          {chatState.isLoading && <div className="text-teal-400 animate-pulse p-3">Thinking...</div>}
          {chatState.error && <div className="text-red-400 text-center p-3 bg-red-900/50 rounded-lg">{chatState.error}</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-gray-700 rounded-2xl shadow-xl p-3 w-full">
          <div className="flex items-center gap-2 w-full">
            <VoiceInput onVoiceInput={handleSubmit} />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(input)}
              placeholder="Type your message here..."
              className="flex-1 p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
            <button
              onClick={() => handleSubmit(input)}
              disabled={!input.trim()}
              className="p-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-all"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
