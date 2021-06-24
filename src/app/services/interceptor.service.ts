// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';


// @Injectable({
//   providedIn: 'root'
// })
// export class InterceptorService implements HttpInterceptor {

//   constructor() { }

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     // alert('intercept')
//     if (localStorage.getItem('token')) {
//       // alert('token there in ls')
//       req = req.clone({
//         setHeaders: {          
//           'Access-Control-Allow-Origin': '*',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       })
//     }

//     return next.handle(req);

//   }
// }
