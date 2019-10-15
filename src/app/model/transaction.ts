export interface Transaction {
  
    montantTransaction: string,
    dateEnvoi: Date,
    tarifs : {frais:number},
    beneficiaire :{prenomb:String,nomb: String},
    expediteur :{prenomE :string ,nomE: String},
    user:{nom:string,prenom:string},
    userRetrait:{nom:string,prenom:string},
}