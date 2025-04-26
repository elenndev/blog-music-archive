import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('next-auth.session-token') || 
    request.cookies.get('__Secure-next-auth.session-token')

    const isAuth = !!token
    const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')
    const isLogin = request.nextUrl.pathname === '/login'
    if(isLogin && isAuth){
            return NextResponse.redirect(new URL('/dashboard', request.url))
    } 

    if (isDashboard && !isAuth) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/login'],
}
