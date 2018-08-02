import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido : PedidoDTO;
  cartItems : CartItem[];
  cliente : ClienteDTO;
  endereco : EnderecoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService : CartService,
    public clienteService : ClienteService
  ) {
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id).subscribe(response => {
      this.cliente = response as ClienteDTO;
      // ao encontrar o cliente, faz-se uma busca pelo endereco em pedidoDTo nos endereços do cliente
      this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
    }, error => {
      this.navCtrl.setRoot('HomePage');
    });
  }


  //busca o endereco através de uma lista de endereços.
  //O pedidoDTO tem apenas referencias aos id's
  private findEndereco(id : string, list : EnderecoDTO[]): EnderecoDTO{
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total(){
    return this.cartService.total();
  }
}
