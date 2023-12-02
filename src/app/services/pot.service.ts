import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pot } from '../models/Pot';

@Injectable({
  providedIn: 'root'
})
export class PotService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  getPots(): Observable<Pot[]> {
    const apiUrl = `${this.baseUrl}/pots`;
    return this.http.get<Pot[]>(apiUrl);
  }
  getPotById(id: number): Observable<Pot> {
    const apiUrl = `${this.baseUrl}/pots/${id}`;
    return this.http.get<Pot>(apiUrl);
  }
  getUserPots(owner: number): Observable<Pot[]> {
    const apiUrl = `${this.baseUrl}/pots?owner=${owner}`;
    return this.http.get<Pot[]>(apiUrl);
  }
  createPot(pot: any): Observable<any> {
    const apiUrl = `${this.baseUrl}/pots`;
    return this.http.post<any>(apiUrl, pot);
  }
  updatePot(pot: Pot): Observable<Pot> {
    const url = `${this.baseUrl}/pots/${pot.id}`;
    return this.http.put<Pot>(url, pot);
  }
  deletePot(potId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/pots/${potId}`);
  }


}
