import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { LicenceSearchParams, LicenceList, Licence } from 'src/app/models/licence.model';


@Injectable({
  providedIn: 'root'
})

export class LicenceService {
  private url = environment.apiUrl + 'licence/';

  constructor(private http: HttpClient) { }

  search(searchParams: LicenceSearchParams): Observable<LicenceList> {
    const params = new HttpParams()
    .set('id', searchParams.id ? searchParams.id : '')
    .set('nom', searchParams.nom ? searchParams.nom : '')
    .set('prenom', searchParams.prenom ? searchParams.prenom : '')
    .set('indicatif', searchParams.indicatif ? searchParams.indicatif : '')
    .set('ville', searchParams.ville ? searchParams.ville : '')
    .set('SortOrder', searchParams.sortOrder ? searchParams.sortOrder : '')
    .set('PageIndex', searchParams.pageIndex.toString())
    .set('PageSize', searchParams.pageSize.toString());

    return this.http
           .get<LicenceList>(this.url + 'search', {params})
        .pipe(
          retry(0),
          catchError(this.handleError)
     );
  }

  create(entite: Licence): Observable<Licence> {
    return this.http
    .post<Licence>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  update(entite: Licence): Observable<Licence> {
    return this.http
    .put<Licence>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  liste(): Observable<Licence[]> {
    return this.http.get<Licence[]>(this.url);
  }

  get(id: string): Observable<Licence> {
    return this.http
      .get<Licence>(this.url + id)
      .pipe(
        retry(3),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log('error http', error);
    return throwError(error);
  }
}
