import { Component, OnInit } from '@angular/core';
import { PasswordManagerCategories, PasswordManagerCategoriesEntry } from '../../../dataTypes/categories'
import { DataService } from '../../../services/data.service';
import { LoginDataType } from '../../../dataTypes/login'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  varia: any;
  AllCategories: PasswordManagerCategories[];

  constructor(private dataService: DataService) {
  this.varia = "test";
  console.log("Varia: " + this.varia);
   }

  ngOnInit() {
  }


  getCategories(): void {
        var theObj: any;
        this.dataService.getCategories()
        .subscribe((res) => {console.log('res: ',res); this.varia = res; console.log('this.varia: ',this.varia); this.AllCategories = JSON.parse(JSON.stringify(res)).PasswordManagerCategories; });
  }

}
