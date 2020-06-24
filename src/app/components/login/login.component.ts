import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../../models/loginrequest.model';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../models/loginresponse.model';
import { Router } from '@angular/router';
import {IdeasComponent} from '../ideas/ideas.component';
import { IdeaSideNavComponent } from '../idea-side-nav/idea-side-nav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // tslint:disable-next-line:ban-types
  loginResponse$: LoginResponse;
  loginRequest$: LoginRequest;

  constructor(private authService: AuthService, private router: Router) {
    this.loginRequest$ = new LoginRequest();
  }
  /*
  ngOnInit() {
    return this.authService.login()
      .subscribe(data => this.loginResponse$ = data);
  }*/

  login(){
      return this.authService.login(this.loginRequest$)
      .subscribe(data => {
          this.loginResponse$ = data;
        },
        err => console.error(err),
        () =>  this.loginSuccessful());
  }

  loginSuccessful() {
    console.log('Login successful, redirecting....');
    localStorage.setItem('jwt', (this.loginResponse$.jwt));
    localStorage.setItem('refresh_token', (this.loginResponse$.refresh_token));
    localStorage.setItem('email', this.loginRequest$.username);
    this.router.navigate(['/', 'loggedin']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });
  }

  redirectToRegister(){
    this.router.navigate(['/', 'register']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });
  }
}
