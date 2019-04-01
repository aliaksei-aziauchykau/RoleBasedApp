import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { SubscribeOnObservable } from "rxjs/internal-compatibility";
import { Observable } from "rxjs/Rx";
import { Router } from "@angular/router";

@Injectable()
export class JsonInterceptorService implements HttpInterceptor {
    constructor(private readonly router: Router) {

    }

    handler(error: HttpResponse<any>): void {
        switch (error.status) {
            case 301:
            case 302: {
                this.navigate(error.statusText);
            } break;
            default: break;
        }
    }

    private navigate(url: string) {
        this.router.navigate([url]);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            responseType: "text"
        });

        return next.handle(clonedRequest)
            .map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.handler(event);
                    return event.clone({
                        body: JSON.parse(event.body),
                    });
                }
            });
    }
}