import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private readonly API_URL = environment.baseUrl;

  getWelcomeMessage(): Observable<any> {
    return this.http.get(`${this.API_URL}/`);
  }
}
