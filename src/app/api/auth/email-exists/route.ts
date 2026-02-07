import { NextRequest, NextResponse } from 'next/server';
import { emailExists } from '@/lib/mock-auth/mock-data';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const exists = emailExists(email);
    
    return NextResponse.json({ exists });
  } catch (error) {
    console.error('Email exists check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
