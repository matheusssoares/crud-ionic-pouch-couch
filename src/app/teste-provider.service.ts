import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class TesteProviderService {
  public data: any;
  public db: any;
  public remote: any;
  public noticias: any;
  constructor() {
    this.db = new PouchDB('http://localhost:5984/noticias');
  }


  cadastrar(noticia) {
    return this.db.put(noticia);
  }

  TodasNoticias() {
    //console.log('retornar todas as noticias');
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      });

    });

  }

  editar(noticia){
    return this.db.put(noticia);
  }

  excluir(noticia){
    return this.db.remove(noticia);
  }

  handleChange(change: any) {
    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {

      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if (change.deleted) {
      this.data.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if (changedDoc) {
        this.data[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.data.push(change.doc);
      }

    }
  }
}
