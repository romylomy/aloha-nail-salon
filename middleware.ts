import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// A utility function to define which routes should be protected by middleware.
const isProtectedRoute = createRouteMatcher(["/admin(.*)"])


/*
A middleware function provided by Clerk (authentication service) for protecting routes.
This exports the middleware function for use in Next.js. It's executed for each incoming request that matches the matcher

isProtectedRoute(req): Checks if the requested route matches the protected /admin route.
auth().protect(): If the route is protected, it calls auth().protect(), which ensures the user is authenticated. If not authenticated, 
Clerk will typically redirect the user to the login page.
*/


export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}