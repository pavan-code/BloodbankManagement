import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };
  isLoggedIn() {
    const token = localStorage.getItem('token')
    if(token)
      return true;
    else
      return false;
  }
  isAdmin() {
    let details = JSON.parse(localStorage.getItem('donor') || '{}');
    if(details.roles == "ROLE_ADMIN")
      return true;
    else
      return false;
  }
  connect(data: any) {
    return this.http.post('http://localhost:8080/login', data);
  }

  register(details: any) {
    console.log(details);
    return this.http.post('http://localhost:8080/register', details);
  }

  findByBlood(group: String) {
    return this.http.get(
      `http://localhost:8080/findBlood/${group}`,
      this.httpOptions
    );
  }

  findBloodCount() {
    return this.http.get(`http://localhost:8080/bloodCount`, this.httpOptions);
  }

  getAllDonors() {
    return this.http.get(`http://localhost:8080/donor`, this.httpOptions);
  }

  requestBlood(data: any) {
    return this.http.post(`http://localhost:8080/requestBlood`, data, this.httpOptions)
  }

  getRequests() {
    return this.http.get(`http://localhost:8080/getRequests`, this.httpOptions)
  }
}
