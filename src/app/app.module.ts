import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component'
import { FootherComponent } from './template/foother/foother.component';
import { CategoriesComponent } from './template/password-viewer/categories/categories.component';
import { PasswordFieldsComponent } from './template/password-viewer/password-fields/password-fields.component'
import { DataService } from './services/data.service';
import { LoginService } from './services/login.service';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LoginComponent } from './template/password-viewer/login/login.component';
import { AutocompleteComponent } from './template/password-viewer/password-fields/autocomplete/autocomplete.component';
import { HighlightDirective } from './template/password-viewer/password-fields/highlight.directive';
import { SearchComponent } from './template/password-viewer/search/search.component';

import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './template/page-not-found/page-not-found.component';
import { SettingsComponent } from './template/settings/settings.component';
import { PasswordViewerComponent } from './template/password-viewer/password-viewer.component';
import { RegisterComponent } from './template/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationConfirmedComponent } from './template/register/registration-confirmed/registration-confirmed.component';


const appRoutes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'view', component: PasswordViewerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activateAccount/:cod', component: RegistrationConfirmedComponent },
  { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FootherComponent,
    CategoriesComponent,
    PasswordFieldsComponent,
    LoginComponent,
    AutocompleteComponent,
    HighlightDirective,
    SearchComponent,
    PageNotFoundComponent,
    SettingsComponent,
    PasswordViewerComponent,
    RegisterComponent,
    RegistrationConfirmedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    ReactiveFormsModule
  ],
  providers: [DataService,
  LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
