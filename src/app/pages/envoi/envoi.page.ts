import { Component, OnInit} from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-envoi',
  templateUrl: './envoi.page.html',
  styleUrls: ['./envoi.page.scss'],
})
export class EnvoiPage implements OnInit {
  next: any;
  EnvoiData = {};
  tarif;
  last: boolean;
  trans: any;
  info: any;
  code: any;
  valide= {};
 // @ViewChild("rows")rows:ElementRef;

    // tslint:disable-next-line: variable-name
    constructor(private _trans: TransactionService,
                private _authService: AuthService,
                private _router: Router,
                public alertController: AlertController) { }

    ngOnInit() {
      this._authService.getInfo().subscribe(
        res => {
          this.info = res 
          console.log(this.info);
        },
        err => {
         if ( err instanceof HttpErrorResponse ) {
           if (err.status === 401) {
             this._authService.logoutUser();
                }
         }
       }
     )
    }

  envoi() {
    this._trans.envoi(this.EnvoiData)
    .subscribe(
      res => {
        console.log(res);
    
      },
      err => {
        if ( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._authService.logoutUser();        }
        }
      }
    )

  }

  frais() {
    this._trans.frais(this.EnvoiData)
    .subscribe(

   res => {this.tarif = res;
           console.log(this.tarif);
  },
      err => {
        if ( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._authService.logoutUser();        }
        }
      }
    );
  }
  //retrait


     verifier() {
       this._trans.verifier(this.valide)
       .subscribe(
      res => {
         this.code = res;
        
         if (res.status === 200){
          this.presentAlert(res.message);
     }
     },
      err => {
        if (err.message) {
          console.log(err);
          this.presentAlert(err.error.message);
     }
        if ( err instanceof HttpErrorResponse ) {
             if (err.status === 401) {
               this._authService.logoutUser();             }
           }
          }
       )
    }

     retrait(){
       this._trans.retrait(this.valide)
       .subscribe(
         res => {
           if (res.message){
            this.presentAlert(res.message)
       }
       },
         err => {
          if (err.message) {
            console.log(err);
            this.presentAlert(err.error.message);
       }
          if ( err instanceof HttpErrorResponse ) {
             if (err.status === 401) {
               this._authService.logoutUser();             }
           }
         }
       )
     }
 



  nextForm() {
    if (!this.next) {
      this.next = true;
    } else {
      this.next = false;
      if (!this.last) {
        this.last = true;
      } else {
        this.last = false;
      }
    }
    }
    butEnvoie() {
        this.trans = false;
      }
      butRetrait() {
        this.trans = true;
      }

      async presentAlert(message) {
        const alert = await this.alertController.create({
          header: 'Ops',
          subHeader: message,
          buttons: ['OK']
        });
      
        await alert.present();
      }
}
