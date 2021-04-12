import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Serv1Service} from '../services/serv1.service';
import {HistoryService} from '../services/history.service';
import {HistoryModel} from '../models/history.model';

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

  isHiddenLabel = 'hidden';

  constructor(private serv1Service: Serv1Service, private historyService: HistoryService) {
    this.searchContent = null;
  }

  async onSearch(): Promise<void> {
    console.log('searchContent : ' + this.searchContent);
    // 1st and 2nd conditions are maybe useless
    if (!((this.searchContent == null) || (this.searchContent === '') || (this.serv1Service.getEmbedURL(this.searchContent) == null))) {
      // current video
      this.serv1Service.searchUrl = this.searchContent;
      // update currentVideoUrl
      // save lastUrl
      this.serv1Service.currentVideoUrl = this.searchContent;

      // *** LOCAL ***
      // add current video to history
      // this.serv.history.push(this.searchContent);
      // // update history local storage
      // localStorage.setItem('history', JSON.stringify(this.serv.history));
      // // display array of history
      // console.log('History list :');
      // for (const entry of this.serv.history) {
      //   console.log(entry);
      // }

      // *** SERVER ***
      // post on server
      const url = new HistoryModel();
      url.url = this.searchContent;
      await this.historyService.addHistory(url); // await : we need to be sure that data has been send successfully
      // get history from serv
      this.historyService.updateHistory();

      // save lastId
      await this.historyService.getLastHistory();
      console.log('this.serv1Service.currentVideoId :');
      console.log(this.serv1Service.currentVideoId);
    }

    else {
      this.serv1Service.searchUrl = null;
      this.urlNotFound();
    }

    this.setUrlEvent.emit(null); // setUrl() (in video-view)
    this.deselectItemsEvent.emit(null); // deselectItemAll() (in history)
  }

  /**
   * function called by video-view : reset Textbox & display URL error message
   */
  urlNotFound(): void{
    this.isHiddenLabel = 'visible';
    setTimeout(
      () => {
        this.isHiddenLabel = 'hidden';
      }, 3000
    );
  }

  ngOnInit(): void {
  }
}
