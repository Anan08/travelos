// This function can be marked `async` if using `await` inside
export function middleware(request: Request) {
  return Response.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/pages/:path*',
}