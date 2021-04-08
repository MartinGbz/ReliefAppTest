import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Serv1Service} from '../services/serv1.service';

// import { EventEmitter } from '@angular/core';
// import * as events from 'events';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder: string;
  // @Output() myEvent = new events.EventEmitter(); // enable launch of another component function
  @Output() myEvent: EventEmitter<any> = new EventEmitter();

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
    this.myEvent.emit(null); // enable launch of another component function
  }

  getTextSearchBox(): void {
    return this.searchContent;
  }

  ngOnInit(): void {
  }
}
