import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http = inject(HttpClient);

  private jsonUrl = 'assets/data/db.json';

  getInventary(): Observable<any[]> {
    return this.http
      .get<any>(this.jsonUrl)
      .pipe(map((response) => response.products));
  }
}
