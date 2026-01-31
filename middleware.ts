import { neonAuthMiddleware } from "@neondatabase/auth/next/server";

export default neonAuthMiddleware({
  loginUrl: "/auth/sign-in",
});

export const config = {
  matcher: [
    // Protect /dashboard and other routes, but allow root / to be public
    "/dashboard/:path*",
    "/((?!_next/static|_next/image|favicon.ico|api/auth|auth|$)(?!^/$).*)",
  ],
};
