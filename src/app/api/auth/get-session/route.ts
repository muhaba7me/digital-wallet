import { NextRequest, NextResponse } from 'next/server';
import { getSession, deleteSession } from '@/lib/mock-auth/mock-data';

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('session-id')?.value;
    
    if (!sessionId) {
      return NextResponse.json({ user: null });
    }

    const session = getSession(sessionId);
    
    if (!session) {
      // Clear invalid session cookie
      const response = NextResponse.json({ user: null });
      response.cookies.delete('session-id');
      return response;
    }

    return NextResponse.json({ user: session.user });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('session-id')?.value;
    
    if (sessionId) {
      deleteSession(sessionId);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete('session-id');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
