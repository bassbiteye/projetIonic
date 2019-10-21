import { NavController,LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  prenom :  any;findallCompte
  imageName : any;
  roles :any
  valuRole= false;
  loading : any;

  constructor(private _auth:AuthService,
              private _router: Router,
              private loadingCtl: LoadingController) { }

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
           if(!res.code){
             this.presentLoading();
             localStorage.setItem('token', res.token);
             const Decode=this.jwt.decodeToken(res.token);
             localStorage.setItem('username', Decode.username);
             localStorage.setItem('roles', Decode.roles[0]);
             localStorage.setItem('nom', Decode.nom);
             localStorage.setItem('prenom', Decode.prenom);
             localStorage.setItem('expiration', Decode.exp);
             localStorage.setItem('imageName', Decode.imageName);
             this.prenom= res.prenom;
             this.imageName= res.imageName;
             this.nom= res.nom;
             this.roles= res.roles;
             this.authenticate();
             this._router.navigateByUrl('acceuil');
        }else{
          this.presentLoading();
          localStorage.setItem('message',res.message);
          this.message = res.message;
        }

      },
      err => console.log('err' ,err.message)
    )
  }
  isAuthenticate(){
    console.log('ceci est un test', this.roles)

    return !this.roles && (this.roles=="ROLE_SUPER"||this.roles=="ROLE_ADMIN"||this.roles=="ROLE_USERS"||this.roles=="ROLE_CAISSIER")
  }

  authenticate() {
    if(this.roles){
      this.valuRole = true;
    }
    else{
      this.valuRole = false;
    }
    return this.valuRole;
  }
}
