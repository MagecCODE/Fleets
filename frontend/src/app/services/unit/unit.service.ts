import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_FLEET } from 'src/app/config/config';
import { Unit } from 'src/app/models/unit.model';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private http = inject(HttpClient);
  
  UNIT_SERVER_URL : string =  API_FLEET.UNIT;

  // Fetch all units from the backend
  getUnits(): Observable<any[]> {
    return this.http
      .get<any>(this.UNIT_SERVER_URL)
      .pipe(map((response) => response.units));
  }

  // Fetch a single unit by fleet number
  getUnitByUnitFleet(unitfleet: number): Observable<any> {
    return this.http.get<Unit>(`${this.UNIT_SERVER_URL}/${unitfleet}`).pipe(
      map((response) => {
        console.log("[DEBUG - UNIT SERVICE] Backend: ",response);
        return response;
      })
    );
  }

  /*
  getUnitByEmployeeId(employeeId: number): Observable<any> {
    return this.http.get<any>(this.UNIT_SERVER_URL).pipe(
      map((response) => {
        const dota = response.dotas.find(
          (d: any) =>
            d.driveId === employeeId ||
            d.sanitId === employeeId ||
            d.facultId === employeeId
        );
        if (!dota) return null;
        return response.units.find((u: any) => u.unitfleet === dota.unitfleet);
      })
    );
  }
  */
}
