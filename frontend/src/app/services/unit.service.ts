import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private http = inject(HttpClient);

  private jsonUrl = 'assets/data/db.json';

  getUnits(): Observable<any[]> {
    return this.http
      .get<any>(this.jsonUrl)
      .pipe(map((response) => response.units));
  }

  getTypeUnit(fleetNumber: number): Observable<any> {
    return this.getUnits().pipe(
      map((units) => units.find((u) => u.unitfleet === fleetNumber))
    );
  }

  getUnitByEmployeeId(employeeId: number): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(
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
}
