A modern money transfer platform enabling users to send money and gifts to Ethiopia with ease. Built with Next.js, featuring a multi-step transfer flow, admin dashboard, and authentication system.
src/
├── app/ # Next.js App Router
│ ├── admin/ # Admin routes
│ │ ├── dashboard/
│ │ ├── signin/
│ │ └── transactions/
│ ├── api/ # API routes
│ │ └── auth/
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page
├── components/ # React components
│ ├── features/ # Feature-specific components
│ │ ├── auth/ # Authentication components
│ │ ├── transfer/ # Transfer flow components
│ │ ├── admin/ # Admin dashboard components
│ │ └── landing/ # Landing page components
│ ├── shared/ # Reusable UI components
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── dialog.tsx
│ │ └── ... (shadcn/ui components)
│ └── layout/ # Layout components
├── store/ # Zustand state management
│ ├── index.ts # Store exports
│ ├── auth.ts # Authentication store
│ ├── transfer.ts # Transfer flow store
│ ├── admin.ts # Admin dashboard store
│ └── ui.ts # UI state store
├── hooks/ # Custom hooks
│ ├── index.ts # Hook exports
│ ├── useAuth.ts # Authentication hook
│ ├── useTransfer.ts # Transfer flow hook
│ ├── useAdmin.ts # Admin dashboard hook
│ └── useUI.ts # UI state hook
├── types/ # TypeScript type definitions
│ └── index.ts # All type exports
├── constants/ # Application constants
│ └── index.ts # All constants
├── lib/ # Utility libraries
│ ├── auth.ts # Auth configuration
│ ├── utils.ts # General utilities
│ ├── mock-accounts/ # Mock account data
│ └── transactions/ # Transaction utilities
├── styles/ # Styles
│ └── globals.css # Global CSS
└── README.md # This file

🛠️ Development Guidelines

1.  Component Organization

- Place feature-specific components in `src/components/features/[feature]/`
- Place reusable components in `src/components/shared/`
- Use descriptive, PascalCase filenames

2.  State Management

- Use Zustand stores for global state
- Create custom hooks for complex store interactions
- Keep store logic simple and focused

3.  TypeScript

- Export all types from `src/types/index.ts`
- Use strict typing throughout the application
- Leverage path mapping for clean imports

4.  Constants

- Define constants in `src/constants/index.ts`
- Group related constants together
- Use descriptive naming conventions

📦 Dependencies

The re-architected platform uses:

- Next.js 16.1.4 - React framework with App Router
- Zustand 5.0.11 - Lightweight state management
- TypeScript - Type safety
- \*\*Tailwind CSS - Styling
- shadcn/ui - Component library

🚀 Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev


3. Build for production:
`bash
npm run build
```
