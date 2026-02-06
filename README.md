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

 Authentication System
- User registration and login with email verification
- Password reset functionality
- Admin dashboard for transaction management
- Secure session management using Better Auth

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
- Authentication: Better Auth for secure user management
- Validation: Comprehensive input validation and error handling

 Key Components
- Transfer Flow: Multi-step wizard with currency conversion
- Authentication**: Email-based auth with verification codes
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

This platform simplifies international money transfers while maintaining security and compliance standards.