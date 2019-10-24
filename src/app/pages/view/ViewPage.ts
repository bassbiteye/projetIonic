import { TransactionService } from './../../service/transaction.service';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
    detail: any;
  constructor(
                private trans: TransactionService) { }
  ngOnInit() {
   console.log(this.trans.selectedTrans);
   this.detail =this.trans.selectedTrans;
   
  }
}
