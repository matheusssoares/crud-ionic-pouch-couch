import { Component } from '@angular/core';
import { TesteProviderService } from '../teste-provider.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  amigos: any;
  constructor(public teste: TesteProviderService) {
    this.teste.getDadosDb();
  }
  
}
