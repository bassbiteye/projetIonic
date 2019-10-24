import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
//import { User } from '../';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable(
)
export class AuthService {
  private log = 'http://localhost:8000';

  private url = 'http://localhost:8000/api';
  private headers = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')) };
  // tslint:disable-next-line: new-parens
  jwt = new JwtHelperService;
  constructor(private http: HttpClient,
              // tslint:disable-next-line: variable-name
              private _router: Router) { }

  registerUser(User) {

    const urerUrl = 'http://localhost:8000/api/register';
    const formData: FormData = new FormData();
    formData.append('imageName', User.imageName);
    formData.append('username', User.username);
    formData.append('password', User.password);
    formData.append('prenom', User.prenom);
    formData.append('nom', User.nom);
    formData.append('telephone', User.telephone);
    formData.append('name', User.name);
    return this.http
      .post(urerUrl, formData).pipe(catchError(this.errorHandler));
  }
  getListeUser() {
    return this.http.get<any>(this.url + '/listeUpart').pipe(catchError(this.errorHandler))
  }
  getInfo() {
    return this.http.get<any>(this.url + '/info').pipe(catchError(this.errorHandler))
  }
  getCount(){
    return this.http.get<any>(this.url + '/countt').pipe(catchError(this.errorHandler))

  }
  getListeUserSYS() {
    return this.http.get<any>(this.url + '/listeSysteme').pipe(catchError(this.errorHandler))
  }
  bloquerU(id: number) {
    return this.http.put<any>(this.url + '/etat/' + id, '').pipe(catchError(this.errorHandler))

  }
  getListeProfile() {
    return this.http.get<any>(this.url + '/profile').pipe(catchError(this.errorHandler))
  }
  getListeCompte() {
    return this.http.get<any>(this.url + '/findallCompte').pipe(catchError(this.errorHandler))
  }
  loginUser(User) {
    return this.http.post<any>(this.url + '/login', User).pipe(catchError(this.errorHandler))
  }
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('expiration');
    localStorage.removeItem('imageName');
    localStorage.removeItem('message');
    this._router.navigate(['/login']);
  }
 
  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {

    return !!localStorage.getItem('token');
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  historique() {
    return this.http.get<any>(this.url + '/history');

  }
}
