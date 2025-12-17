import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import StaffDashboard from './pages/StaffDashboard';
import Docs from './pages/Docs';
import ChatWidget from './components/ChatWidget';
import { StoreProvider } from './context/StoreContext';
import { AppRoute } from './types';

const App: React.FC = () => {
  const [route, setRoute] = useState<AppRoute>(AppRoute.HOME);

  const renderPage = () => {
    switch (route) {
      case AppRoute.HOME:
        return <Home />;
      case AppRoute.CART:
        return <Cart setRoute={setRoute} />;
      case AppRoute.STAFF_VIEW:
        return <StaffDashboard setRoute={setRoute} />;
      case AppRoute.DOCS:
        return <Docs />;
      case AppRoute.PROFILE:
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold">Loyalty Profile</h1>
                <p>You have 150 Points (Gold Tier)</p>
                <button onClick={() => setRoute(AppRoute.HOME)} className="mt-4 underline">Back</button>
            </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <StoreProvider>
      <Layout currentRoute={route} setRoute={setRoute}>
        {renderPage()}
        {route !== AppRoute.STAFF_VIEW && <ChatWidget />}
      </Layout>
    </StoreProvider>
  );
};

export default App;