 Digital Wallet - Money Transfer Platform

A web application for sending money internationally 


This platform enables users to:
- Send money from Ethiopia to the United States
- Track transaction status in real-time
- Manage recipient information securely
- View exchange rates and calculate transfer amounts including fees

 Core Features

 Money Transfer System
- Multi-step transfer wizard with amount input, bank selection, and recipient details
- Real-time currency conversion (ETB to USD)
- Gift bonus calculations for qualifying transfers
- Transaction tracking and receipt generation
- **Payment success page with "Done" button**

 Authentication System
- User registration and login with email verification
- Password reset functionality
- Admin dashboard for transaction management
- Secure session management with HTTP-only cookies

 Error Handling
- **404 Not Found page** with consistent UI design
- **Global error boundary** for graceful error handling
- User-friendly error messages and recovery options
- Navigation shortcuts to help users get back on track

## Test Credentials (Mocked Authentication)

For testing purposes, only the following predefined credentials work:

### Admin Access
- **Email:** admin@example.com
- **Password:** admin123

### User Access
- **Email:** user@example.com
- **Password:** user123

### How to Test
1. Navigate to `/admin/signin`
2. Enter a **predefined email** (admin@example.com or user@example.com)
3. If email exists → Route to password page
4. If email not found → Show error below form
5. Enter the correct password to access the admin panel

### Important Notes
- Users are **pre-defined** in the system
- Admin role is assigned to emails containing "admin"
- Regular user role for all other emails
- Sessions expire after 24 hours for security
- **Strict validation** - exact password match required

 Admin Panel
- Transaction monitoring and status updates
- User management capabilities
- Export functionality for transaction records

 Technical Architecture

 Frontend
- Framework: Next.js 16.1.4 with App Router
- UI: React 19.2.3 with TypeScript
- Styling: Tailwind CSS with custom component library
- Forms: Formik with Yup validation
- State Management: Zustand for client state

 Backend
- API: Next.js API routes
- Database: Neon with Prisma ORM
- Authentication: Mocked authentication system for development
- Validation: Comprehensive input validation and error handling

 Key Components
- Transfer Flow: Multi-step wizard with currency conversion
- Authentication**: Email-based auth with secure session management
- Admin Interface: Transaction management dashboard
- Responsive Design: Mobile-first approach with desktop optimization

 User Flow

1. Registration: Users create account with email verification
2. Login: Secure authentication with password reset option
3. Transfer Initiation: Enter amount, select bank, add recipient details
4. Payment Processing: Complete transaction with receipt generation
5. Tracking: Monitor transaction status through admin panel

 Development Focus

- Security: End-to-end encryption and secure authentication
- Usability: Intuitive multi-step forms with clear validation
- Performance: Optimized for fast loading and smooth interactions
- Scalability: Modular architecture for future feature additions

 Target Users

- Individuals sending money from Ethiopia to the United States
- Admin staff managing and monitoring transactions
- Recipients receiving international transfers

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── signin/
│   │   ├── dashboard/
│   │   └── transactions/
│   ├── api/
│   │   └── auth/
│   │       ├── login/
│   │       ├── get-session/
│   │       └── email-exists/
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── shared/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   └── field/
│   └── features/
│       ├── auth/
│       │   ├── MockAdminAuthFlow.tsx
│       │   ├── EmailForm.tsx
│       │   └── PasswordForm.tsx
│       ├── admin/
│       │   ├── AdminNavbar.tsx
│       │   └── ActionMenu.tsx
│       ├── money-transfer/
│       │   └── components/
│       └── landing/
├── lib/
│   ├── mock-auth/
│   │   └── mock-data.ts
│   ├── transactions/
│   │   ├── types.ts
│   │   ├── data-list.ts
│   │   ├── filters.ts
│   │   └── index.ts
│   ├── auth/
│   └── utils.ts
├── hooks/
│   └── use-auth.ts
├── types/
│   └── index.ts
└── package.json
```

This platform simplifies international money transfers while maintaining security and compliance standards.