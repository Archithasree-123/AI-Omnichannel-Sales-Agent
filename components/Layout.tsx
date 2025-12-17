import React from 'react';
import { useStore } from '../context/StoreContext';
import { AppRoute } from '../types';

interface LayoutProps {
  currentRoute: AppRoute;
  setRoute: (route: AppRoute) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentRoute, setRoute, children }) => {
  const { cart, user } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setRoute(AppRoute.HOME)}>
              <span className="text-2xl font-bold tracking-tighter">AURA.</span>
            </div>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setRoute(AppRoute.HOME)}
                className={`${currentRoute === AppRoute.HOME ? 'text-black' : 'text-gray-500'} font-medium hidden md:block`}
              >
                Shop
              </button>
              <button 
                 onClick={() => setRoute(AppRoute.DOCS)}
                 className={`${currentRoute === AppRoute.DOCS ? 'text-black' : 'text-gray-500'} font-medium hidden md:block`}
              >
                Project Overview
              </button>
              
              <div className="flex items-center gap-4">
                 <button 
                  onClick={() => setRoute(AppRoute.STAFF_VIEW)} 
                  className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 hover:bg-gray-200"
                >
                  Staff View
                </button>

                <button onClick={() => setRoute(AppRoute.PROFILE)} className="relative group">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span className="text-xs font-bold">{user.loyaltyPoints} pts</span>
                  </div>
                </button>

                <button onClick={() => setRoute(AppRoute.CART)} className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 bg-gray-50">
        {children}
      </main>

      <footer className="bg-black text-white py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-white font-bold text-lg mb-2">Agentic Mavericks</p>
            <p className="text-gray-400 text-sm">EY Techathon 6.0 | 14-10-2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;