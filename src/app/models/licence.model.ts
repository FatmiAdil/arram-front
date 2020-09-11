
export class Licence  extends EntityBase {
  nom: string;
  prenom: string;
  nomComplet: string;
  ville: string;
  indicatif: string;
  adresse1: string;
  adresse2: string;
  codePostal: string;
  email: string;
  webSite: string;
  qraLocator: string;
  anneeLicence: number;
}

export interface LicenceList {
  items: Licence[];
  pageSize: number;
  totalCount: number;
}


export interface LicenceSearchParams {
  id: string;
  nom: string;
  prenom: string;
  nomComplet: string;
  ville: string;
  indicatif: string;
  sortOrder: string;
  pageIndex: number;
  pageSize: number;
}
