import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request, response) {
  console.log("request", request);
  console.log({ response });
  // if (request.nextUrl.pathname.startsWith('/api/patient')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url))
  // }
  // return new NextResponse();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
