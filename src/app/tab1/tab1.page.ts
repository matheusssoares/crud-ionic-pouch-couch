import { Component } from '@angular/core';
import { TesteProviderService } from '../teste-provider.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  noticia: any = {
    titulo: '',
    descricao: ''
  }
  itens: any;
  constructor(private teste: TesteProviderService, public alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.teste.TodasNoticias().then((data) => {
      this.itens = data;
    })

  }

  cadastrar(noticia) {
    noticia._id = Math.random().toString(36).substr(2, 9);

    this.teste.cadastrar(noticia).then(() => {
      this.noticia = {
        titulo: '',
        descricao: ''
      }
      this.ngOnInit();
    }).catch((err) => {
      console.log('houve um erro', err);

    })
  }

  editar(item) {
    
    this.alertCtrl.create({
      header: 'Editar Notícia',
      inputs: [
        {
          id: 'titulo',
          type: 'text',
          name: 'titulo',
          value: item.titulo,
          placeholder: 'Título da notícia'
        },
        {
          id: 'descricao',
          type: 'text',
          name: 'descricao',
          value: item.descricao,
          placeholder: 'Descrição'
        }

      ],
      buttons: [
        {
          text: 'Atualizar',
          cssClass: 'primary',
          handler: (data) => {
            var noticia = data;
            noticia._id = item._id;
            noticia._rev = item._rev; 
            
            this.teste.editar(noticia).then(() => {
              this.noticia = {
                titulo: '',
                descricao: ''
              }

              this.ngOnInit();
            }).catch((err) => {
              console.log(err);              
            })
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        }

      ]
    }).then((alert) => alert.present());

  }

  excluir(item){
    this.teste.excluir(item).then(() => {
      this.ngOnInit();
    }).catch((err) =>{
      console.log(err);
      
    })
  }

}
