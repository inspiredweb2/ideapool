import { Component } from '@angular/core';
import { IdeaSideNavComponent } from './components/idea-side-nav/idea-side-nav.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  users = [];

  constructor(){
  }
}


