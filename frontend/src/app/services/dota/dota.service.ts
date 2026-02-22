import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_FLEET } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class DotaService {  

  private http = inject(HttpClient);

  DOTA_SERVER_URL: string = API_FLEET.DOTA;

  // Fetch all dotas from the backend
  getDotas() {
    return this.http.get<any>(this.DOTA_SERVER_URL);
  }

  // Fetch a single dota by Employee ID
  getDotaByEmpID(id: number) {
    return this.http.get<any>(`${this.DOTA_SERVER_URL}/emp/${id}`);
  }

  // Fetch a dota by Unit Fleet number
  getDotaByUnitFleet(unitFleet: number) {  
    return this.http.get<any>(`${this.DOTA_SERVER_URL}/unit/${unitFleet}`);
  }
}

