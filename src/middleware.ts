export { auth } from "@/auth";

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Middleware to handle redirection from the landing page to /app/today if the user is signed in
export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Check if the user is already authenticated
  //   const isAuthenticated = req.cookies.get("authToken"); // or use localStorage logic for client-side

  // Redirect if on landing page and the user is authenticated
  if (pathname === "/" || pathname === "/app") {
    return NextResponse.redirect(new URL("/app/today", req.url)); // Redirect to /app/today if signed in
  }

  // Allow the request to continue if the user is not on the landing page or not authenticated
  return NextResponse.next();
}

// Specify which routes the middleware applies to (i.e., only for the landing page)
export const config = {
  matcher: ["/", "/app"], // Only apply to the root (landing) page
};
