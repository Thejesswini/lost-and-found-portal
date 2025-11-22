import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  constructor() {}
  http = inject(HttpClient);

  register(name:string, email:string, password:string){
    return this.http.post(environment.apiUrl + "/auth/register", {
      name,
      email,
      password
    });
  }

  login(email:string, password:string){
    return this.http.post(environment.apiUrl + "/auth/login", {
      email,
      password
    });
  }

  checkEmailExists(email: string): Observable<boolean> {
  return this.http.get<boolean>(environment.apiUrl+"/auth/check-email?email="+email);
  }

  get isLoggedIn(){
    let userT = localStorage.getItem("token");
    if (userT){
      return true;
    }
    return false;
  }

  get userName(){
    let userData = localStorage.getItem("user");
    if (userData){
      return JSON.parse(userData).name;
    }
    return null;
  }
}
