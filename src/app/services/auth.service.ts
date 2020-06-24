import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../models/loginrequest.model';
import { LoginResponse } from '../models/loginresponse.model';
import { SignupRequest } from '../models/signuprequest.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiUrl = 'https://small-project-api.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  login(loginRequest: LoginRequest) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + '/access-tokens',
      { email: loginRequest.username, password: loginRequest.password });
  }

  signup(signupRequest: SignupRequest){
    return this.httpClient.post<LoginResponse>(this.apiUrl + '/users',
      { email: signupRequest.email, name: signupRequest.name, password: signupRequest.password });
  }

  logout(){
    return this.httpClient.delete( this.apiUrl + '/access-tokens', httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'X-Access-Token': localStorage.getItem('jwt')
  }),
  body: { refresh_token: localStorage.getItem('refresh_token')}
};

