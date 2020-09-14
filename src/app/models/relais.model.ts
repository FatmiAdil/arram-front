
export class Relais  extends EntityBase {
  region: string;
  site: string;
  nom: string;
  altitude: number;
  freqEntree: number;
  freqSortie: number;
  bande: number;
  strBande: string;
  shift: number;
  tone: string;
  puissance: number;
  qraLocator: string;
  longitude: number;
  latitude: number;
}

export interface RelaisList {
  items: Relais[];
  pageSize: number;
  totalCount: number;
}

export interface RelaisSearchParams {
  id: string;
  region: string;
  site: string;
  nom: string;
  bande: number;
  sortOrder: string;
  pageIndex: number;
  pageSize: number;
}
