import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { JsonWebTokenError, verify } from "jsonwebtoken";

export default function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  const tokenValue = token?.value as string;
  if (request.nextUrl.pathname === "/admin/users") {
    if (!token?.value) {
      //return NextResponse.redirect(new URL("/home", request.url));
    }
    const secret = process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET as string;
    try {
      verify(tokenValue, secret);
    } catch (error: any) {
      if (error instanceof JsonWebTokenError) {
        console.log(error);
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
  // Extracting the ID and slug segments from the path
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);

  // Check if the path matches the structure of "/1/slug"
  if (segments.length === 2) {
    const slug = segments[1]; // Second segment is the slug

    // Define a strict regex pattern to validate the slug
    const slugPattern = /^[a-zA-Z0-9-_]+$/; // Allows letters, numbers, hyphens, and underscores only

    // If the slug contains invalid characters, redirect to the 404 page
    if (!slugPattern.test(slug)) {
      return NextResponse.rewrite(new URL("/404", request.url)); // Redirect to 404 page
    }
  }

  // Continue to the next middleware or request handler
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  return NextResponse.next();
}
