import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { PasswordManagerCategories, PasswordManagerCategoriesEntry } from '../dataTypes/categories'
import { LoginDataType } from '../dataTypes/login';
import { Crypter } from '../crypter/crypter';



@Injectable()
export class DataService {

  public categoriesData: string;
  private crypt:Crypter = new Crypter();

  private categoriesUrl  = 'services/dataService.php?action=loadData';
  //private categoriesUrl  = 'services/dataService.json';
  private saveEntryUrl   = 'services/dataService.php';
  private deleteEntryUrl = 'services/dataService.php?action=removeEntry';

  public AllCategories: PasswordManagerCategories[];
  public loggedUser: LoginDataType = new LoginDataType();

  public entry: PasswordManagerCategoriesEntry =
    {
      id: 0,
      description: "",
      category: "",
      password: "",
      username: "",
      other: "",
      user_id: 0
    }

  constructor(private http: HttpClient)
  {
    ;
  }

  getCategoriesData(): Observable<HttpResponse<PasswordManagerCategories[]>> 
  {
      return this.http.get<PasswordManagerCategories[]>(this.categoriesUrl, { observe: 'response' }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  setEntry(theEntry) {
    this.entry = Object.assign({}, theEntry);
    this.entry.password = this.crypt.X_DeCrypt_String(this.entry.password, this.loggedUser.password, true);
    this.entry.other = this.crypt.X_DeCrypt_String(this.entry.other, this.loggedUser.password, true);
    this.entry.username = this.crypt.X_DeCrypt_String(this.entry.username, this.loggedUser.password, true);
  }

  setLogin(loginData) {
    this.loggedUser = loginData;
  }

  saveEntry(): Observable<String> {
    var args = Object.assign({}, this.entry);
    args['action'] = "saveEntry";
    args.password = this.crypt.X_Crypt_String(args.password, this.loggedUser.password, true);
    args.other = this.crypt.X_Crypt_String(args.other, this.loggedUser.password, true);
    args.username = this.crypt.X_Crypt_String(args.username, this.loggedUser.password, true);

    if (args['id'] == 0)
    {
        return this.http.post(this.saveEntryUrl, args, { responseType: 'text' }).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );
    }
    else 
    {
      return this.http.put(this.saveEntryUrl, args, { responseType: 'text' }).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }
  }

  deleteEntry(): Observable<String> {
    var deleteUrlWithArgs = this.deleteEntryUrl;
    deleteUrlWithArgs += "&idToRemove=" + this.entry.id;
    //return this.http.post<String>(this.deleteEntryUrl, args);

  if (this.entry.id != 0)
  {
    return this.http.delete(deleteUrlWithArgs, { responseType: 'text' }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  else
    {
      alert("Nothing to remove.");   
    } 
  }


  updateCategoriesData() {
    this.getCategoriesData()
      .subscribe(
        data => {
          this.AllCategories = data.body;
          const keys = data.headers.keys();
          console.log('keys: ', keys);
          const headers = keys.map(key => `${key}: ${data.headers.get(key)}`);
          console.log('headers: ', headers);
        },
        error => {
          console.log(error);
        }
      );
  }

  getCategories(): Observable<string> {
    return this.http.get<string>(this.categoriesUrl)
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
