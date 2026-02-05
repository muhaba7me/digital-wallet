# Re-architected Send Money Platform

## 🏗️ New Architecture Overview

This platform has been re-architected following Next.js 13+ best practices with a clean, scalable folder structure and centralized state management using Zustand.

## 📁 Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin routes
│   │   ├── dashboard/
│   │   ├── signin/
│   │   └── transactions/
│   ├── api/                      # API routes
│   │   └── auth/
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── features/                # Feature-specific components
│   │   ├── auth/               # Authentication components
│   │   ├── transfer/           # Transfer flow components
│   │   ├── admin/              # Admin dashboard components
│   │   └── landing/            # Landing page components
│   ├── shared/                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ... (shadcn/ui components)
│   └── layout/                 # Layout components
├── store/                      # Zustand state management
│   ├── index.ts                # Store exports
│   ├── auth.ts                 # Authentication store
│   ├── transfer.ts             # Transfer flow store
│   ├── admin.ts                # Admin dashboard store
│   └── ui.ts                   # UI state store
├── hooks/                      # Custom hooks
│   ├── index.ts                # Hook exports
│   ├── useAuth.ts              # Authentication hook
│   ├── useTransfer.ts          # Transfer flow hook
│   ├── useAdmin.ts             # Admin dashboard hook
│   └── useUI.ts                # UI state hook
├── types/                      # TypeScript type definitions
│   └── index.ts                # All type exports
├── constants/                  # Application constants
│   └── index.ts                # All constants
├── lib/                        # Utility libraries
│   ├── auth.ts                 # Auth configuration
│   ├── utils.ts                # General utilities
│   ├── mock-accounts/          # Mock account data
│   └── transactions/           # Transaction utilities
├── styles/                     # Styles
│   └── globals.css             # Global CSS
└── README.md                   # This file
```

## 🎯 Key Improvements

### 1. **Feature-Based Component Organization**
- Components are organized by feature/domain rather than type
- Clear separation between feature-specific and shared components
- Improved maintainability and scalability

### 2. **Centralized State Management with Zustand**
- **Auth Store**: User authentication state and actions
- **Transfer Store**: Multi-step transfer form state
- **Admin Store**: Admin dashboard and transaction management
- **UI Store**: UI state (sidebar, theme, notifications)

### 3. **Custom Hooks for Store Access**
- `useAuth()`: Authentication operations and state
- `useTransfer()`: Transfer flow management
- `useAdmin()`: Admin dashboard functionality
- `useUI()`: UI state and notifications

### 4. **TypeScript Path Mapping**
- Clean import paths using `@/` prefix
- Organized by domain (`@/components/*`, `@/store/*`, etc.)
- Improved developer experience

### 5. **Constants Management**
- Centralized constants for exchange rates, API endpoints, etc.
- Easy maintenance and configuration

## 🚀 Usage Examples

### Using the Auth Store
```typescript
import { useAuth } from '@/hooks';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  const handleLogin = async () => {
    await login('user@example.com', 'password');
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
```

### Using the Transfer Store
```typescript
import { useTransfer } from '@/hooks';

const TransferComponent = () => {
  const { 
    currentStep, 
    formData, 
    updateFormData, 
    nextStep, 
    canProceedToNext 
  } = useTransfer();
  
  const handleAmountChange = (amount: number) => {
    updateFormData({ amount });
  };
  
  return (
    <div>
      <p>Step {currentStep} of 6</p>
      <input 
        type="number" 
        value={formData.amount}
        onChange={(e) => handleAmountChange(Number(e.target.value))}
      />
      <button 
        onClick={nextStep}
        disabled={!canProceedToNext()}
      >
        Next
      </button>
    </div>
  );
};
```

### Using UI Notifications
```typescript
import { useUI } from '@/hooks';

const MyComponent = () => {
  const { showSuccess, showError } = useUI();
  
  const handleAction = async () => {
    try {
      await someAsyncOperation();
      showSuccess('Operation completed successfully!');
    } catch (error) {
      showError('Operation failed. Please try again.');
    }
  };
  
  return <button onClick={handleAction}>Execute Action</button>;
};
```

## 🔄 Migration Guide

### Old Structure → New Structure

| Old Path | New Path |
|----------|----------|
| `components/landing/hero.tsx` | `src/components/features/landing/hero.tsx` |
| `components/auth/` | `src/components/features/auth/` |
| `components/admin/` | `src/components/features/admin/` |
| `components/transfer-multi-step-form/` | `src/components/features/transfer/` |
| `components/ui/` | `src/components/shared/` |
| `lib/` | `src/lib/` |
| `app/` | `src/app/` |

### State Management Migration

Instead of prop drilling or local state, use the centralized Zustand stores:

```typescript
// Before: Local component state
const [user, setUser] = useState(null);

// After: Centralized auth store
const { user, setUser } = useAuth();
```

## 🛠️ Development Guidelines

### 1. Component Organization
- Place feature-specific components in `src/components/features/[feature]/`
- Place reusable components in `src/components/shared/`
- Use descriptive, PascalCase filenames

### 2. State Management
- Use Zustand stores for global state
- Create custom hooks for complex store interactions
- Keep store logic simple and focused

### 3. TypeScript
- Export all types from `src/types/index.ts`
- Use strict typing throughout the application
- Leverage path mapping for clean imports

### 4. Constants
- Define constants in `src/constants/index.ts`
- Group related constants together
- Use descriptive naming conventions

## 📦 Dependencies

The re-architected platform uses:
- **Next.js 16.1.4** - React framework with App Router
- **Zustand 5.0.11** - Lightweight state management
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## 🎯 Benefits of New Architecture

1. **Scalability**: Feature-based organization supports growth
2. **Maintainability**: Clear separation of concerns
3. **Developer Experience**: Better TypeScript support and tooling
4. **Performance**: Optimized state management with Zustand
5. **Consistency**: Standardized patterns and conventions
6. **Testability**: Modular structure enables easier testing

This re-architecture provides a solid foundation for future development and maintenance of the send money platform.
