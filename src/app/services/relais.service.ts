import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { RelaisSearchParams, RelaisList, Relais } from 'src/app/models/relais.model';

@Injectable({
  providedIn: 'root'
})

export class RelaisService {
  private url = environment.apiUrl + 'relais/';

  constructor(private http: HttpClient) { }

  search(searchParams: RelaisSearchParams): Observable<RelaisList> {
    const params = new HttpParams()
    .set('id', searchParams.id ? searchParams.id : '')
    .set('region', searchParams.region ? searchParams.region : '')
    .set('bande', searchParams.bande ? searchParams.bande.toString() : '')
    .set('SortOrder', searchParams.sortOrder ? searchParams.sortOrder : '')
    .set('PageIndex', searchParams.pageIndex.toString())
    .set('PageSize', searchParams.pageSize.toString());

    return this.http
           .get<RelaisList>(this.url + 'search', {params})
        .pipe(
          retry(0),
          catchError(this.handleError)
     );
  }

  create(entite: Relais): Observable<Relais> {
    return this.http
    .post<Relais>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  update(entite: Relais): Observable<Relais> {
    return this.http
    .put<Relais>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  liste(): Observable<Relais[]> {
    return this.http.get<Relais[]>(this.url);
  }

  get(id: string): Observable<Relais> {
    return this.http
      .get<Relais>(this.url + id)
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
