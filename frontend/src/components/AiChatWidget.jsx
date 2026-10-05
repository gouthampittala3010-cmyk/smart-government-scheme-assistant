import React, { useState } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, ArrowRight, Loader2 } from 'lucide-react';
import { aiApi } from '../api';

const AiChatWidget = ({ onSelectScheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am your AI Government Scheme Assistant. Tell me your age, occupation, state, or what kind of assistance (health, education, agriculture, loan, housing) you need, and I will recommend matching schemes!',
      recommendedSchemes: [],
      suggestions: [
        'Farmer financial support & land schemes',
        'Higher education scholarships for students',
        'Health insurance up to 5 Lakhs',
        'Loans for women entrepreneurs',
      ],
    },
  ]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await aiApi.askAssistant({ message: query });
      const botMsg = {
        sender: 'bot',
        text: res.data.response,
        recommendedSchemes: res.data.recommendedSchemes || [],
        suggestions: res.data.keySuggestions || [],
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'I apologize, but I encountered an issue connecting to the AI scheme database. Please verify the backend is running.',
          recommendedSchemes: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-white/20"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="font-semibold text-sm">Ask AI Scheme Assistant</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[550px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-800 to-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  GovScheme AI Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </h4>
                <p className="text-[11px] text-indigo-100">Direct Benefit & Eligibility Advisor</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Scheme Cards recommendation inside message */}
                {msg.recommendedSchemes?.length > 0 && (
                  <div className="w-full mt-2 space-y-2">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Recommended Schemes:</p>
                    {msg.recommendedSchemes.map((scheme) => (
                      <div
                        key={scheme.id}
                        className="bg-white p-2.5 rounded-xl border border-indigo-100 shadow-xs flex items-center justify-between gap-2 hover:border-indigo-300 transition-colors"
                      >
                        <div className="overflow-hidden">
                          <p className="font-bold text-xs text-slate-900 truncate">{scheme.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{scheme.ministry}</p>
                        </div>
                        {onSelectScheme && (
                          <button
                            onClick={() => onSelectScheme(scheme)}
                            className="shrink-0 px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-[11px] font-semibold flex items-center gap-0.5"
                          >
                            <span>Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Prompt suggestions chips */}
                {msg.suggestions?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.suggestions.map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-[10px] bg-indigo-50/80 hover:bg-indigo-100 text-indigo-800 border border-indigo-200/80 rounded-full px-2.5 py-1 text-left transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs bg-white p-3 rounded-2xl border border-slate-200 max-w-[70%]">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span>Analyzing government welfare databases...</span>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask e.g. 'Scholarship for 12th pass student'..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AiChatWidget;
