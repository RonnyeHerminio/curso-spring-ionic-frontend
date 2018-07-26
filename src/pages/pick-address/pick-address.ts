import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.items = [
      {
        id : "1",
        logradouro : "Rua teste 1",
        numero : "123",
        complemento : "",
        bairro : "Centro",
        cep : "1234567",
        cidade:{
          id : "1",
          nome:"Uberlandia",
          estado:{
            id:"1",
            nome:"Minas Gerais"
          }
        }
      },
      {
        id : "2",
        logradouro : "Rua teste 2",
        numero : "3",
        complemento : "",
        bairro : "Candeias",
        cep : "45678932",
        cidade:{
          id : "2",
          nome:"Campinas",
          estado:{
            id:"2",
            nome:"São Paulo"
          }
        }
      }

    ]

    console.log('ionViewDidLoad PickAddressPage');
  }

}
