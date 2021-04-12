import {Component, OnInit} from '@angular/core';
import {Serv1Service} from './services/serv1.service';
import {HistoryService} from './services/history.service';
import {BookmarkService} from './services/bookmark.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isHiddenLabel = true;
  constructor(public serv1Service: Serv1Service, private historyService: HistoryService, private bookmarkService: BookmarkService) {
  }

  async ngOnInit(): Promise<void> {
    // *** LOCAL ***
    // // get history (from localStorage)
    // if (localStorage.getItem('history') !== null) {
    //   console.log('history =' + serv1Service.history);
    //   serv1Service.history = JSON.parse(localStorage.getItem('history'));
    // }

    // *** SERVER ***
    this.historyService.updateHistory();


    // *** LOCAL ***
    // // get bookmarks (from localStorage)
    // if (localStorage.getItem('bookmarks') !== null) {
    //   console.log('bookmarks =' + serv1Service.bookmarks);
    //   serv1Service.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // }

    // *** SERVER ***
    await this.bookmarkService.updateBookmarks(); // I can't wait to get the bookmarks, I don't know why

    this.displayLabel();
  }

  /**
   * Display the number of bookmarks popup for 2500ms
   */
  displayLabel(): void{
    this.isHiddenLabel = false;
    setTimeout(
      () => {
        this.isHiddenLabel = true;
      }, 2500
    );
  }
}
