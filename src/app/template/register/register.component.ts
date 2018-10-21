import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { checkPasswords } from '../../validators/validator'
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  formHasBeenSubmitted:boolean;

  constructor(private fb: FormBuilder, private dataService: DataService)
  {
    this.formHasBeenSubmitted = false;
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.fb.group(
      {
      username: ['', Validators.required ],
      passwords: this.fb.group(
      {
        password: ['', [Validators.required]],
        passwordRepeat: ['', [Validators.required]]
      },
      {validator: checkPasswords}),
      email: ['', [Validators.email, Validators.required] ],
    });
  }

  onSubmit()
  {
    if (this.registrationForm.status == "VALID")
    {
      this.dataService.createUser(this.registrationForm.value)
      .subscribe(
          (data) => {
            var dat = data
            console.log(dat);
            if (dat == "Data saved") {
              alert("Data saved success!");
              this.formHasBeenSubmitted = true;
            }
            else 
              alert(data);
          },
          error => {
            console.log(error);
          }
      );
    }
    else
    {
      alert("Complile all the data, use only valid e-mails.");
    }
  }

  ngOnInit() {
  }

}
