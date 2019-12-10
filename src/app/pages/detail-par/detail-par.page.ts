import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { TransactionService } from '../../service/transaction.service';
import { AuthService } from '../../service/auth.service';
import {Transaction} from '../../model/transaction';
import { __values } from 'tslib';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail-par',
  templateUrl: './detail-par.page.html',
  styleUrls: ['./detail-par.page.scss'],
})
export class DetailParPage implements OnInit {

  today = new Date().toDateString();
    detail: Transaction[];
  date1: {};
  trans: boolean;
  constructor( private _detail : TransactionService,
               private _auth : AuthService,
               private fb: FormBuilder,
               public alertController: AlertController,
               public navCtrl: NavController,
               private router :Router
               ) {} 

      form = new FormGroup({
        dateFrom : new FormControl(this.today, Validators.required),
        dateTo : new FormControl(this.today, Validators.required)
      });
       dateLessthan(from: string, to: string) {
        return (group: FormGroup): {[key: string]: any} => {
          const f = group.controls[from];
          const t = group.controls[to];
          if (f.value > t.value) {
            return {
              dates: 'Date de debut doit etre plus petit que Date de fin'
            };
          }
          if (t.value > this.today) {
            return {
              dates: 'Date de fin doit etre plus grand  qu aujourd hui'
            };
          }
          return {};
        };
      } 
onSubmit() {
  this._detail.detailEnvoiP(this.form.value)
  .subscribe(
    (detail) => {
      this.detail = detail;
      console.log(this.detail);
      if(detail.message){
        this.presentAlert();
      }
    },
    err => {
      if ( err instanceof HttpErrorResponse ) {
        if (err.status === 401) {
          this._auth.logoutUser();                         }

      }
    }
  );
        }
        inSubmit() {
          this._detail.detailRetraitP(this.form.value)
          .subscribe(
            (detail)=> {
              this.detail = detail;
              console.log(this.detail);
              if(detail.message){
                this.presentAlert();
              }
            },
            err => {
              if ( err instanceof HttpErrorResponse ) {
                if (err.status === 401) {

                    this._auth.logoutUser();                         }

              }
            }
          );
                }

  ngOnInit() {
  }


async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Ops',
    subHeader: 'aucune transaction pour cette intervale!',
    buttons: ['OK']
  });

  await alert.present();
}
segmentChanged(ev: any) {
  console.log('Segment changed', ev);
}

butTran() {
  this.trans = false;
}
butCom() {
  this.trans = true;
}

goToView(detail: any){
  this._detail.selectedTrans = detail;
  this.router.navigateByUrl('/view');   
  }
}
