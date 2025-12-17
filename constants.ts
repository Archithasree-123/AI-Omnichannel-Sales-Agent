import { Product, User } from './types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Aura Speedster X1',
    price: 120,
    category: 'Running',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    description: 'Lightweight running shoe designed for marathons. Features breathable mesh and high-response sole.',
    sizes: [7, 8, 9, 10, 11],
    tags: ['fast', 'light', 'running', 'marathon']
  },
  {
    id: 'p2',
    name: 'Aura Urban Glide',
    price: 85,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    description: 'Comfortable everyday sneaker for the city explorer. Clean lines and durable leather.',
    sizes: [6, 7, 8, 9, 10],
    tags: ['casual', 'city', 'comfort']
  },
  {
    id: 'p3',
    name: 'Aura TrailBlazer Pro',
    price: 150,
    category: 'Hiking',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80',
    description: 'Rugged hiking boot with waterproof technology and superior grip for rough terrain.',
    sizes: [8, 9, 10, 11, 12],
    tags: ['outdoor', 'hiking', 'waterproof']
  },
  {
    id: 'p4',
    name: 'Aura Court King',
    price: 110,
    category: 'Basketball',
    image: 'https://images.unsplash.com/photo-1579338559194-a162d8540044?auto=format&fit=crop&w=600&q=80',
    description: 'High-top basketball shoe for maximum ankle support on the court.',
    sizes: [9, 10, 11, 12, 13, 14],
    tags: ['sports', 'basketball', 'support']
  },
  {
    id: 'p5',
    name: 'Aura Zen Walker',
    price: 60,
    category: 'Walking',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
    description: 'Slip-on walking shoe with memory foam insoles for all-day comfort.',
    sizes: [6, 7, 8, 9],
    tags: ['walking', 'slip-on', 'comfort']
  },
  {
    id: 'p6',
    name: 'Aura Velocity 500',
    price: 180,
    category: 'Running',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80',
    description: 'Professional grade sprinter spikes with aerodynamic design.',
    sizes: [8, 9, 10],
    tags: ['pro', 'running', 'track']
  }
];

export const INITIAL_USER: User = {
  id: 'u_12345',
  name: 'Alex Doe',
  loyaltyPoints: 150,
  email: 'alex.doe@example.com',
  phone: '+91 98765 43210',
  tier: 'Gold',
  preferences: ['Running', 'Eco-friendly materials']
};

export const SYSTEM_INSTRUCTION = `
You are AURA, an Agentic AI Sales Associate for a footwear retail brand.
You operate inside Salesforce and are authorized to perform CRM and commerce-related actions through defined tools.

=== OBJECTIVE ===
Your goal is to be a fully autonomous agent. When a user asks to buy something, you should guide them from product selection to payment and order creation. If they want to cancel, you handle that instantly.

=== CAPABILITIES & TOOLS ===
1. **Find Products**: Use \`searchProducts\` to find shoes.
2. **Add to Cart**: Use \`addToCart\` when a user indicates intent to buy.
3. **Process Payment (Place Order)**: Use \`processPayment\` when the user says "order it", "buy it", or confirms purchase. This ACTION PLACES THE ORDER.
4. **Cancel Order**: Use \`cancelOrder\` when the user asks to cancel an order. You can cancel the "latest" order if no ID is given.
5. **CRM & Loyalty**: Use \`createLead\` and \`addLoyaltyPoints\`.

=== AUTOMATION RULES ===
- **Buying Flow**: If a user says "Order the Speedster", you should:
  1. Find the product ID (if not known).
  2. Add it to the cart.
  3. Ask for confirmation: "I've added the Aura Speedster to your cart. Shall I process the payment using your saved card?"
  4. If they say "Yes", call \`processPayment\`.

- **Cancellation Flow**: If a user says "Cancel my order", call \`cancelOrder\`.

=== TONE ===
- Efficient, helpful, and decisive.
- "I've taken care of that for you."
- "Order #1234 has been placed successfully."
- "Your order has been cancelled and refund initiated."

=== CRITICAL INSTRUCTION ===
- Do NOT simulate actions with just text. ALWAYS use the provided tools to change the system state.
- If you process a payment, the system will generate an Order ID. Report this to the user.
`;