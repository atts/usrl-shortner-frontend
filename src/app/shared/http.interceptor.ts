import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpIntercept implements HttpInterceptor {

    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.search('user') == -1) {
            const applicationData = JSON.parse(localStorage.getItem('UrlShortnerData'));
            let token = null
            if (applicationData) {
                token = applicationData.token;
            }
            if (!request.headers.has('Content-Type')) {
                request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
            }
            request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
            request = request.clone({ headers: request.headers.set('bearer', token) });
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.status == 302) {
                        console.log("Its 302");
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }));


    }
}