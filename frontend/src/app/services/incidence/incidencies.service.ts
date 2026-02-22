import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_FLEET } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class IncidenciesService {
  private http = inject(HttpClient);

  private INCIDEN_SERVER_URL = API_FLEET.INCIDENCE;

  getIncidencies(): Observable<any[]> {
    return this.http
      .get<any>(this.INCIDEN_SERVER_URL)
      .pipe(map((response) => response.incidencies));
  }
}
