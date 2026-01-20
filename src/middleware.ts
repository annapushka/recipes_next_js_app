import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const secret = process.env.AUTH_SECRET;
    if (!secret) {
        throw new Error('Missing AUTH_SECRET environment variable');
    }
    const token = await getToken({ req: request, secret });
    const protectedRoutes = ['/ingredients', '/recipes/new', '/recipes/:path*'];

    if (
        protectedRoutes.some((route) =>
            pathname.startsWith(route.replace(':path*', '')),
        )
    ) {
        if (!token) {
            const url = new URL('/error', request.url);
            url.searchParams.set('message', 'Недостаточно прав');
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
};

export const config = {
    matcher: ['/ingredients', '/recipes/new', '/recipes/:path*'],
};
