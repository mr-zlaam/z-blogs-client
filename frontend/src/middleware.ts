import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verify, JsonWebTokenError } from "jsonwebtoken";

export default function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  const tokenValue = token?.value as string;
  if (request.nextUrl.pathname === "/admin/users") {
    if (!token?.value) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    const secret = process.env.JWT_ACCESS_SECRET as string;
    try {
      verify(tokenValue, secret);
    } catch (error: any) {
      if (error instanceof JsonWebTokenError) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    }
  }
  if (request.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  if (request.nextUrl.pathname === "/user-auth/sign-in") {
    if (token?.value) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  } else if (request.nextUrl.pathname === "/user-auth/sign-up") {
    if (token?.value) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
  if (request.nextUrl.pathname === "/")
    return NextResponse.redirect(new URL("/home", request.url));
}
