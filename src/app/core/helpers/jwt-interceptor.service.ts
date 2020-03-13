import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {Observable} from 'rxjs';
import {IdentityService} from '../service/identity.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(
    private identityService: IdentityService
  ) { }

  // @ts-ignore
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string;

    if (this.identityService.appUserValue) {
      token = this.identityService.appUserValue.token;
    }

    if (token) {
      const bearer: string = 'Bearer ' + token;
      // Clone the original request (immutable)
      const newRequest: HttpRequest<any> = req.clone(
        { setHeaders: {
            Authorization: bearer
          }
        });

      // Finally release the updated request
      return next.handle(newRequest);
    }
    return next.handle(req);
  }
}
