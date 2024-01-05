import { NextResponse } from 'next/server'
import SessionManager from './models/SessionManager';

export async function getLoginCredentialsValidity(request: Request) {
    const auth = request.headers.get("authorization");
    const session = new SessionManager();
    const failedAuthResponse = NextResponse.json({authorization: false, response: {}}, { status: 403 });

    if (!auth) return failedAuthResponse;

    const response = await session.verify(auth);
    if (!response) return failedAuthResponse;

    return NextResponse.json({ authorization: true, response }, { status: 200 })
}