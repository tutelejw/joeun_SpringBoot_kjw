import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { askMoAAssistant } from '../services/geminiService';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "안녕하세요! MoA 봇입니다. 궁금한 점이 있으신가요? 🤖", isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    setIsLoading(true);

    const response = await askMoAAssistant(userMsg);
    
    setMessages(prev => [...prev, { text: response, isUser: false }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-[90vw] sm:w-96 h-[500px] rounded-3xl shadow-2xl border border-slate-100 mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-slate-900 p-5 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-1.5 rounded-lg">
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <span className="font-bold block">MoA 봇</span>
                <span className="text-xs text-slate-400">무엇이든 물어보세요!</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[85%] p-3.5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm
                  ${msg.isUser 
                    ? 'bg-brand-600 text-white rounded-tr-sm' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="p-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50 active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          p-4 rounded-full shadow-xl shadow-brand-600/30 transition-all duration-300 flex items-center justify-center
          ${isOpen ? 'bg-slate-800 rotate-90 scale-90' : 'bg-brand-600 hover:bg-brand-700 hover:-translate-y-1'}
        `}
      >
        {isOpen ? <X className="w-7 h-7 text-white" /> : <MessageCircle className="w-7 h-7 text-white" />}
      </button>
    </div>
  );
};

export default GeminiAssistant;