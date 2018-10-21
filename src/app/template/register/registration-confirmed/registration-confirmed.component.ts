import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../services/data.service';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-registration-confirmed',
  templateUrl: './registration-confirmed.component.html',
  styleUrls: ['./registration-confirmed.component.css']
})
export class RegistrationConfirmedComponent implements OnInit {

  code:string;
  userHasBeenActivated:boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() 
  {
    this.code = this.route.snapshot.paramMap.get('cod');
    this.dataService.activateUser(this.code)
    .subscribe(
        (data) => {
          var dat = data
          console.log(dat);
          if (dat == "User activated") {
            alert("User activated");
            this.userHasBeenActivated = true;
          }
          else 
            alert(data);
        },
        error => {
          console.log(error);
        }
    );
  }

}
