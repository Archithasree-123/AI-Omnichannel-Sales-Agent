import { GoogleGenAI, FunctionDeclaration, Type, Tool } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// 1. Search Tool
const searchProductsTool: FunctionDeclaration = {
  name: "searchProducts",
  description: "Search for shoes in the product catalog based on keywords, category, or features.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: { type: Type.STRING, description: "Keywords to search for" },
    },
    required: ["query"],
  },
};

// 2. Add to Cart Tool
const addToCartTool: FunctionDeclaration = {
  name: "addToCart",
  description: "Add a specific product to the user's shopping cart.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      productId: { type: Type.STRING, description: "The ID of the product to add." },
      size: { type: Type.NUMBER, description: "The size of the shoe (default to 9 if unknown)." },
    },
    required: ["productId"],
  },
};

// 3. Process Payment Tool (NEW)
const processPaymentTool: FunctionDeclaration = {
  name: "processPayment",
  description: "Process payment for the items currently in the cart and place the order. Use this when user confirms purchase.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      method: { type: Type.STRING, description: "Payment method (e.g., 'saved_card')" },
    },
    // No required params strictly needed if we assume saved card, but keeping structure clean
  },
};

// 4. Cancel Order Tool (NEW)
const cancelOrderTool: FunctionDeclaration = {
  name: "cancelOrder",
  description: "Cancel an existing order. If no ID provided, attempts to cancel the most recent active order.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      orderId: { type: Type.STRING, description: "The ID of the order to cancel." },
    },
  },
};

// 5. Size Recommendation Tool
const getSizeRecommendationTool: FunctionDeclaration = {
  name: "getSizeRecommendation",
  description: "Get size guidance based on category and user history.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      category: { type: Type.STRING, description: "Category of shoe (e.g., Running, Hiking)" },
    },
    required: ["category"],
  },
};

// 6. Store Inventory Check
const checkStoreInventoryTool: FunctionDeclaration = {
  name: "checkStoreInventory",
  description: "Check if a product is available in the nearest physical store.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      productName: { type: Type.STRING, description: "Name of the product" },
    },
    required: ["productName"],
  },
};

// 7. Create Lead Tool
const createLeadTool: FunctionDeclaration = {
  name: "createLead",
  description: "Create a new lead in the CRM.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "Customer Name" },
      email: { type: Type.STRING, description: "Customer Email" },
    },
    required: ["name"],
  },
};

// 8. Add Loyalty Points
const addLoyaltyPointsTool: FunctionDeclaration = {
  name: "addLoyaltyPoints",
  description: "Add loyalty points to the customer's account.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      points: { type: Type.NUMBER, description: "Number of points to add" },
      reason: { type: Type.STRING, description: "Reason for adding points" },
    },
    required: ["points"],
  },
};

const tools: Tool[] = [
  {
    functionDeclarations: [
      searchProductsTool, 
      addToCartTool, 
      processPaymentTool,
      cancelOrderTool,
      getSizeRecommendationTool, 
      checkStoreInventoryTool,
      createLeadTool,
      addLoyaltyPointsTool
    ],
  },
];

class GeminiService {
  private ai: GoogleGenAI;
  private model: string = "gemini-2.5-flash";

  constructor() {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) console.error("API_KEY missing");
    this.ai = new GoogleGenAI({ apiKey });
  }

  async sendMessage(
    history: any[],
    message: string,
    toolExecutors: {
      searchProducts: (args: any) => Promise<any>;
      addToCart: (args: any) => Promise<any>;
      processPayment: (args: any) => Promise<any>;
      cancelOrder: (args: any) => Promise<any>;
      getSizeRecommendation: (args: any) => Promise<any>;
      checkStoreInventory: (args: any) => Promise<any>;
      createLead: (args: any) => Promise<any>;
      addLoyaltyPoints: (args: any) => Promise<any>;
    }
  ) {
    const validHistory = history
      .filter(msg => msg.role === 'user' || msg.role === 'model')
      .slice(-15)
      .map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text || " " }],
      }));

    const chat = this.ai.chats.create({
      model: this.model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: tools,
      },
      history: validHistory,
    });

    try {
      const result = await chat.sendMessage({ message });
      const candidates = result.candidates;
      if (!candidates || candidates.length === 0) return { text: "Connection error." };

      const content = candidates[0].content;
      const parts = content.parts;
      const functionCallPart = parts.find(p => p.functionCall);

      if (functionCallPart && functionCallPart.functionCall) {
        const { name, args } = functionCallPart.functionCall;
        let functionResponse;

        if (name === 'searchProducts') functionResponse = await toolExecutors.searchProducts(args);
        else if (name === 'addToCart') functionResponse = await toolExecutors.addToCart(args);
        else if (name === 'processPayment') functionResponse = await toolExecutors.processPayment(args);
        else if (name === 'cancelOrder') functionResponse = await toolExecutors.cancelOrder(args);
        else if (name === 'getSizeRecommendation') functionResponse = await toolExecutors.getSizeRecommendation(args);
        else if (name === 'checkStoreInventory') functionResponse = await toolExecutors.checkStoreInventory(args);
        else if (name === 'createLead') functionResponse = await toolExecutors.createLead(args);
        else if (name === 'addLoyaltyPoints') functionResponse = await toolExecutors.addLoyaltyPoints(args);

        const responseResult = await chat.sendMessage({
          message: [{ functionResponse: { name: name, response: { result: functionResponse } } }],
        });

        return {
          text: responseResult.text,
          toolResult: functionResponse,
          toolName: name
        };
      }

      return { text: result.text };
    } catch (error) {
      console.error("Gemini API Error:", error);
      return { text: "I apologize, system is undergoing maintenance. Please try again." };
    }
  }
}

export const geminiService = new GeminiService();