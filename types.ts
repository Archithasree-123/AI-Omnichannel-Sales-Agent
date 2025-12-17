export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes: number[];
  tags: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: number;
  product: Product;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface User {
  id: string;
  name: string;
  loyaltyPoints: number;
  email: string;
  phone: string;
  tier: 'Silver' | 'Gold' | 'Platinum';
  preferences: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
  isProductCard?: boolean;
  productData?: Product;
  isCheckoutLink?: boolean;
  isOrderSummary?: boolean; // New: Display order details
  orderData?: Order;       // New: Data for order summary
}

export interface AutomationLog {
  id: string;
  timestamp: Date;
  trigger: string;
  action: string;
  platform: 'n8n' | 'Salesforce' | 'WhatsApp';
  status: 'Success' | 'Pending';
}

export interface SessionData {
  sessionId: string;
  cart: CartItem[];
  messages: ChatMessage[];
  lastActive: Date;
}

export enum AppRoute {
  HOME = 'home',
  CART = 'cart',
  PROFILE = 'profile',
  STAFF_VIEW = 'staff',
  DOCS = 'docs',
  ORDERS = 'orders' // New route for order history
}