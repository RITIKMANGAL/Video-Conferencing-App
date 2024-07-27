import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const protectedRoutes = createRouteMatcher([
  // here are the specific routes that we want to protect.
  '/',
  '/upcoming',
  '/previous',
  '/recordings',
  'personal-room',
  'meeting(.*)'// to match all the meeting routes

])


export default clerkMiddleware((auth,req)=>{

  if(protectedRoutes(req)){
    auth().protect();// if any one goes to protected routes then he/she must sign in to get into.
  }
});


export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};