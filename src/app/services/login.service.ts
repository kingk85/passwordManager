import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { of } from 'rxjs/observable/of';
import { LoginDataType } from '../dataTypes/login';
import { DataService } from './data.service';

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Injectable()
export class LoginService {

  private loginUrl = 'services/login.php';
  /*
  "services/login.json",
  "services/dataService.json"
  */
  //private loginUrl = 'services/login.json';

  private changePasswordUrl = 'services/dataService.php';
  public loggedUser:LoginDataType = new LoginDataType();
  constructor(private http: HttpClient) { }

  setLogin(loginData)
  {
    this.loggedUser = loginData;
  }

  logInRequest(username, password): Observable<HttpResponse<LoginDataType>>
  {
    var args = { username: username, password: password};
    return this.http.post<LoginDataType>(this.loginUrl, args, {observe: 'response'}).pipe(
    //return this.http.get<LoginDataType>(this.loginUrl, {observe: 'response'}).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  changePasswordRequest(oldPassword, newPassword, updatedEntries): Observable<HttpResponse<LoginDataType>>
  {
    var args = {oldPassword: oldPassword, newPassword: newPassword, action: "changePassword", updatedEntries: updatedEntries};
    return this.http.put<LoginDataType>(this.changePasswordUrl, args, {observe: 'response'}).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  backupImportRequest(password, backupEntries): Observable<HttpResponse<LoginDataType>>
  {
    var args = {password: password, action: "importBackup", backupEntries: backupEntries};
    return this.http.put<LoginDataType>(this.changePasswordUrl, args, {observe: 'response'}).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  logOutRequest(): Observable<HttpResponse<String>>
  {
    return this.http.get(this.loginUrl + '?logout=true', {responseType: 'text', observe: 'response'}).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
