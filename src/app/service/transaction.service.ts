import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Partenaire } from '../model/partenaire';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private url = "http://localhost:8000/api";

  constructor(private http: HttpClient) { }
  envoi(envoi) {
    return this.http.post<any>(this.url+'/envoi', envoi)
    //return this.http.post<any>(this._addPar, partenaire,this.headers)
  }
  retrait(retrait) {
    return this.http.post<any>(this.url+'/retrait', retrait)
  }
  findCompte(findCompte) {
    return this.http.post<any>(this.url+'/findCompte', findCompte)
  }
  verifier(code) {
    return this.http.post<any>(this.url+'/verif', code)
  }
  frais(frais) {
    return this.http.post<any>(this.url+'/frais', frais)
  }
  depot(compte) {
    return this.http.post<any>(this.url+'/depot', compte)
  }
  findPartenaire(partenaire) {
    return this.http.post<Partenaire[]>(this.url+'/findPar', partenaire)
  }
  addC(compte) {
    return this.http.post<any>(this.url+'/addCompte', compte)
  }
  detailEnvoi(_detail) {
    const formData: FormData = new FormData();
    formData.append('dateFrom', _detail.dateFrom);
    formData.append('dateTo', _detail.dateTo);

    return this.http.post<any>(this.url+'/detailEnvoi', formData)
  }
  detailEnvoiP(_detail) {
    const formData: FormData = new FormData();
    formData.append('dateFrom', _detail.dateFrom);
    formData.append('dateTo', _detail.dateTo);

    return this.http.post<any>(this.url+'/detailEnvoiP', formData)
  }
  detailRetrait(_detail) {
    const formData: FormData = new FormData();
    formData.append('dateFrom', _detail.dateFrom);
    formData.append('dateTo', _detail.dateTo);

    return this.http.post<any>(this.url+'/detailRetrait', formData)
  }
  detailRetraitP(_detail) {
    const formData: FormData = new FormData();
    formData.append('dateFrom', _detail.dateFrom);
    formData.append('dateTo', _detail.dateTo);

    return this.http.post<any>(this.url+'/detailRetraitP', formData)
  }


}
