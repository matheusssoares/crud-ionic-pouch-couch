import { Component, OnInit } from '@angular/core';
import { TesteProviderService } from '../teste-provider.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public amigos: any = [];
  constructor(public teste: TesteProviderService) {
    
  }

  /*  */

}
