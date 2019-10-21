import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerUserData = {  imageName: File = null};

  imageUrl = '/assets/img/bass.jpg';
  listeProfile;
  message: any ;
  role: any = localStorage.getItem('roles');
  // tslint:disable-next-line: variable-name
  constructor( private _auth: AuthService,
               private _router: Router,
               private loadingCtl: LoadingController) { }
              ngOnInit() {
                this._auth.getListeProfile()
                .subscribe(
                  res => {
                    this.listeProfile = res;
                    if (this.role == 'ROLE_SUPER') {
                    this.listeProfile =  [this.listeProfile[0], this.listeProfile[3]];
                  } else  if (this.role == 'ROLE_ADMIN') {
                    this.listeProfile = [this.listeProfile[1], this.listeProfile[2]]  ;
                  }


                    console.log(this.listeProfile);
                  }
                ,

                  err => {
                    if ( err instanceof HttpErrorResponse ) {
                      if (err.status === 401) {
                        this._auth.logoutUser();                         }
                    }
                  }
                );
              }
  handleFileInput(file: FileList) {
    this.registerUserData.imageName = file.item(0);

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.registerUserData.imageName );
  }
  register() {

    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        this.presentLoading();
        if (res) {
            Swal.fire({
              type: 'success',
               title: 'l\'utilisateur a été ajouté avec succes',
              showConfirmButton: false,

            });
        }

        this._router.navigate(['/accueil']);
      },
      err => {
        if ( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();                         }
        }
      }
    );

  }

  async presentLoading() {
    const loading = await this.loadingCtl.create({
      message: 'please wait',
      duration: 2000
    });
    await loading.present();
  
    await loading.onDidDismiss();
  
    console.log('Loading dismissed!');
  }
}
