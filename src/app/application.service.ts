import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private http: HttpClient) {}

  getCountryList() {
    return this.http.get<any>('assets/data/countries.json');
  }

  getNationalityList() {
    return this.http.get<any>('assets/data/nationality.json');
  }

  getReport(searchParams: any) {
    return this.http.get<any>('assets/data/sample-report.json');
  }
}
