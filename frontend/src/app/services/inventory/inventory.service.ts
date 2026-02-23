import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_FLEET } from 'src/app/config/config';
import { Inventory } from 'src/app/models/inventoty.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http = inject(HttpClient);

  private INVENTORY_SERVER_URL = API_FLEET.INVENTORY;

  // Fetch all Invenotry form database
  getInventary(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.INVENTORY_SERVER_URL);
  }

   // Fetch incidence by unitfleet
    getInventoryByUnitFleet(unitFleet: number): Observable<Inventory[]> {  
      return this.http.get<Inventory[]>(`${this.INVENTORY_SERVER_URL}/unit/${unitFleet}`);
    }

   // Add new item
   addInventoryItem(item: any): Observable<any> {
     return this.http.post<any>(this.INVENTORY_SERVER_URL, item);
   }

   // Delete item
   deleteInventoryItem(id: number): Observable<any> {
     return this.http.delete<any>(`${this.INVENTORY_SERVER_URL}/${id}`);
   }
  
}
