import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { LoginDataType } from '../../../dataTypes/login';
import { LoginService }  from '../../../services/login.service';
import { DataService }   from '../../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authInfo: LoginDataType = new LoginDataType();

  @Output() logIn: EventEmitter<LoginDataType> = new EventEmitter();


  tryToLogIn(silent)
  {
    console.log('login try');
      this.loginService.logInRequest(this.authInfo.username, this.authInfo.password)
      .subscribe(
          data => {
            this.authInfo = data.body;
            
            //const keys = data.headers.keys();
            //console.log('keys: ', keys);
            //const headers = keys.map(key =>`${key}: ${data.headers.get(key)}`);
            //console.log('headers: ', headers);
            if (this.authInfo.userIsLogged == true)
            {
              this.logIn.emit(this.authInfo);
              this.loginService.setLogin(this.authInfo);
              this.dataService.setLogin(this.authInfo);
              this.dataService.updateCategoriesData();
            }
            else
            {
              if (silent == false)
                alert("Wrong username or password!");
            }
          },
          error => 
          {
            console.log(error);
          }
      );
  }

  constructor(private loginService: LoginService, private dataService: DataService) 
  {
    this.tryToLogIn(true);
  }

  ngOnInit() {
  }
}
