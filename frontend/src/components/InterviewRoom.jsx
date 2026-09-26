import React, { useState, useEffect, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Mic, MicOff, Loader2, Clock, MessageSquare, User, Bot } from 'lucide-react';

import badaImage from "../assets/krishna.avif"

export default function InterviewRoom() {
  const agentId = 'agent_5501kr4dd2sgf6ssqcj99658appv';
  const [messages, setMessages] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const chatScrollRef = useRef(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs AI Agent");
    },
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => {
      console.log("Message:", message);
      setMessages(prev => [...prev, message]);
    },
    onError: (error) => console.error("Error:", error),
  });

  const { status, isSpeaking } = conversation;

  // Timer logic
  useEffect(() => {
    let interval;
    if (status === 'connected') {
      interval = setInterval(() => setTimeElapsed(t => t + 1), 1000);
    } else {
      setTimeElapsed(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStart = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMessages([]); // Clear previous messages
      await conversation.startSession({
        agentId: agentId,
      });
    } catch (err) {
      console.error("Failed to start session:", err);
      alert("Failed to start. Check your Agent ID and microphone permissions.");
    }
  };

  const handleStop = async () => {
    await conversation.endSession();
  };

  const numSpikes = 36;
  const spikes = Array.from({ length: numSpikes });

  return (
    <div className="flex-grow flex flex-col p-8 relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Timer top right */}
      {status === 'connected' && (
        <div className="absolute top-8 right-8 glass px-4 py-2 rounded-full flex items-center gap-2 z-20 shadow-lg border-blue-500/30 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <Clock size={16} className="text-slate-300" />
          <span className="font-mono text-white font-medium tracking-wider">{formatTime(timeElapsed)}</span>
        </div>
      )}

      <div className={`z-10 flex flex-col lg:flex-row w-full max-w-7xl mx-auto flex-grow gap-8 transition-all duration-700 ${status === 'connected' ? 'items-stretch' : 'items-center justify-center'}`}>

        {/* Left/Center: Avatar & Controls */}
        <div className={`flex flex-col items-center justify-center transition-all duration-700 ${status === 'connected' ? 'w-full lg:w-5/12' : 'w-full max-w-2xl'}`}>

          <div className="relative mb-12 flex justify-center items-center h-80 w-full">
            <div className={`absolute inset-0 bg-blue-500/20 rounded-full blur-3xl transition-all duration-1000 ${isSpeaking ? 'scale-150 opacity-100' : 'scale-100 opacity-40'}`}></div>

            <div className={`relative z-10 w-56 h-56 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${status === 'connected'
              ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]'
              : 'border-white/10 bg-white/5'
              }`}>

              {status === 'connecting' && (
                <Loader2 size={48} className="text-blue-400 animate-spin" />
              )}

              {status === 'connected' && (
                <>
                  {/* Sound Spikes Container */}
                  <div className="absolute inset-0 rounded-full">
                    {spikes.map((_, i) => {
                      const angle = i * (360 / numSpikes);
                      const delay = Math.random() * -1;
                      const duration = 0.3 + Math.random() * 0.2;

                      return (
                        <div
                          key={i}
                          className="absolute top-1/2 left-1/2 origin-bottom"
                          style={{
                            transform: `translate(-50%, -100%) rotate(${angle}deg) translateY(-120px)`,
                          }}
                        >
                          <div
                            className="w-1.5 rounded-full"
                            style={{
                              background: isSpeaking ? 'linear-gradient(to top, #3b82f6, #8b5cf6)' : '#334155',
                              height: isSpeaking ? '15px' : '8px',
                              transition: 'all 0.15s ease-out',
                              opacity: isSpeaking ? 0.8 : 0.3,
                              animation: isSpeaking ? `sound-spike ${duration}s ease-in-out infinite alternate` : 'none',
                              animationDelay: `${delay}s`
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Avatar Image */}
                  <div className={`w-full h-full rounded-full overflow-hidden border-4 border-[#0f172a] relative z-10 transition-transform duration-300 shadow-xl ${isSpeaking ? 'scale-105 shadow-blue-500/50' : 'scale-100'}`}>
                    <img
                      src={badaImage}
                      alt="AI Coach"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                  </div>
                </>
              )}

              {(status === 'disconnected' || !status) && (
                <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 shadow-inner">
                  <MicOff size={48} />
                </div>
              )}
            </div>
          </div>

          {/* Status Text */}
          <div className="text-center mb-10 h-16">
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              {status === 'connecting' ? 'Connecting to Coach...' :
                status === 'connected' ? (isSpeaking ? 'Coach is speaking...' : 'Listening to you...') :
                  'Ready to Interview'}
            </h3>
            <p className="text-slate-400">
              {status === 'connected' ? 'Speak clearly into your microphone.' : 'Click start when you are ready to begin.'}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {status === 'connected' ? (
              <button
                onClick={handleStop}
                className="bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-red-500/20 flex items-center gap-2 group"
              >
                <MicOff size={20} className="group-hover:scale-110 transition-transform" />
                End Interview
              </button>
            ) : (
              <button
                onClick={handleStart}
                disabled={status === 'connecting'}
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] flex items-center gap-2 disabled:opacity-50 hover:scale-105"
              >
                <Mic size={20} />
                {status === 'connecting' ? 'Starting...' : 'Start Interview'}
              </button>
            )}
          </div>
        </div>

        {/* Right: Chat Box */}
        {status === 'connected' && (
          <div className="w-full lg:w-7/12 flex flex-col glass rounded-3xl overflow-hidden border border-white/10 animate-fade-in shadow-2xl h-[500px] lg:h-auto mt-8 lg:mt-0">
            <div className="bg-white/5 border-b border-white/10 p-5 flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Live Transcript</h3>
                <p className="text-xs text-slate-400">Real-time conversation with your AI Coach</p>
              </div>
            </div>

            <div
              ref={chatScrollRef}
              className="flex-grow p-6 overflow-y-auto flex flex-col gap-6 scroll-smooth custom-scrollbar"
            >
              {messages.length === 0 ? (
                <div className="flex-grow flex items-center justify-center text-slate-500 italic">
                  Conversation will appear here...
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isAi = msg.source === 'ai';
                  return (
                    <div
                      key={index}
                      className={`flex gap-4 max-w-[85%] ${isAi ? 'self-start' : 'self-end flex-row-reverse'}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isAi ? 'bg-gradient-to-tr from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-700 text-slate-300'}`}>
                        {isAi ? <Bot size={16} /> : <User size={16} />}
                      </div>
                      <div className={`px-5 py-3 rounded-2xl ${isAi ? 'bg-white/10 text-white rounded-tl-sm border border-white/5' : 'bg-blue-600 text-white rounded-tr-sm shadow-md shadow-blue-900/20'}`}>
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
