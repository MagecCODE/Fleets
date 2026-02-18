import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidenciesService {
  private http = inject(HttpClient);

  private jsonUrl = 'assets/data/db.json';

  getIncidencies(): Observable<any[]> {
    return this.http
      .get<any>(this.jsonUrl)
      .pipe(map((response) => response.incidence));
  }
}
