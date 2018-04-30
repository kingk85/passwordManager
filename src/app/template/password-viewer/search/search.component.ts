import { Component, OnInit } from '@angular/core';
import { PasswordManagerCategoriesEntry } from '../../../dataTypes/categories';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchString:string;
  suggestions:PasswordManagerCategoriesEntry[];
  visible:boolean;

  updateSearchResult()
  {
    ;
  }


  setVisible()
  {
    if (!this.visible) 
    {
      this.visible = true;
    }
  }

  setInvisible(suggested)
  {
    if (this.visible) 
    {
      this.visible = false;
    }

    this.categoriesService.setEntry(suggested);4
    this.searchString = "";
  }

  autoCompileUpdate()
  {
    if (this.searchString == null || this.searchString.length <= 0)
      return;

    if (this.categoriesService.AllCategories == null)
      return;

    if(this.searchString != null)
    {
        this.suggestions = [];

        for (var i = 0; i < this.categoriesService.AllCategories.length; i++)
        {
          //console.log(this.categoriesService.AllCategories[i].entries[0].description);
         // console.log(this.categoriesService.AllCategories[i].entries.length);

         // alert(this.categoriesService.AllCategories[i].entries.length);
          for (var x = 0; x < this.categoriesService.AllCategories[i].entries.length; x++)
          {
            if (this.categoriesService.AllCategories[i].entries[x].description.search(new RegExp(this.searchString, "i")) != -1) 
            {
              this.suggestions.push(this.categoriesService.AllCategories[i].entries[x]);
            }
          }
        }

        if (this.suggestions.length > 0)
        {
          this.setVisible()
        }
    }
  }

  constructor(private categoriesService: DataService) 
  { 
    this.visible = false;
  }

  ngOnInit() 
  {

  }

}
