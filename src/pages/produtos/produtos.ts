import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public produtoService : ProdutoService,
              public loadingCtrl : LoadingController) {
  }

  ionViewDidLoad() {
    // pegando parametros qeu vem da pagina categorias
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id).subscribe(response => {
      this.items = response['content'];
      loader.dismiss();
    }, 
    error => {
      loader.dismiss();
    });
  }

  showDetail(produto_id : string){
    this.navCtrl.push('ProdutoDetailPage', {produto_id : produto_id});
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();

    return loader;
  }
}
