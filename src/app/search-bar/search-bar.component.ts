import { Component, OnInit, Input } from '@angular/core';
import {Serv1Service} from '../services/serv1.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder: string;
  public searchContent;

  constructor(private serv: Serv1Service) {
    this.searchContent = null;
  }

  onSearch(): void{
    console.log('searchContent : ' + this.searchContent);
    if (!( (this.searchContent == null) || (this.searchContent === ''))){
      // current video
      this.serv.servSearchValue = this.searchContent;
      // add curent video in history
      this.serv.history.push(this.searchContent);
      // display array of history
      console.log('History list :');
      for (const entry of this.serv.history) {
        console.log(entry);
      }
    }
  }

  getTextSearchBox(): void {
    return this.searchContent;
  }

  ngOnInit(): void {
  }
}
