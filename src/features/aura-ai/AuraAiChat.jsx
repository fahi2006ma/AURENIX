import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, X, Minus, RotateCcw, ThumbsUp, ThumbsDown, Copy, 
  Check, Mic, MicOff, Send, Volume2, VolumeX, History, Trash2,
  ExternalLink, Bot, MessageSquare, ChevronRight
} from 'lucide-react';
import AuraAiOrb from '../../components/AuraAiOrb';
import { sendChatMessage, GEMINI_CONFIG } from '../../services/geminiService';
import { studentData } from '../../data/collegeData';
import { divineAudio } from '../../utils/audioChimes';

export default function AuraAiChat({ isOpen, setIsOpen, activePage, setActivePage }) {
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'assistant',
      content: `Hello ${studentData.firstName}! 👋 I'm AURA AI, your personal campus intelligence companion. How can I help you today?`,
      action: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 'conv-1', title: 'Attendance & Semester 3 Marks', date: 'Yesterday', count: 4 },
    { id: 'conv-2', title: 'Exam Timetable & Room C-204', date: '3 days ago', count: 6 }
  ]);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN'; // English (India) per SRS CB-VOI-04

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
        divineAudio.playTap();
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceRecording = () => {
    divineAudio.playTap();
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Please type your message.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        setIsRecording(false);
      }
    }
  };

  const handleSpeak = (text) => {
    divineAudio.playTap();
    if (!window.speechSynthesis) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    divineAudio.playTap();

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'student',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        message: query,
        conversationHistory: messages
      });

      const assistantMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        content: response.content,
        action: response.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
      divineAudio.playDivineReply();

      if (ttsEnabled) {
        handleSpeak(response.content);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          content: "I'm having a little trouble right now. Please try again in a moment, or use the menu to find what you need.",
          action: null,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    divineAudio.playTap();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id, type) => {
    setFeedbackGiven((prev) => ({ ...prev, [id]: type }));
    divineAudio.playTap();
  };

  const startNewChat = () => {
    divineAudio.playTap();
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: `New session started! Hello ${studentData.firstName}, what would you like to explore or check?`,
        action: null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const clearAllHistory = () => {
    if (window.confirm("Are you sure you want to clear all AURA AI conversation history?")) {
      divineAudio.playTap();
      startNewChat();
      setConversations([]);
      setShowHistory(false);
    }
  };

  const chips = [
    "How many classes can I miss?",
    "Check Attendance",
    "Show my semester 3 marks",
    "What is my next class?",
    "When is the Tech Fest?",
    "How much fee do I have to pay?",
    "Which assignments are pending?",
    "Explain my academic performance"
  ];

  return (
    <>
      {/* Floating Animated Trigger Button (Bottom Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Quick Helper Pill */}
          <div 
            onClick={() => {
              setIsOpen(true);
              divineAudio.playTap();
            }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass-panel-gold cursor-pointer shadow-divine hover:scale-105 transition-all text-sm font-medium text-amber-200 border border-amber-500/30"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>Need campus guidance? Ask AURA AI</span>
          </div>

          {/* Glowing Divine AI Orb */}
          <AuraAiOrb
            size={70}
            state={isLoading ? 'thinking' : isRecording ? 'listening' : 'idle'}
            onClick={() => {
              setIsOpen(true);
              divineAudio.playTap();
            }}
          />
        </div>
      )}

      {/* Floating AURA AI Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[95vw] md:w-[440px] h-[640px] max-h-[90vh] rounded-3xl glass-panel-gold flex flex-col shadow-divine-lg border border-amber-500/30 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Holographic Top Scanline Effect */}
          <div className="holo-scan" />

          {/* Header */}
          <div className="relative px-5 py-4 bg-gradient-to-r from-midnight-900 via-midnight-850 to-midnight-900 border-b border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md shadow-amber-500/30">
                <div className="w-full h-full bg-midnight-950 rounded-[14px] flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/aura_ai_bot.png" 
                    alt="AURA AI" 
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }} 
                  />
                  <Bot className="w-5 h-5 text-amber-400 absolute" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-midnight-950" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-amber-300 tracking-wide text-base">
                    AURA AI
                  </h3>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30 uppercase tracking-wider">
                    Core 3.5
                  </span>
                </div>
                <p className="text-xs text-slate-300/80 font-normal">
                  Your Campus. Your Intelligence.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              {/* History Toggle */}
              <button
                onClick={() => {
                  setShowHistory(!showHistory);
                  divineAudio.playTap();
                }}
                title="Chat History"
                className={`p-1.5 rounded-lg transition-colors ${showHistory ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-amber-300 hover:bg-midnight-800'}`}
              >
                <History className="w-4 h-4" />
              </button>

              {/* TTS Read-Aloud Toggle */}
              <button
                onClick={() => {
                  setTtsEnabled(!ttsEnabled);
                  divineAudio.playTap();
                }}
                title={ttsEnabled ? "Voice replies enabled" : "Enable voice read-aloud"}
                className={`p-1.5 rounded-lg transition-colors ${ttsEnabled ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-amber-300 hover:bg-midnight-800'}`}
              >
                {ttsEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* New Chat */}
              <button
                onClick={startNewChat}
                title="Start New Chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-midnight-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Minimize / Close */}
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-midnight-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* History Slide-out Drawer */}
          {showHistory && (
            <div className="px-4 py-3 bg-midnight-900/95 border-b border-amber-500/20 animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Previous Discussions
                </span>
                <button
                  onClick={clearAllHistory}
                  className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Clear History
                </button>
              </div>

              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {conversations.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setShowHistory(false);
                      divineAudio.playTap();
                    }}
                    className="flex items-center justify-between p-2 rounded-xl bg-midnight-800/60 hover:bg-amber-500/10 border border-slate-700/50 cursor-pointer text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-slate-200 truncate">{c.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">{c.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 px-4 py-4 overflow-y-auto space-y-4">
            {messages.map((m) => {
              const isAssistant = m.sender === 'assistant';

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-md ${
                      isAssistant
                        ? 'bg-midnight-900/90 text-slate-100 border border-amber-500/25 rounded-tl-sm'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 text-midnight-950 font-medium rounded-tr-sm shadow-amber-500/20'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>

                    {/* AI Action Mode Smart Navigation Button (SRS Section 5.9) */}
                    {isAssistant && m.action && (
                      <div className="mt-3 pt-2.5 border-t border-amber-500/20">
                        <button
                          onClick={() => {
                            divineAudio.playSuccessChord();
                            setActivePage(m.action.page);
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 text-xs font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{m.action.label}</span>
                          <ChevronRight className="w-3 h-3 ml-auto" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Message Metadata & Feedback Actions */}
                  <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-slate-400">
                    <span>{m.timestamp}</span>

                    {isAssistant && (
                      <div className="flex items-center gap-1.5 ml-2">
                        <button
                          onClick={() => copyToClipboard(m.content, m.id)}
                          title="Copy reply"
                          className="hover:text-amber-300 transition-colors"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>

                        <button
                          onClick={() => handleSpeak(m.content)}
                          title="Read aloud"
                          className="hover:text-amber-300 transition-colors"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => handleFeedback(m.id, 'up')}
                          title="Helpful"
                          className={`hover:text-emerald-400 transition-colors ${feedbackGiven[m.id] === 'up' ? 'text-emerald-400' : ''}`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => handleFeedback(m.id, 'down')}
                          title="Not helpful"
                          className={`hover:text-rose-400 transition-colors ${feedbackGiven[m.id] === 'down' ? 'text-rose-400' : ''}`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Thinking / Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-midnight-900/80 border border-amber-500/20 max-w-[120px] text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips (SRS Section 5.11: CB-UI-04) */}
          <div className="px-4 py-2 border-t border-slate-800/80 bg-midnight-950/50">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              {chips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-midnight-800 hover:bg-amber-500/20 hover:text-amber-300 text-slate-300 border border-slate-700/60 whitespace-nowrap text-[11px] transition-colors shrink-0 disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box Footer */}
          <div className="p-3 bg-midnight-900 border-t border-amber-500/20">
            {isRecording && (
              <div className="flex items-center gap-2 mb-2 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-xs text-amber-300 animate-pulse">
                <Mic className="w-3.5 h-3.5 text-amber-400" />
                <span>Listening to your question... Speak clearly</span>
              </div>
            )}

            <div className="relative flex items-center gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyDown}
                placeholder="Ask about attendance, marks, fees, timetable..."
                rows={1}
                className="w-full px-3.5 py-2.5 bg-midnight-950 border border-slate-700/80 rounded-2xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors resize-none max-h-24 pr-20"
              />

              {/* Voice STT Button (SRS Section 5.10) */}
              <button
                type="button"
                onClick={toggleVoiceRecording}
                title={isRecording ? "Stop recording" : "Speak to AURA AI"}
                className={`absolute right-10 p-1.5 rounded-xl transition-all ${
                  isRecording 
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/40 animate-pulse' 
                    : 'text-slate-400 hover:text-amber-400 hover:bg-midnight-800'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Send Button */}
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-midnight-950 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Character limit counter (SRS CB-UI-06: 500 chars) */}
            <div className="flex items-center justify-between mt-1 px-1 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" /> Powered by Gemini API Core
              </span>
              <span>{inputText.length} / 500</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
