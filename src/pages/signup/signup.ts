import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup : FormGroup

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder : FormBuilder) {

      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        tipo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['', [Validators.required]],
        logradouro: ['', [Validators.required]],
        complemento: ['', []],
        bairro: ['', []],
        cep: ['', [Validators.required]],
        telefone1: ['', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: ['', [Validators.required]],
        cidadeId: ['', [Validators.required]],
      })
                
  }

  signupUser(){
    console.log("enviou");
  }  

}
