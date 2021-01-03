import { Component, OnInit } from '@angular/core';
import { PasswordManagerCategoriesEntry } from '../../../dataTypes/categories';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-password-fields',
  templateUrl: './password-fields.component.html',
  styleUrls: ['./password-fields.component.css']
})
export class PasswordFieldsComponent implements OnInit {

  highLightColor:string;
  suggestionString:string;

  clearEntry()
  {
    this.categoriesService.entry.id = 0;
    this.categoriesService.entry.category = "";
    this.categoriesService.entry.description = "";
    this.categoriesService.entry.id = 0;
    this.categoriesService.entry.other = "";
    this.categoriesService.entry.note = "";
    this.categoriesService.entry.password = "";
    this.categoriesService.entry.user_id = 0;
    this.categoriesService.entry.username = "";
  }

  removeEntry()
  {
    if (confirm("Are you sure you want to continue?"))
    {
      this.categoriesService.deleteEntry()
      .subscribe(
          (data) => {
            var dat = data
            console.log(dat);
            if (dat == "Data deleted") 
            {
              this.clearEntry();
              this.categoriesService.updateCategoriesData();
              alert("Data deleted!");
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


  saveEntry()
  {
    this.categoriesService.saveEntry()
    .subscribe(
        (data) => {
          var dat = data
          console.log(dat);
          if (dat == "Data saved") {
            alert("Data saved success!");
            this.clearEntry();
            this.categoriesService.updateCategoriesData();
          }
          else 
            alert(data);
        },
        error => {
          console.log(error);
        }
    );
  }


  updateSuggestionString(theNewString)
  {
    this.suggestionString = theNewString;
  }

  constructor(private categoriesService: DataService) {

    this.suggestionString = "";
    this.highLightColor = 'yellow';
   }

  ngOnInit() {
  }

}
