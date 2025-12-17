import React from 'react';

const Docs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <h1 className="text-4xl font-extrabold tracking-tight">Agentic Mavericks</h1>
      </div>
      
      <p className="text-xl text-gray-500 mb-12">
        Redefining Retail, From Chat to Checkout — We’ve Got You Covered.
      </p>

      <div className="space-y-16">
        
        {/* TEAM SECTION */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
              <h3 className="font-bold text-lg">Architha Sree L K (01#)</h3>
              <p className="text-sm text-gray-500 font-mono mb-2">Skill: Salesforce Development, Agentic AI</p>
              <p className="text-gray-700">Expert in CRM workflows and building intelligent AI-driven agents for digital sales.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
              <h3 className="font-bold text-lg">Hari Prasath N T (02#)</h3>
              <p className="text-sm text-gray-500 font-mono mb-2">Skill: Python Data Science</p>
              <p className="text-gray-700">Adept at driving insights from data; specializes in recommendation systems, customer analytics, and AI modeling.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
              <h3 className="font-bold text-lg">Sathiya P (03#)</h3>
              <p className="text-sm text-gray-500 font-mono mb-2">Skill: Python Backend Engineering</p>
              <p className="text-gray-700">Confident in API development, server-side logic, and scalable backend architectures for retail AI solutions.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-pink-500">
              <h3 className="font-bold text-lg">Amritha Sree L K (04#)</h3>
              <p className="text-sm text-gray-500 font-mono mb-2">Skill: Full Stack Development</p>
              <p className="text-gray-700">Versatile coder with frontend and backend skills, ensuring robust user experiences and seamless platform integration.</p>
            </div>
          </div>
        </section>

        {/* PROBLEM & SOLUTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
            <div className="bg-gray-900 text-white p-6 rounded-xl h-full">
              <p className="mb-4 font-light">Retailers struggle to provide a seamless shopping experience as customers move between chat, mobile app, and store. Fragmented interactions mean lost sales, generic recommendations, and poor loyalty engagement.</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
                <li>Customers expect personalized assistance everywhere.</li>
                <li>Sales teams find it hard to track individual journeys.</li>
                <li>Existing solutions focus on only one channel.</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Solution: AURA</h2>
            <div className="bg-blue-50 p-6 rounded-xl h-full border border-blue-100">
              <p className="mb-4 text-blue-900 font-medium">An AI-powered omnichannel sales agent that follows customers everywhere—helping them pick products, smoothly checkout, and earn/track loyalty benefits.</p>
              <p className="text-sm text-blue-800">This agent understands preferences, history, and intent, making every customer feel valued and boosting retailer profits.</p>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Planned Solution Design</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Frontend & Channels</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Web Storefront (React + Tailwind)</li>
                    <li>WhatsApp Webhooks (Conversational Entry)</li>
                    <li>Staff Tablet View (Session Handoff)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Agentic Brain</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Salesforce Einstein (Copilot + Prompt Builder)</li>
                    <li>Intent Detection & Guided Selling</li>
                    <li>Vector Retrieval (Product Specs/FAQs)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Orchestration & Backend</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Python Flask APIs (Catalog, Orders, Sessions)</li>
                    <li>n8n Automation (Chat Event -> CRM -> Checkout)</li>
                    <li>PostgreSQL + Redis (Data & Session Cache)</li>
                  </ul>
                </div>
                 <div>
                  <h4 className="font-bold text-gray-900 mb-2">CRM & Loyalty</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Salesforce Sales/Service Cloud</li>
                    <li>Payment Gateway (Stripe/Razorpay)</li>
                    <li>Email/SMS Reminders</li>
                  </ul>
                </div>
             </div>
             
             <div className="mt-8 pt-8 border-t">
                <p className="text-xs text-gray-500 italic">
                  * Note: This demo implementation uses Google Gemini for the AI layer and a simulated backend/DB state managed in React Context for portability.
                </p>
             </div>
          </div>
        </section>

        {/* ROI */}
        <section className="bg-gradient-to-r from-gray-900 to-black text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Potential Business Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">↑ Conv.</div>
                <p className="text-sm text-gray-400">Lift online-to-offline conversions by guiding users across chat, app, and store with a single session.</p>
             </div>
             <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">↓ Aband.</div>
                <p className="text-sm text-gray-400">Reduce cart abandonment through proactive agent nudges and instant checkout links.</p>
             </div>
             <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">↑ Loyalty</div>
                <p className="text-sm text-gray-400">Increase loyalty engagement with automatic points and easy redemption.</p>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Docs;