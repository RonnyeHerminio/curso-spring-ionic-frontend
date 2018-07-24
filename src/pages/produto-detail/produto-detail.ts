import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

/**
 * Generated class for the ProdutoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item : ProdutoDTO;
  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService : ProdutoService) {
  }

  ionViewDidLoad() {

    let produto_id = this.navParams.get('produto_id');
    this.produtoService.findById(produto_id).subscribe(response => {
      this.item = response;
    }, error => {});
  }

}