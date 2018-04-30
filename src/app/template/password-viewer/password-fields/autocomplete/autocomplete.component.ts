import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnChanges, OnInit {

  @Input('suggestedStart') theSuggestion: string;
  visible:boolean;
  disableSuggestion:boolean;
  suggestions:string[];

  constructor(private categoriesService: DataService) 
  {
    this.visible = true;
    this.disableSuggestion = false;
  }

  ngOnChanges(changes: SimpleChanges) 
  {
    this.autoCompileUpdate();
    console.log(changes);
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

    this.disableSuggestion = true;
    
    if (this.visible) 
    {
      this.visible = false;
    }

    this.categoriesService.entry.category = suggested;
  }


  toggleVisibility()
  {
    if (this.visible) 
    {
      this.visible = false;
    }
    else 
    {
      this.visible = true;
    }
  }

  autoCompileUpdate()
  {

    if (this.theSuggestion == null || this.theSuggestion.length <= 0)
      return;


    if (this.categoriesService.AllCategories == null)
      return;

    if(this.theSuggestion != null)
    {
        this.suggestions = [];
        for (var i = 0; i < this.categoriesService.AllCategories.length; i++)
        {
          if (this.categoriesService.AllCategories[i].name.search(new RegExp(this.theSuggestion, "i")) == 0) 
          {
            this.suggestions.push(this.categoriesService.AllCategories[i].name);
          }
        }

        if (this.categoriesService.AllCategories.length > 0)
        {
          this.setVisible()
        }
    }
  }


  ngOnInit()
  {

  }

}
