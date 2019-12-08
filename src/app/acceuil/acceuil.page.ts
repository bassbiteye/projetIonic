import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})

export class AcceuilPage implements OnInit {
  info: any;
  public show = false;
  valeur: any;
  constructor(private menu: MenuController,
              // tslint:disable-next-line: variable-name
              private _router: Router,
              // tslint:disable-next-line: variable-name
              private _auth: AuthService) { }
  ngOnInit() {

    this._auth.getInfo().subscribe(
      res => {
        this.info = res;
        console.log(this.info);
      },
        err => {
          if ( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        }
    );
  }
  toggleSolde() {
    if (this.valeur) {
      this.valeur = false;
    } else {
      this.valeur = true;
    }
  }
}
