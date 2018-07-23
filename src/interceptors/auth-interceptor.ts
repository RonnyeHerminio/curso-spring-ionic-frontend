import { Injectable } from "../../node_modules/@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs/Rx";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage : StorageService){

  }  

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {


    let localUser = this.storage.getLocalUser();

    if(localStorage){
        const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer '+localUser.token)});
        return next.handle(authReq)
    } else{
        return next.handle(req)
    }
  }
}

export const AuthInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};