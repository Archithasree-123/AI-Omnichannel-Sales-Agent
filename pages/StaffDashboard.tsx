import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AppRoute } from '../types';

interface StaffProps {
    setRoute: (route: AppRoute) => void;
}

const StaffDashboard: React.FC<StaffProps> = ({ setRoute }) => {
  const { loadSession, cart, user, messages, resetSession, automationLogs, sessionId } = useStore();
  const [sidInput, setSidInput] = useState("");

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (sidInput) loadSession(sidInput);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        {/* TOP NAV - POS STYLE */}
        <div className="bg-white border-b px-6 py-3 flex justify-between items-center sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-lg tracking-wider">AURA POS</div>
                <span className="text-gray-400 text-sm">|</span>
                <span className="font-semibold text-gray-600 text-sm">Store: Downtown Seattle (ID: 104)</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    System Online
                </div>
                <button onClick={() => setRoute(AppRoute.HOME)} className="text-sm text-blue-600 hover:underline">Back to Web</button>
            </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
            
            {/* LEFT COL: SCANNER & QUEUE */}
            <div className="col-span-12 md:col-span-3 space-y-6">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Session Lookup</h2>
                    <form onSubmit={handleScan} className="space-y-3">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Scan QR / Enter ID" 
                                value={sidInput}
                                onChange={(e) => setSidInput(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 rounded p-2 pl-9 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <svg className="w-4 h-4 text-gray-400 absolute top-2.5 left-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded text-sm font-bold hover:bg-blue-700 transition">
                            Retrieve Session
                        </button>
                    </form>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Automation Logs (n8n)</h2>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {automationLogs.length === 0 && <p className="text-xs text-gray-400 italic">No events triggered yet.</p>}
                        {automationLogs.map((log) => (
                            <div key={log.id} className="text-xs border-l-2 border-purple-500 pl-2 py-1">
                                <div className="flex justify-between text-gray-500">
                                    <span>{log.platform}</span>
                                    <span>{log.timestamp.toLocaleTimeString()}</span>
                                </div>
                                <p className="font-semibold text-gray-800">{log.trigger}</p>
                                <p className="text-gray-600 truncate">{log.action}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MIDDLE COL: CUSTOMER 360 */}
            <div className="col-span-12 md:col-span-6">
                {cart.length > 0 ? (
                    <div className="space-y-6">
                        {/* Header Profile */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                    <div className="flex gap-2 mt-1">
                                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded border border-yellow-200 font-bold">{user.tier} Member</span>
                                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded border border-gray-200">{user.loyaltyPoints} Pts</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">{user.email} • {user.phone}</p>
                                </div>
                            </div>
                            <button onClick={resetSession} className="text-red-600 text-sm font-medium hover:bg-red-50 px-3 py-1 rounded">
                                Close Session
                            </button>
                        </div>

                        {/* Current Cart */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                             <div className="flex justify-between items-center mb-4">
                                 <h3 className="font-bold text-gray-800">Current Basket (Web Handoff)</h3>
                                 <span className="text-xs text-gray-500 font-mono">{sessionId}</span>
                             </div>
                             <div className="space-y-4">
                                 {cart.map(item => (
                                     <div key={item.productId} className="flex gap-4 p-3 bg-gray-50 rounded border border-gray-100">
                                         <img src={item.product.image} className="w-16 h-16 object-cover rounded" />
                                         <div className="flex-1">
                                             <h4 className="font-bold text-gray-900">{item.product.name}</h4>
                                             <p className="text-sm text-gray-600">Size: {item.size} | Qty: {item.quantity}</p>
                                             <p className="text-sm font-mono font-medium mt-1">${item.product.price}</p>
                                         </div>
                                         <button className="h-fit text-blue-600 text-xs font-bold border border-blue-200 px-3 py-1 rounded bg-white hover:bg-blue-50">
                                             Scan for Checkout
                                         </button>
                                     </div>
                                 ))}
                             </div>
                             <div className="mt-6 pt-4 border-t flex justify-between items-center">
                                 <span className="text-gray-500 font-medium">Total Pending</span>
                                 <span className="text-2xl font-bold text-gray-900">${cart.reduce((a,c) => a + c.product.price * c.quantity, 0)}</span>
                             </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full bg-white rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 p-10">
                        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4"></path></svg>
                        <p className="text-lg font-medium">No Active Session</p>
                        <p className="text-sm">Scan a customer QR code to load their profile.</p>
                        <div className="mt-8">
                             <p className="text-xs uppercase font-bold text-center mb-2">Simulate Scan</p>
                             <div className="flex gap-2">
                                <button onClick={() => setSidInput('demo_web')} className="px-3 py-1 bg-gray-100 rounded text-xs hover:bg-gray-200">Web User</button>
                                <button onClick={() => setSidInput('demo_chat')} className="px-3 py-1 bg-gray-100 rounded text-xs hover:bg-gray-200">Chat User</button>
                             </div>
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT COL: EINSTEIN INSIGHTS */}
            <div className="col-span-12 md:col-span-3 space-y-6">
                 {/* Next Best Action */}
                 <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-5 rounded-lg shadow-md relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-2 opacity-20">
                         <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path></svg>
                     </div>
                     <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-200 mb-2">Einstein Next Best Action</h3>
                     <p className="font-bold text-lg mb-2">Offer 10% Bundle Discount</p>
                     <p className="text-xs text-indigo-100 mb-4">Customer has high affinity for "Running" category but abandoned cart twice.</p>
                     <button className="w-full bg-white text-indigo-700 font-bold py-2 rounded text-sm hover:bg-indigo-50">
                         Apply Offer
                     </button>
                 </div>

                 {/* Chat Context */}
                 <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                     <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Recent Chat Context</h3>
                     <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                         {messages.filter(m => m.role !== 'system').slice(-5).map(m => (
                             <div key={m.id} className={`p-2 rounded text-xs ${m.role === 'user' ? 'bg-gray-100 text-gray-800' : 'bg-blue-50 text-blue-800'}`}>
                                 <span className="font-bold block mb-1">{m.role === 'user' ? 'Customer' : 'AURA Agent'}</span>
                                 {m.text}
                             </div>
                         ))}
                     </div>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default StaffDashboard;