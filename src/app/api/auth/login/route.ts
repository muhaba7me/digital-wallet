import { NextRequest, NextResponse } from 'next/server';
import { validateUser, createUser, createSession, emailExists } from '@/lib/mock-auth/mock-data';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = emailExists(email);
    
    if (existingUser) {
      // Try to login existing user
      const user = validateUser(email, password);
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Create session and set cookie
      const sessionId = createSession(user);
      const response = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      });

      response.cookies.set('session-id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
      });

      return response;
    } else {
      // Create new user (signup)
      const newUser = createUser(email, password);
      const sessionId = createSession(newUser);
      
      const response = NextResponse.json({
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        }
      });

      response.cookies.set('session-id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
      });

      return response;
    }
  } catch (error) {
    console.error('Login/signup error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
