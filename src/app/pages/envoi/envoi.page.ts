import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';

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
    // tslint:disable-next-line: variable-name
    constructor(private _trans: TransactionService,
                private _authService: AuthService,
                private _router: Router) { }

    ngOnInit() {
    }

  envoi() {

    this._trans.envoi(this.EnvoiData)
    .subscribe(
      res => {

          if (res.message) {
            Swal.fire({
              type: 'success',
                title: res.message,
                showConfirmButton: true,

            });
        }
          console.log(res);


          this._router.navigate(['/accueil']);
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
}
