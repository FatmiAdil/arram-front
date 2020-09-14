import { Licence } from './licence.model';

export class Photo  extends EntityBase {
  licenceId: number;
  description: string;
  url: string;
  licence: Licence;
}

export interface PhotoList {
  items: Photo[];
  pageSize: number;
  totalCount: number;
}

export interface PhotoSearchParams {
  id: string;
  indicatif: string;
  sortOrder: string;
  pageIndex: number;
  pageSize: number;
}
