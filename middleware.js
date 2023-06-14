import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request, response) {
  // console.log("request", request);
  // console.log({ response });
  // if (request.nextUrl.pathname.startsWith('/api/patient')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url))
  // }
  // return new NextResponse();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// export function middleware(request) {
//   const { pathname } = request.nextUrl;
//   const token = parse(request.headers.cookie || "");
//   console.log("IN AUTHMIDDLEWARE", { pathname, token });

//   // Routes that require authentication
//   const protectedRoutes = ["/api/patient", "/api/patient/:patientId"];

//   if (protectedRoutes.includes(pathname)) {
//     if (!token) {
//       // Token doesn't exist in localStorage, redirect to login page
//       return NextResponse.redirect("/login");
//     } else {
//       const decodedToken = jwt.decode(token);
//       const currentTime = Date.now() / 1000;

//       if (decodedToken.exp < currentTime) {
//         // Token has expired
//         localStorage.removeItem("token");
//         return NextResponse.redirect("/login");
//       }
//     }
//   }
//   return NextResponse.next();
// }
