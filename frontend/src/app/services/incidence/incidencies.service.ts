import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_FLEET } from 'src/app/config/config';
import { Incidence } from 'src/app/models/incidence.model';

@Injectable({
  providedIn: 'root',
})
export class IncidenciesService {
  private http = inject(HttpClient);

  private INCIDEN_SERVER_URL = API_FLEET.INCIDENCE;

  // Create new incidence
  createIncidence(incidenceData: Partial<Incidence>): Observable<any> {
    return this.http.post(this.INCIDEN_SERVER_URL, incidenceData);  
  }

  // Fecth all incidence from database
  getIncidencies(): Observable<any[]> {
    return this.http.get<any[]>(this.INCIDEN_SERVER_URL);
  }

  deleteIncidence(id: number): Observable<any> {
    return this.http.delete(`${this.INCIDEN_SERVER_URL}/${id}`);
  }

  updateIncidence(id: number, incidenceData: Partial<Incidence>): Observable<any> {
    return this.http.put(`${this.INCIDEN_SERVER_URL}/${id}`, incidenceData);
  }

  // Fetch incidence by unitfleet
  getIncdicenceByUnitFleet(unitFleet: number): Observable<Incidence[]> {  
    return this.http.get<Incidence[]>(`${this.INCIDEN_SERVER_URL}/unitfleet/${unitFleet}`);
  }




}
