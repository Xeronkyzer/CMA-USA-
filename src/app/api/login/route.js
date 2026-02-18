import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    const body = await request.json();
    const { username, password } = body;

    // Hardcoded credentials as per user request
    // Username: Sanjana
    // Password: Sanjanaisadoredbysuryash
    if (username === 'Sanjana' && password === 'Sanjanaisadoredbysuryash') {
        const response = NextResponse.json({ success: true }, { status: 200 });

        // Set HTTP-only cookie
        response.cookies.set('auth_token', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return response;
    }

    return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
    );
}
