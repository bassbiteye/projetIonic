import { NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginUserData = {}
  // tslint:disable-next-line: new-parens
  jwt = new JwtHelperService;
  message :  any;
  nom :  any;
  prenom :  any; findallCompte
  imageName : any;
  roles : any
  valuRole = false;
  loading : any;

  constructor(private _auth: AuthService,
              private _router: Router,
              private loadingCtl: LoadingController,
              private storage: Storage) { }

async presentLoading() {
  const loading = await this.loadingCtl.create({
    message: 'please wait',
    duration: 2000
  });
  await loading.present();

  await loading.onDidDismiss();

  console.log('Loading dismissed!');
}
  login (form) {

    this._auth.loginUser(form.value).subscribe((res) => {
           if (!res.code) {
             this.presentLoading();
             localStorage.setItem('token', res.token);
             const Decode = this.jwt.decodeToken(res.token);
             this.storage.set('roles', Decode.roles[0]);
             this.storage.set('expiration', Decode.exp);
             this.storage.set('imageName', Decode.imageName);
             this.imageName = res.imageName;
             this.roles = res.roles;
             this._router.navigateByUrl('acceuil');
        } else {
          this.presentLoading();
          localStorage.setItem('message', res.message);
          this.message = res.message;
        }

      },
      err => console.log('err' , err.message)
    );
  }

}
