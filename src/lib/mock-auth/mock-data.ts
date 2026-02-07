import type { User } from '@/types';

export interface MockUser {
  id: string;
  email: string;
  password: string; // In production, this would be hashed
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Mock user database
export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Mock session storage (in production, this would be in Redis/database)
export const mockSessions = new Map<string, {
  user: User;
  expiresAt: Date;
}>();

export function findUserByEmail(email: string): MockUser | undefined {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): MockUser | undefined {
  return mockUsers.find(user => user.id === id);
}

export function validateUser(email: string, password: string): MockUser | null {
  const user = findUserByEmail(email);
  if (!user) return null;
  
  // In production, you'd use bcrypt.compare() here
  return user.password === password ? user : null;
}

export function createUser(email: string, password: string, name?: string): MockUser {
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser: MockUser = {
    id: String(mockUsers.length + 1),
    email: email.toLowerCase(),
    password, // In production, this would be hashed
    name: name || email.split('@')[0],
    role: email.includes('admin') ? 'admin' : 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  mockUsers.push(newUser);
  return newUser;
}

export function createSession(user: MockUser): string {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
  mockSessions.set(sessionId, {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    expiresAt,
  });
  
  return sessionId;
}

export function getSession(sessionId: string): { user: User } | null {
  const session = mockSessions.get(sessionId);
  if (!session) return null;
  
  if (session.expiresAt < new Date()) {
    mockSessions.delete(sessionId);
    return null;
  }
  
  return { user: session.user };
}

export function deleteSession(sessionId: string): void {
  mockSessions.delete(sessionId);
}

export function emailExists(email: string): boolean {
  return !!findUserByEmail(email);
}
