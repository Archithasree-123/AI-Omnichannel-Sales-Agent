import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AppRoute } from '../types';

interface CartProps {
  setRoute: (route: AppRoute) => void;
}

const Cart: React.FC<CartProps> = ({ setRoute }) => {
  const { cart, removeFromCart, simulatePayment, sessionId } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleCheckout = async () => {
    setIsProcessing(true);
    await simulatePayment();
    setIsProcessing(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center p-8 bg-white rounded-2xl shadow-xl">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6">You've earned 50 loyalty points.</p>
        <button onClick={() => { setIsSuccess(false); setRoute(AppRoute.HOME); }} className="bg-black text-white px-6 py-2 rounded-full">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <button onClick={() => setRoute(AppRoute.HOME)} className="text-black underline font-bold">Go to Shop</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
                <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-bold">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                  <p className="font-mono mt-1">${item.product.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 text-sm hover:underline self-start"
                >
                  Remove
                </button>
              </div>
            ))}
            
            {/* OMNICHANNEL HANDOFF UI */}
            <div className="mt-8 bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-center gap-6">
               <div className="bg-white p-2 rounded-lg shadow-sm">
                  {/* Fake QR for demo */}
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(sessionId)}`} alt="Session QR" className="w-24 h-24" />
               </div>
               <div>
                  <h4 className="font-bold text-blue-900">Finish in Store?</h4>
                  <p className="text-sm text-blue-700 mt-1">Show this code to a staff member to try these shoes on immediately. They will have your preferences ready.</p>
                  <p className="text-xs text-blue-400 mt-2 font-mono">Session: {sessionId}</p>
               </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-xl mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 flex justify-center items-center"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Checkout"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;