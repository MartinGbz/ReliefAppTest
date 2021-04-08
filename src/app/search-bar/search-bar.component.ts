import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Serv1Service} from '../services/serv1.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder: string;

  @Output() setUrlEvent: EventEmitter<any> = new EventEmitter();

  @Output() deselectItemsEvent: EventEmitter<any> = new EventEmitter();

  public searchContent;

  constructor(private serv: Serv1Service) {
    this.searchContent = null;
  }

  onSearch(): void{
    console.log('searchContent : ' + this.searchContent);
    // 1st and 2nd condition are maybe useless
    if (!( (this.searchContent == null) || (this.searchContent === '') || (this.serv.getEmbedURL(this.searchContent) == null))){
      // current video
      this.serv.searchUrl = this.searchContent;
      // add curent video in history
      this.serv.history.push(this.searchContent);
      // display array of history
      console.log('History list :');
      for (const entry of this.serv.history) {
        console.log(entry);
      }
      this.setLabel('');
    }
    else{
      this.serv.searchUrl = null;
      this.urlNotFound();
    }
    this.setUrlEvent.emit(null); // setUrl() (in Video)
    this.deselectItemsEvent.emit(null); // deselectItemAll() (in History)
  }

  // call by video
  /**
   * function called by video-view : rest Textbox & display URL error message
   */
  urlNotFound(): void{
    this.setLabel('URL Not found');
    this.resetInput();
  }

  /**
   * Set text property of the label
   * @param msg : message to display
   */
  setLabel(msg): void{
    document.getElementById('label').innerText = msg;
  }

  /**
   * Empty the textBox
   */
  resetInput(): void{
    console.log('resetInput()');
    this.searchContent = '';
  }

  ngOnInit(): void {
  }
}
