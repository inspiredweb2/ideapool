import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../models/loginresponse.model';
import {Router} from '@angular/router';
import {SignupRequest} from '../../models/signuprequest.model';


@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  loginResponse$: LoginResponse;
  signupRequest$: SignupRequest;
  constructor(private authService: AuthService, private router: Router) {
    this.signupRequest$ = new SignupRequest();
  }

  signup(){
    return this.authService.signup(this.signupRequest$)
      .subscribe(data => {
          this.loginResponse$ = data;
        },
        err => console.error(err),
        () =>  this.loginSuccessful());
  }

  loginSuccessful() {
    console.log('Signup successful, redirecting....');
    localStorage.setItem('jwt', (this.loginResponse$.jwt));
    localStorage.setItem('refresh_token', (this.loginResponse$.refresh_token));
    this.router.navigate(['/', 'loggedin']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });
  }
  /*
  ngOnInit(): void {
  }
*/
}
