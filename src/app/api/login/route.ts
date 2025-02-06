// app/api/login/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';
const REFRESH_SECRET = 'your-refresh-secret-key';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Replace with your actual authentication logic
    if (username === 'user' && password === 'pass') {
      const authToken = jwt.sign({ username }, SECRET_KEY, {
        expiresIn: '15m',
      });
      
      const refreshToken = jwt.sign({ username }, REFRESH_SECRET, {
        expiresIn: '7d',
      });

      // Create response with auth token
      const response = NextResponse.json(
        { authToken },
        { status: 200 }
      );

      // Set HTTP-only cookie with refresh token
      response.cookies.set({
        name: 'refreshToken',
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error: unknown) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
