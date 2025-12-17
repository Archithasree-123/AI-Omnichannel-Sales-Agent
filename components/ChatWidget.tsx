import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { AppRoute } from '../types';

const ChatWidget: React.FC = () => {
  const { isChatOpen, toggleChat, messages, sendMessageToAI, isLoadingAI, addToCart } = useStore();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessageToAI(inputValue);
    setInputValue("");
  };

  if (!isChatOpen) {
    return (
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform z-50 flex items-center gap-2 group"
      >
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <span className="font-semibold group-hover:block hidden md:block">Chat with AURA</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-100 font-sans">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
            <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full flex items-center justify-center font-bold text-xs">AI</div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-gray-900 rounded-full"></div>
            </div>
            <div>
                <h3 className="font-bold text-sm">AURA</h3>
                <p className="text-[10px] text-gray-400">Agentic Sales Associate</p>
            </div>
        </div>
        <button onClick={toggleChat} className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : msg.role === 'system' 
                  ? 'bg-yellow-50 text-yellow-800 w-full text-center text-xs border border-yellow-100' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              
              {/* Product Card */}
              {msg.isProductCard && msg.productData && (
                <div className="mt-3 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden p-2 group cursor-pointer hover:border-blue-300 transition-colors">
                  <img src={msg.productData.image} alt={msg.productData.name} className="w-full h-32 object-cover rounded-lg" />
                  <div className="mt-2">
                    <p className="font-bold text-gray-900">{msg.productData.name}</p>
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500">${msg.productData.price}</p>
                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">In Stock</span>
                    </div>
                    <button 
                      onClick={() => addToCart(msg.productData!.id, 9)} 
                      className="mt-2 w-full bg-black text-white text-xs py-2 rounded font-bold hover:bg-gray-800"
                    >
                      Add to Cart (US 9)
                    </button>
                  </div>
                </div>
              )}

              {/* Checkout Link Card */}
              {msg.isCheckoutLink && (
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          <span className="font-bold text-green-800 text-xs">Secure Link Generated</span>
                      </div>
                      <button className="w-full bg-green-600 text-white text-xs font-bold py-2 rounded shadow-sm hover:bg-green-700">
                          Complete Payment
                      </button>
                      <p className="text-[10px] text-green-600 mt-2 text-center">Powered by Stripe (Sandbox)</p>
                  </div>
              )}
            </div>
          </div>
        ))}
        {isLoadingAI && (
           <div className="flex justify-start">
             <div className="bg-gray-100 text-gray-500 p-3 rounded-2xl rounded-bl-none text-xs flex items-center gap-2">
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t flex gap-2">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about size, stock, or checkout..."
          className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button 
          type="submit" 
          disabled={isLoadingAI}
          className="bg-blue-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;