export class User {
    constructor(
  public id :Number,    
  public nom: string,
  public prenom: string,
  public telphone:Number,
 public  Compte :{numCompte:Number,solde: Number},
  public username : string,
  public password :string,
  public  libelle:string,
  public  roles:string,
    public  imageName :string,
    ){}
}
