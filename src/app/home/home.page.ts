import { NavController, LoadingController, AlertController } from '@ionic/angular';
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
              private storage: Storage,
              public alertController: AlertController) { }

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
             localStorage.setItem('token', res.token);
             const Decode = this.jwt.decodeToken(res.token);
             localStorage.setItem('roles', Decode.roles[0]);
             this.storage.set('expiration', Decode.exp);
             this.roles = Decode.roles[0];
             if (this.roles === 'ROLE_SUPER'|| this.roles === 'ROLE_CAISSIER') {
               this.presentAlert();
             } else {
              this.presentLoading();
              this._router.navigateByUrl('acceuil');
             }

        } else {
          this.presentLoading();
          localStorage.setItem('message', res.message);
          this.message = res.message;
        }

      },
      err => console.log('err' , err.message)
    );
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Ops',
      subHeader: 'vous n’êtes pas autorisé à accéder à cette application',
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
