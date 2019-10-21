import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { SuperService } from '../../../service/super.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-addpar',
  templateUrl: './addpar.page.html',
  styleUrls: ['./addpar.page.scss'],
})
export class AddparPage implements OnInit {
  // tslint:disable-next-line: variable-name
  constructor(private _superService: SuperService,
               // tslint:disable-next-line: variable-name
              private _auth: AuthService, private _router: Router) { }

  listePar = [];
   
  addparData = {imageName: File = null};
  imageUrl = '/assets/img/bass.jpg';
  errorMsg = '';

  next : any;

  ngOnInit() {}

  handleFileInput(file: FileList) {
    this.addparData.imageName = file.item(0);

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.addparData.imageName );
  }
  addPar() {
    this._superService.addPar(this.addparData)
    .subscribe(
      res => {
        if (res) {
          Swal.fire({
            html: '<h3>Le partenaire a été créé avec success<h3>',
            type: 'warning',
            showConfirmButton: false,
          });
          this._router.navigate(['/super']);

        }
      },
      err => {
        this.errorMsg = err.statusText;
        if ( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();                         }
          }

      }
    );
  }
  nextForm(){
    if(!this.next){
      this.next=true;
    }else{
      this.next=false;
    }
  }
}
