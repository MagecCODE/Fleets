import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_FLEET } from 'src/app/config/config';
import {Employee} from'../../models/employee.model';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {

  private http = inject(HttpClient);

  EMPLOYE_SERVER_URL: string = API_FLEET.EMPLOYEE;

  // Fetch all employees from the backend
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.EMPLOYE_SERVER_URL);
  }

  // Fetch a single employee by ID
  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.EMPLOYE_SERVER_URL}/${id}`);
  }

  // Fetch an employee by DNI
  getEmployeeByDni(dni: string): Observable<any> {
    return this.http.get<any>(`${this.EMPLOYE_SERVER_URL}/dni/${dni}`);
  }

  // Fetch an employee by profession
  getEmployeesByProfession(profession: string): Observable<any[]> {
    return this.http
      .get<any>(`${this.EMPLOYE_SERVER_URL}/profession/${profession}`)
      .pipe(map((response) => response.employees));
  } 

  // Create a new employee
  createEmployee(employee: Employee): Observable<any> {
    return this.http.post<any>(this.EMPLOYE_SERVER_URL, employee);
  }

  // Update an existing employee
  updateEmployee(id: number, employee: Employee): Observable<any> {
    return this.http.put<any>(`${this.EMPLOYE_SERVER_URL}/${id}`, employee);
  }

  // Delete an employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.EMPLOYE_SERVER_URL}/${id}`);
  }

  // Login method

  login(dni: string, password: string) {
    return this.http.post<{ message: string, user: Employee }>(
      `${this.EMPLOYE_SERVER_URL}/login`, 
      {dni, password}
    ).pipe(
      map(response => response.user) // Extraemos solo el usuario de la respuesta
    );
  }
}
