# AURA - AI Omnichannel Sales Agent

<div align="center">

**Redefining Retail, From Chat to Checkout — We've Got You Covered**

[![EY Techathon 6.0](https://img.shields.io/badge/EY%20Techathon-6.0-blue.svg)](https://ey.com)
[![React](https://img.shields.io/badge/React-19.2.3-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178c6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8.svg)](https://tailwindcss.com)
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)](https://ai.google.dev)

</div>

---

## 🎯 Project Overview

**AURA** is an AI-powered omnichannel sales agent for footwear retail that delivers seamless shopping experiences across web, chat, and in-store touchpoints. Built for EY Techathon 6.0, AURA demonstrates the future of retail CX by enabling autonomous AI agents to handle product discovery, order placement, and cancellations while maintaining context across all customer touchpoints.

### 🏆 Team: Agentic Mavericks

| Member | Role | Expertise |
|--------|------|-----------|
| **Architha Sree L K** | Salesforce Development | CRM Integration, Einstein Copilot, Automation Workflows |
| **Hari Prasath N T** | AI/ML Development | Google Gemini, NLP, Function Calling, Conversational AI |
| **Sathiya P** | Backend Engineering | State Management, API Design, Session Handling |
| **Amritha Sree L K** | Frontend Development | React, TypeScript, UI/UX Design, Responsive Layouts |

---

## ✨ Key Features

### 🤖 **Agentic AI Capabilities**
- **Autonomous Transaction Handling**: AI independently processes orders from discovery to payment
- **Tool-Based Architecture**: 8+ integrated tools (searchProducts, addToCart, processPayment, cancelOrder, etc.)
- **Natural Language Understanding**: Intent detection for buy, cancel, and search queries
- **Context-Aware Conversations**: Maintains full chat history across sessions

### 🛍️ **Omnichannel Experience**
- **Web Storefront**: Modern e-commerce interface with advanced filtering and search
- **AI Chat Widget**: Floating chat interface with product cards and checkout links
- **Session Handoff**: QR code-based transfer from web to in-store with full context preservation
- **Staff Dashboard**: POS-style interface for store associates with customer 360 view

### 🔗 **CRM & Automation**
- **Salesforce Integration**: Einstein insights, lead creation, opportunity tracking
- **n8n Workflows**: Automated event logging across platforms (WhatsApp, Salesforce, Web)
- **Loyalty Management**: Tier-based rewards (Silver, Gold, Platinum) with automatic point calculation
- **Order Management**: Complete order lifecycle from placement to cancellation

### 💳 **Commerce Features**
- **Smart Cart**: Multi-item management with size selection and quantity updates
- **Payment Processing**: Simulated checkout with order confirmation
- **Order History**: Track past purchases and status updates
- **Inventory Checks**: Real-time stock availability across channels

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** ([Get one here](https://ai.google.dev))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Archithasree-123/AI-Omnichannel-Sales-Agent.git
   cd AI-Omnichannel-Sales-Agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 📁 Project Structure

```
AI-Omnichannel-Sales-Agent/
├── components/
│   ├── ChatWidget.tsx          # Floating AI chat interface
│   └── Layout.tsx              # Main layout with header/footer
├── pages/
│   ├── Home.tsx                # Product catalog and hero section
│   ├── Cart.tsx                # Shopping cart with QR handoff
│   ├── StaffDashboard.tsx      # POS interface for staff
│   └── Docs.tsx                # Project documentation page
├── context/
│   └── StoreContext.tsx        # Global state management
├── services/
│   └── geminiService.ts        # Google Gemini AI integration
├── types.ts                    # TypeScript type definitions
├── constants.ts                # Product catalog & system prompts
├── App.tsx                     # Main app component with routing
├── index.tsx                   # Entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

---

## 🎨 User Interface

### Home Page (Shop View)
- **Hero Section**: Engaging banner with CTA buttons
- **Product Grid**: Filterable catalog with search, category, and tag filters
- **Product Cards**: Image, name, price, tags, and add-to-cart functionality

### Chat Widget
- **Floating Button**: Bottom-right corner with notification badge
- **Expandable Chat**: Full conversation interface with AI responses
- **Product Cards**: Embedded product recommendations in chat
- **Checkout Links**: Secure payment links generated by AI

### Cart Page
- **Order Summary**: Subtotal, shipping, and total calculation
- **QR Code Handoff**: Session code for in-store continuation
- **Success Screen**: Order confirmation with loyalty points earned

### Staff Dashboard
- **Session Lookup**: Scan or enter customer session ID
- **Customer 360**: Profile, cart, loyalty tier, and preferences
- **Einstein Insights**: Next best action recommendations
- **Automation Logs**: Real-time n8n workflow event tracking

---

## 🛠️ Technology Stack

### Frontend
- **React 19.2.3**: Modern UI library with hooks
- **TypeScript 5.8.2**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Vite 6.2.0**: Fast build tool and dev server

### AI & Backend
- **Google Gemini**: Conversational AI with function calling
- **React Context API**: Centralized state management
- **LocalStorage**: Session persistence across page reloads

### Planned Integrations
- **Salesforce**: Sales Cloud, Service Cloud, Einstein Copilot
- **n8n**: Workflow automation and event orchestration
- **WhatsApp Business API**: Multi-channel chat support
- **Stripe/Razorpay**: Payment gateway integration

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |

---

## 🤖 AI Agent Capabilities

AURA uses Google Gemini with function calling to autonomously execute actions:

| Tool | Purpose | Example |
|------|---------|---------|
| `searchProducts` | Find products by name, category, or tags | "Show me running shoes" |
| `addToCart` | Add items to shopping cart | "Add the Speedster to my cart" |
| `processPayment` | Complete order and generate order ID | "Order it" / "Buy now" |
| `cancelOrder` | Cancel existing orders with refund | "Cancel my last order" |
| `getSizeRecommendation` | Provide fit advice based on history | "What size should I get?" |
| `checkStoreInventory` | Check in-store stock availability | "Is this available in-store?" |
| `createLead` | Generate CRM leads from conversations | Auto-triggered on engagement |
| `addLoyaltyPoints` | Award points for actions/purchases | Auto-triggered on order |

---

## 📊 Session Handoff Flow

```
Web Browser                    Staff Tablet
    |                               |
    | 1. Customer adds to cart     |
    | 2. AI generates QR code       |
    |                               |
    |------- QR Displayed --------->|
    |                               |
    |                          3. Staff scans
    |                          4. Session loaded
    |                          5. Cart + history visible
    |                               |
    |                          6. In-store checkout
```

---

## 🎯 Future Enhancements

- [ ] **WhatsApp Integration**: Full conversational commerce via WhatsApp
- [ ] **Voice Assistant**: Voice-based shopping with speech-to-text
- [ ] **AR Try-On**: Virtual shoe fitting using camera
- [ ] **Predictive Analytics**: Demand forecasting and inventory optimization
- [ ] **Multi-Language Support**: Localization for global markets
- [ ] **Real Payment Gateway**: Stripe/Razorpay integration
- [ ] **Mobile App**: Native iOS/Android applications
- [ ] **Social Commerce**: Instagram/Facebook shopping integration

---

## 📸 Screenshots

### Web Storefront
![Home Page](https://via.placeholder.com/800x400?text=AURA+Home+Page)

### AI Chat Widget
![Chat Interface](https://via.placeholder.com/400x600?text=AURA+Chat+Widget)

### Staff Dashboard
![POS View](https://via.placeholder.com/800x400?text=AURA+Staff+Dashboard)

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

This project is developed for EY Techathon 6.0. All rights reserved by Team Agentic Mavericks.

---

<div align="center">

**Built with ❤️ by Agentic Mavericks**

*Redefining Retail, From Chat to Checkout*

</div>

