import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Partenaire } from '../model/partenaire';
@Injectable({
  providedIn: 'root'
})
export class SuperService {
  private url = "http://localhost:8000/api";


  constructor(private http: HttpClient) { }
  getListePar() {
    return this.http.get<Partenaire[]>(this.url + '/liste')
  }

  bloquer(id: number) {
    return this.http.post<any>(this.url + '/bloquer/' + id, '')
  }
  addPar(User) {

    const endpoint = 'http://localhost:8000/api/addP';
    const formData: FormData = new FormData();
    formData.append('imageName', User.imageName);
    formData.append('username', User.username);
    formData.append('password', User.password);
    formData.append('prenom', User.prenom);
    formData.append('nom', User.nom);
    formData.append('telephone', User.telephone);
    formData.append('libelle', User.libelle);
    formData.append('raisonSocial', User.raisonSocial);
    formData.append('adresse', User.adresse);
    formData.append('ninea', User.ninea);
    formData.append('Description', User.Description);
    formData.append('fix', User.fix);
    formData.append('mail', User.mail);
    return this.http
      .post(endpoint, formData);
  }
}
