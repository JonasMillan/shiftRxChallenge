import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "./app/server/auth";

export async function middleware(req: NextRequest) {
    const token = await getToken(); 
    if (req.nextUrl.pathname === ('/create-auction')){
        if (!token) return NextResponse.redirect(new URL('/login', req.url));
    }

    if (req.nextUrl.pathname === ('/dashboard')){
        if (!token) return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next()
}