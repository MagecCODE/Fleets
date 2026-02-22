import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_FLEET } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http = inject(HttpClient);

  private INVENTORY_SERVER_URL = API_FLEET.INVENTORY;

  getInventary(): Observable<any[]> {
    return this.http
      .get<any>(this.INVENTORY_SERVER_URL)
      .pipe(map((response) => response.products));
  }
}
