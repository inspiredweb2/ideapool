import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IdeasService} from '../../services/ideas.service';
import {FormBuilder} from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import {Md5} from '../../helpers/md5';
import {Router} from '@angular/router';

@Component({
  selector: 'app-idea-side-nav',
  templateUrl: './idea-side-nav.component.html',
  styleUrls: ['./idea-side-nav.component.css']
})
export class IdeaSideNavComponent implements OnInit {
  email: string;
  constructor(private authService: AuthService, private router: Router) {
    this.email = localStorage.getItem('email');
    console.log('email value ' + this.email);
  }
  ngOnInit(): void {
  }

  logout(){
    return this.authService.logout()
      .subscribe(data => {
          console.log('Logging out');
        },
        err => console.error(err),
        () =>  this.cleanupSession());
  }

  cleanupSession(){
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    this.router.navigate(['/', 'login']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });
  }
  getHash() {
    if (localStorage.getItem('email') != null){
      return 'http://www.gravatar.com/avatar/' + Md5.hashStr(localStorage.getItem('email').trim().toLowerCase());
    }
    else {
      return 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y';
    }
  }

  getUsername(){
    return localStorage.getItem('email');
  }

  isLoggedIn(){
    return localStorage.getItem('jwt') != null;
  }
}
