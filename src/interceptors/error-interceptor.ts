import { Injectable } from "../../node_modules/@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "../../node_modules/ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


    constructor(public storage : StorageService,public alertCtrl : AlertController){

    }

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .catch((error, caught)=>{ 

        let errorObj = error;
        if(errorObj.error){
            errorObj = errorObj.error;
        }
        if(!errorObj.status){
            errorObj = JSON.parse(errorObj);
        }

        console.log("Erro detectado pelo interceptor:");
        console.log(errorObj)

        switch(errorObj.status){
            case 401:
            this.handle401();
            break;
            case 403:
            this.handle403();
            break;
            default:
            this.handleDefaultError(errorObj);
            break;
        }



        return Observable.throw(errorObj);
    }) as any;
  }
  
    handle401(){
        const alert = this.alertCtrl.create({
            title: 'Erro de Autenticação',
            subTitle: 'Email ou senha incorretos',
            buttons: ['OK']
        });
        alert.present();
        
    }
    
    handle403(){
        this.storage.setLocalUser(null);
    }

    handleDefaultError(errorObj){
        const alert = this.alertCtrl.create({
            title: 'Erro '+errorObj.status+ ': '+ errorObj.error,
            subTitle: errorObj.message,
            buttons: ['OK']
        });
        alert.present();
    }

}

export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};