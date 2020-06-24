import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { IdeasComponent } from './components/ideas/ideas.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IdeaSideNavComponent } from './components/idea-side-nav/idea-side-nav.component';
import { GravatarDirective } from './directives/gravatar.directive';
import {MatCardModule} from '@angular/material/card';

export const isMock = environment.mock;

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule ],
  declarations: [AppComponent, HelloComponent, LoginComponent, SignupComponent, IdeasComponent, IdeaSideNavComponent, GravatarDirective],
  providers: [ AuthService ],
  bootstrap:    [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }


