# Contributing to AURA

Thank you for your interest in contributing to **AURA - AI Omnichannel Sales Agent**! This document provides guidelines and instructions for contributing to the project.

---

## 🎯 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Testing Guidelines](#testing-guidelines)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We expect:

- **Respectful Communication**: Be kind and constructive in all interactions
- **Collaborative Spirit**: Work together to solve problems
- **Inclusivity**: Welcome contributors of all backgrounds and skill levels
- **Professional Conduct**: Maintain professionalism in all project-related activities

---

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git** (latest version)
- **Google Gemini API Key** ([Get one here](https://ai.google.dev))
- **Code Editor** (VS Code recommended)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/AI-Omnichannel-Sales-Agent.git
   cd AI-Omnichannel-Sales-Agent
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Archithasree-123/AI-Omnichannel-Sales-Agent.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and add your VITE_GEMINI_API_KEY
   ```

6. **Start development server**:
   ```bash
   npm run dev
   ```

---

## 🔄 Development Workflow

### Branch Strategy

We follow a feature-branch workflow:

```
main (production-ready code)
  ├── develop (integration branch)
  │   ├── feature/ai-improvements
  │   ├── feature/staff-dashboard-updates
  │   ├── bugfix/cart-calculation
  │   └── enhancement/ui-redesign
```

### Creating a Feature Branch

```bash
# Update your local main
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Branch Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| New Feature | `feature/feature-name` | `feature/whatsapp-integration` |
| Bug Fix | `bugfix/issue-description` | `bugfix/cart-total-calculation` |
| Enhancement | `enhancement/improvement-name` | `enhancement/chat-ui-polish` |
| Documentation | `docs/topic` | `docs/api-documentation` |
| Refactor | `refactor/component-name` | `refactor/store-context` |

---

## 📝 Coding Standards

### TypeScript Guidelines

```typescript
// ✅ DO: Use explicit types
interface Product {
  id: string;
  name: string;
  price: number;
}

// ❌ DON'T: Use implicit any
const product: any = {...};

// ✅ DO: Use functional components with typed props
interface HomeProps {
  products: Product[];
}
const Home: React.FC<HomeProps> = ({ products }) => {...};

// ✅ DO: Use descriptive variable names
const filteredProducts = products.filter(...);

// ❌ DON'T: Use single-letter or unclear names
const p = products.filter(...);
```

### React Best Practices

```typescript
// ✅ DO: Use hooks for state management
const [cart, setCart] = useState<CartItem[]>([]);

// ✅ DO: Memoize expensive calculations
const filteredProducts = useMemo(() => {
  return products.filter(p => p.category === selectedCategory);
}, [products, selectedCategory]);

// ✅ DO: Use useCallback for event handlers passed as props
const handleAddToCart = useCallback((productId: string) => {
  addToCart(productId, 9);
}, [addToCart]);

// ✅ DO: Clean up effects
useEffect(() => {
  const timer = setTimeout(...);
  return () => clearTimeout(timer);
}, []);
```

### Styling Guidelines

```tsx
// ✅ DO: Use Tailwind CSS utility classes
<div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition">

// ✅ DO: Group related classes logically
<button className="
  bg-blue-600 text-white 
  px-4 py-2 
  rounded-lg 
  hover:bg-blue-700 
  transition-colors
">

// ❌ DON'T: Use inline styles (unless absolutely necessary)
<div style={{ backgroundColor: 'white', padding: '1rem' }}>
```

### File Organization

```typescript
// ✅ DO: Organize imports
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party imports
import { useStore } from '../context/StoreContext';

// 3. Local imports
import { Product, CartItem } from '../types';
import { SAMPLE_PRODUCTS } from '../constants';

// 4. Styles (if any)
import './styles.css';
```

---

## 💬 Commit Guidelines

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(chat): add product card rendering` |
| `fix` | Bug fix | `fix(cart): correct total calculation` |
| `docs` | Documentation | `docs(readme): update installation steps` |
| `style` | Code formatting | `style(home): fix indentation` |
| `refactor` | Code refactoring | `refactor(context): simplify state logic` |
| `test` | Add/update tests | `test(cart): add unit tests` |
| `chore` | Maintenance | `chore(deps): update dependencies` |

### Examples

```bash
# Good commit messages
git commit -m "feat(ai): integrate Google Gemini function calling"
git commit -m "fix(dashboard): resolve session loading issue"
git commit -m "docs(contributing): add coding standards section"

# Bad commit messages (avoid these)
git commit -m "fixed stuff"
git commit -m "update"
git commit -m "WIP"
```

---

## 🔀 Pull Request Process

### Before Submitting

1. **Update your branch** with latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test your changes**:
   ```bash
   npm run dev
   # Manually test affected features
   ```

3. **Build successfully**:
   ```bash
   npm run build
   ```

4. **Lint your code** (if linting is configured):
   ```bash
   npm run lint
   ```

### Submitting a Pull Request

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request** on GitHub with:
   - **Clear title**: `feat(chat): add WhatsApp integration`
   - **Description** including:
     - What changes were made
     - Why the changes were necessary
     - How to test the changes
     - Screenshots/videos (if UI changes)
     - Related issues (if any)

3. **PR Template**:
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Enhancement
   - [ ] Documentation update
   
   ## Testing
   - [ ] Tested on Chrome
   - [ ] Tested on Firefox
   - [ ] Tested on mobile
   
   ## Screenshots (if applicable)
   [Add screenshots here]
   
   ## Related Issues
   Closes #123
   ```

### Review Process

- PRs require at least **one approval** from team members
- Address all review comments
- Keep discussions professional and constructive
- Be patient - reviews may take time

---

## 📂 Project Structure

### Key Directories

```
components/     # Reusable React components
pages/          # Page-level components
context/        # React Context providers
services/       # External service integrations (AI, APIs)
types.ts        # TypeScript type definitions
constants.ts    # Configuration and static data
```

### Adding New Features

#### Example: Adding a New Page

1. Create component in `pages/`:
   ```typescript
   // pages/Orders.tsx
   import React from 'react';
   import { useStore } from '../context/StoreContext';
   
   const Orders: React.FC = () => {
     const { orders } = useStore();
     return <div>Order History</div>;
   };
   
   export default Orders;
   ```

2. Add route in `App.tsx`:
   ```typescript
   case AppRoute.ORDERS:
     return <Orders />;
   ```

3. Update types in `types.ts` if needed

#### Example: Adding New AI Tool

1. Add tool definition in `constants.ts`:
   ```typescript
   export const TOOLS = [
     // ... existing tools
     {
       name: 'checkDeliveryStatus',
       description: 'Check delivery status of an order',
       parameters: { orderId: 'string' }
     }
   ];
   ```

2. Implement executor in `context/StoreContext.tsx`:
   ```typescript
   checkDeliveryStatus: async ({ orderId }) => {
     const order = orders.find(o => o.id === orderId);
     return order ? `Order ${orderId} is ${order.status}` : 'Order not found';
   }
   ```

---

## 🧪 Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] **Home Page**: Product grid, filters, search
- [ ] **Chat Widget**: Open/close, send messages, AI responses
- [ ] **Cart**: Add items, remove items, total calculation
- [ ] **Staff Dashboard**: Session lookup, customer data display
- [ ] **Responsive Design**: Test on mobile, tablet, desktop
- [ ] **Browser Compatibility**: Chrome, Firefox, Safari, Edge

### Testing AI Features

```bash
# Test common scenarios:
1. "Show me running shoes" → Should display running shoes
2. "Add Speedster to cart" → Should add to cart
3. "Order it" → Should process payment
4. "Cancel my order" → Should cancel last order
```

---

## ❓ Questions or Issues?

- **Bug Reports**: [Open an issue](https://github.com/Archithasree-123/AI-Omnichannel-Sales-Agent/issues)
- **Feature Requests**: [Open an issue](https://github.com/Archithasree-123/AI-Omnichannel-Sales-Agent/issues)
- **Questions**: Check existing issues or open a new discussion

---

## � Contributors

### Core Team (EY Techathon 6.0)

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/Archithasree-123.png" width="100px;" alt="Architha Sree L K"/><br />
      <sub><b>Architha Sree L K</b></sub><br />
      <sub>Salesforce Development</sub><br />
      <a href="https://github.com/Archithasree-123" title="GitHub">🔗</a>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100?text=HP" width="100px;" alt="Hari Prasath N T"/><br />
      <sub><b>Hari Prasath N T</b></sub><br />
      <sub>AI/ML Development</sub><br />
      <a href="#" title="GitHub">🔗</a>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100?text=SP" width="100px;" alt="Sathiya P"/><br />
      <sub><b>Sathiya P</b></sub><br />
      <sub>Backend Engineering</sub><br />
      <a href="#" title="GitHub">🔗</a>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100?text=AS" width="100px;" alt="Amritha Sree L K"/><br />
      <sub><b>Amritha Sree L K</b></sub><br />
      <sub>Frontend Development</sub><br />
      <a href="#" title="GitHub">🔗</a>
    </td>
  </tr>
</table>

### Contribution Breakdown

| Contributor | Role | Key Contributions |
|-------------|------|-------------------|
| **Architha Sree L K** | Salesforce Lead | CRM Integration, Einstein Copilot, n8n Workflows, Automation Architecture |
| **Hari Prasath N T** | AI/ML Lead | Google Gemini Integration, Function Calling, NLP, Intent Detection |
| **Sathiya P** | Backend Lead | State Management, Session Handling, API Design, Order Processing |
| **Amritha Sree L K** | Frontend Lead | React Components, UI/UX Design, Responsive Layouts, Tailwind Styling |

---

## �🙏 Thank You!

Your contributions make AURA better for everyone. We appreciate your time and effort!

---

<div align="center">

**Happy Coding! 🚀**

*Team Agentic Mavericks*

</div>
