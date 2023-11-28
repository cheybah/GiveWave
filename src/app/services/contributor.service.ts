// contributor.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContributorService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addContributor(contributorData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/contributors`, contributorData);
  }
}
