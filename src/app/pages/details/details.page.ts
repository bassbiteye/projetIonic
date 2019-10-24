import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { TransactionService } from '../../service/transaction.service';
import { AuthService } from '../../service/auth.service';
import {Transaction} from '../../model/transaction';
import { __values } from 'tslib';
import { AlertController, NavController } from '@ionic/angular';
//import {ViewPage} from '../view/ViewPage';
import { from } from 'rxjs';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
 

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
               ) {
      }

      form = new FormGroup({
        dateFrom : new FormControl(this.today, Validators.required),
        dateTo : new FormControl(this.today, Validators.required)
      })
      dateLessThan(from: string, to: string) {
        return (group: FormGroup): {[key: string]: any} => {
          const f = group.controls[from];
          const t = group.controls[to];
          const now = new Date();
          if (f.value > t.value) {
            return {
              dates: 'Date de debut doit etre plus petit que Date de fin'
            };
          }
          if (t.value > now) {
            return {
              dates: 'Date de fin doit etre plus grand  qu aujourd hui'
            };
          }
          return {};
        };
      }
onSubmit() {
  this._detail.detailEnvoi(this.form.value)
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
          this._detail.detailRetrait(this.form.value)
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
