import { auth } from "./auth";

export default auth((req) => {
  const publicRoutes = ["/"];

  const protectedRoutes = [
    "/create-department",
    "/create-user",
    "/upload",
    "/inbox",
    "/outbox",
    "/search",
    "/track-letter",
    "/write",
    "/send",
    "/send-request",
  ];

  const apiAuthPrefix = "/api/auth";
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return undefined;

  if (nextUrl.pathname === "/") {
    if (isLoggedIn) {
      return Response.redirect(new URL("/inbox", nextUrl));
    }
    return undefined;
  }

  if (isProtectedRoute) {
    if (isLoggedIn) {
      return undefined;
    }
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  if (isPublicRoute || !isProtectedRoute) {
    return undefined;
  }

  if (!isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
