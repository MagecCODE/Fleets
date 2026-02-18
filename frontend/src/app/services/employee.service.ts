import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);

  private jsonUrl = 'assets/data/db.json';

  getEmployees(): Observable<any[]> {
    return this.http
      .get<any>(this.jsonUrl)
      .pipe(map((response) => response.employees));
  }
}
