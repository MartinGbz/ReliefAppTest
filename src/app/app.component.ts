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

  constructor(private serv1Service: Serv1Service, private historyService: HistoryService, private bookmarkService: BookmarkService) {
    // *** LOCAL ***
    // // get history (from localStorage)
    // if (localStorage.getItem('history') !== null) {
    //   console.log('history =' + serv1Service.history);
    //   serv1Service.history = JSON.parse(localStorage.getItem('history'));
    // }

    // *** SERVER ***
    historyService.updateHistory();


    // *** LOCAL ***
    // // get bookmarks (from localStorage)
    // if (localStorage.getItem('bookmarks') !== null) {
    //   console.log('bookmarks =' + serv1Service.bookmarks);
    //   serv1Service.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // }

    // *** SERVER ***
    bookmarkService.updateBookmarks();
  }

  ngOnInit(): void {

  }
}

