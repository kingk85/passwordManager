import { Component, OnInit } from '@angular/core';
import { LoginDataType } from '../../dataTypes/login';
import { LoginService }  from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-viewer',
  templateUrl: './password-viewer.component.html',
  styleUrls: ['./password-viewer.component.css']
})

export class PasswordViewerComponent implements OnInit {

authInfo: LoginDataType = new LoginDataType();

  constructor(private loginService: LoginService, private router: Router) 
  {

  }
  

  logOut()
  {
    this.loginService.logOutRequest()
    .subscribe(
      data => {
        var response = data.body;

        if (response == "Log out completed" || response == "Not logged, nothing to do.") {
        this.loginService.loggedUser.userIsLogged = false;
        this.router.navigateByUrl('view');
        }
      },
      error => 
      {
        console.log('Error: ' + error);
      }
    );
    
};


  receiveLogin($event)
  {
    console.log('Event received!');
    this.authInfo = $event;
  }

  ngOnInit() {
  }

}