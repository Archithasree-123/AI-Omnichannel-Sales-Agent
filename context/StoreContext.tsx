import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, User, ChatMessage, SessionData, AutomationLog, Order } from '../types';
import { SAMPLE_PRODUCTS, INITIAL_USER } from '../constants';
import { geminiService } from '../services/geminiService';

interface StoreContextType {
  user: User;
  products: Product[];
  cart: CartItem[];
  orders: Order[]; // New: Order History
  messages: ChatMessage[];
  sessionId: string;
  automationLogs: AutomationLog[];
  isChatOpen: boolean;
  isLoadingAI: boolean;
  toggleChat: () => void;
  addToCart: (productId: string, size: number) => void;
  removeFromCart: (productId: string) => void;
  sendMessageToAI: (text: string) => Promise<void>;
  simulatePayment: () => Promise<void>;
  loadSession: (sid: string) => void;
  resetSession: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]); // New: Orders State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm AURA, your Agentic Sales Associate. I can help you find shoes, place orders, and manage cancellations. What can I get for you?",
      timestamp: new Date()
    }
  ]);
  const [sessionId, setSessionId] = useState<string>(`sess_${Math.random().toString(36).substr(2, 9)}`);
  const [automationLogs, setAutomationLogs] = useState<AutomationLog[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Persistence
  useEffect(() => {
    const savedSession = localStorage.getItem(`aura_session_${sessionId}`);
    if (savedSession) {
      const parsed: SessionData = JSON.parse(savedSession);
      setCart(parsed.cart);
    }
  }, [sessionId]);

  useEffect(() => {
    const data: SessionData = { sessionId, cart, messages, lastActive: new Date() };
    localStorage.setItem(`aura_session_${sessionId}`, JSON.stringify(data));
  }, [cart, messages, sessionId]);

  const addLog = (platform: 'n8n' | 'Salesforce' | 'WhatsApp', trigger: string, action: string) => {
    setAutomationLogs(prev => [{
      id: Date.now().toString(),
      timestamp: new Date(),
      platform,
      trigger,
      action,
      status: 'Success'
    }, ...prev]);
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const addToCart = useCallback((productId: string, size: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.productId === productId && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.productId === productId && item.size === size 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1, size, product }];
    });
    addLog('Salesforce', 'Cart Updated', `Updated Opportunity for User ${user.id}`);
  }, [products, user.id]);

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  // Helper to place order from current cart
  const placeOrder = () => {
    if (cart.length === 0) return null;
    
    const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      items: [...cart],
      total: total,
      date: new Date(),
      status: 'Processing'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCart([]); // Clear Cart
    setUser(prev => ({ ...prev, loyaltyPoints: prev.loyaltyPoints + Math.floor(total * 0.1) })); // 10% points
    addLog('Salesforce', 'Order Placed', `Order ${newOrder.id} created. Loyalty updated.`);
    return newOrder;
  };

  const simulatePayment = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        placeOrder();
        resolve();
      }, 2000);
    });
  };

  const loadSession = (sid: string) => {
    setSessionId(sid);
    const savedData = localStorage.getItem(`aura_session_${sid}`);
    if (savedData) {
      const parsed: SessionData = JSON.parse(savedData);
      setCart(parsed.cart);
      setMessages(prev => [
        ...prev, 
        { id: 'sys_transfer', role: 'system', text: 'HANDOFF: Session transferred from Web to Store Tablet.', timestamp: new Date() }
      ]);
    }
  };

  const resetSession = () => {
     setSessionId(`sess_${Math.random().toString(36).substr(2, 9)}`);
     setCart([]);
     setMessages([{
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm AURA. How can I help you today?",
      timestamp: new Date()
    }]);
  };

  // TOOL EXECUTORS
  const toolExecutors = {
    searchProducts: async ({ query }: { query: string }) => {
      const lowerQ = query.toLowerCase();
      const matches = products.filter(p => 
        p.name.toLowerCase().includes(lowerQ) || 
        p.category.toLowerCase().includes(lowerQ) ||
        p.tags.some(t => t.includes(lowerQ))
      );
      addLog('Salesforce', 'Knowledge Retrieval', `Searched Catalog for '${query}'`);
      return matches.length > 0 ? matches : "No exact matches found.";
    },
    addToCart: async ({ productId, size }: { productId: string, size: number }) => {
      addToCart(productId, size || 9);
      const p = products.find(prod => prod.id === productId);
      return `Added ${p?.name} (Size ${size || 9}) to cart.`;
    },
    processPayment: async () => {
      // Agentic: "Do upto payment"
      if (cart.length === 0) return "Cart is empty. Cannot process payment.";
      const order = placeOrder();
      return order ? `Payment processed. Order ${order.id} placed successfully. Total: $${order.total}.` : "Error placing order.";
    },
    cancelOrder: async ({ orderId }: { orderId?: string }) => {
      let targetOrder = orderId ? orders.find(o => o.id === orderId) : orders[0]; // Default to latest
      if (!targetOrder) return "No active orders found to cancel.";
      
      setOrders(prev => prev.map(o => o.id === targetOrder!.id ? { ...o, status: 'Cancelled' } : o));
      addLog('Salesforce', 'Order Cancelled', `Order ${targetOrder.id} status updated to Cancelled.`);
      return `Order ${targetOrder.id} has been successfully cancelled. Refund initiated.`;
    },
    getSizeRecommendation: async ({ category }: { category: string }) => {
      addLog('Salesforce', 'Einstein Prediction', `Calculated fit for ${category}`);
      return `Based on your past returns, for ${category} shoes, we recommend going half a size up (US 9.5).`;
    },
    checkStoreInventory: async ({ productName }: { productName: string }) => {
      addLog('Salesforce', 'Inventory Check', `Checked stock for ${productName} at Downtown Store`);
      return `Yes, ${productName} is available at the Downtown Store (3 units left). Reserve now?`;
    },
    createLead: async ({ name, email }: { name: string, email: string }) => {
      addLog('Salesforce', 'Create Lead', `Created Lead: ${name} (${email})`);
      setUser(prev => ({ ...prev, name: name, email: email || prev.email }));
      return `Lead created successfully for ${name}.`;
    },
    addLoyaltyPoints: async ({ points, reason }: { points: number, reason: string }) => {
      addLog('Salesforce', 'Update Loyalty', `Added ${points} pts. Reason: ${reason}`);
      setUser(prev => ({ ...prev, loyaltyPoints: prev.loyaltyPoints + points }));
      return `Added ${points} points. New Balance: ${user.loyaltyPoints + points}.`;
    }
  };

  const sendMessageToAI = async (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoadingAI(true);

    try {
      const response = await geminiService.sendMessage(messages, text, toolExecutors);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "I'm not sure how to help with that.",
        timestamp: new Date()
      };

      if (response.toolName === 'searchProducts' && Array.isArray(response.toolResult)) {
        botMsg.isProductCard = true;
        botMsg.productData = response.toolResult[0]; 
      }

      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { id: 'err', role: 'system', text: 'Connection error.', timestamp: new Date() }]);
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <StoreContext.Provider value={{
      user, products, cart, orders, messages, sessionId, automationLogs, isChatOpen, isLoadingAI,
      toggleChat, addToCart, removeFromCart, sendMessageToAI, simulatePayment, loadSession, resetSession
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};