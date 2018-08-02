import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { PedidoDTO } from "../../models/pedido.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class PedidoService {

    constructor(public http : HttpClient){

    }

    insert(obj: PedidoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`, obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    } 
}