import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Loader2, Minimize2 } from 'lucide-react';
import { sendMessageToGemini, initializeChat } from '../services/geminiService';
import { Language, ChatMessage } from '../types';
import { CONTENT } from '../constants';
import { Logo } from './Logo';

interface Props {
  lang: Language;
}

export const ChatBot: React.FC<Props> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = CONTENT[lang].ai;

  useEffect(() => {
    // Initialize with system instruction when component mounts or lang changes
    const systemPrompt = `You are "Cipher AI", a cybersecurity assistant for the organization CIPHER (created by Biruk Getachew). 
    Your tone is professional, technical, yet accessible. 
    You speak mostly in ${lang === Language.AM ? 'Amharic (and English if technical terms require)' : 'English'}.
    Keep answers concise. Focus on hacking, cybersecurity, penetration testing, and protecting digital assets.`;
    
    initializeChat(systemPrompt);
    
    // Add welcome message
    setMessages([{
      id: 'welcome',
      role: 'model',
      text: t.welcome,
      timestamp: new Date()
    }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input);
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Error connecting to Cipher AI secure node.",
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-green-500/20 hover:border-green-500 hover:scale-105 transition-all duration-300"
        >
          <span className="font-semibold text-sm hidden group-hover:block transition-all font-mono">Cipher AI</span>
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="w-[90vw] sm:w-96 h-[500px] glass rounded-2xl flex flex-col shadow-2xl overflow-hidden border border-white/10 animate-in slide-in-from-bottom-10 fade-in duration-300 z-50 bg-black/80 backdrop-blur-xl">
          {/* Header */}
          <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="text-white">
                 <Logo className="w-8 h-8" showText={false} />
              </div>
              <div>
                <h3 className="font-mono font-bold text-white text-sm leading-none">{t.title}</h3>
                <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-green-400 font-mono">ONLINE</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <Minimize2 size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-green-600/20 text-white rounded-tr-sm border border-green-500/20'
                      : 'bg-white/10 text-white rounded-tl-sm border border-white/5'
                  } ${msg.isError ? 'border-red-500/50 bg-red-900/10' : ''}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-2xl p-3 flex gap-1 items-center">
                   <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full animate-bounce delay-100"></div>
                   <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-black/40 border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.placeholder}
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-white/30"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="text-white/50 hover:text-green-400 disabled:opacity-30 transition-colors"
              >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};