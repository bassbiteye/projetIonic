export interface Transaction {

    montantTransaction: string;
    dateEnvoi: Date;
    comEtat :number;
    comEnvoie :number;
    comRetrait :number;
    dateRetrait :Date;
    dateEnvoie : Date;
    tarifs: {frais: number};
    message : string;
    // tslint:disable-next-line: ban-types
    beneficiaire: {prenomb: String, nomb: String};
    // tslint:disable-next-line: ban-types
    expediteur: {prenomE: string , nomE: String};
    user: {nom: string, prenom: string};
    userRetrait: {nom: string, prenom: string};
}
