import { Component, OnInit } from '@angular/core';
import {Serv1Service} from '../services/serv1.service';
import {BookmarkService} from '../services/bookmark.service';
import {BookmarkModel} from '../models/bookmark.model';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  bookmarks = [];
  isHidden = true;
  valueButton = 'See Bookmarks';
  isHiddenLabel = true;

  constructor(public serv: Serv1Service, private bookmarkService: BookmarkService) {
    this.bookmarks = serv.bookmarks;
  }

  async onAddBookMarks(): Promise<void> {
    // *** LOCAL ***
    // // add to array
    // this.serv.bookmarks.push(this.serv.currentVideoUrl);
    // // update bookmarks local storage
    // localStorage.setItem('bookmarks', JSON.stringify(this.serv.bookmarks));

    // *** SERVER ***
    await this.bookmarkService.addBookmarks(new BookmarkModel(this.serv.currentVideoUrl));
    this.bookmarkService.updateBookmarks();

    this.isHiddenLabel = false;
    setTimeout(
      () => {
        this.isHiddenLabel = true;
      }, 3000
    );
  }

  onSeeBookMarks(): void{
    if (this.isHidden === true)
    {
      this.isHidden = false;
      this.setValueButton('Hide Bookmarks');
    }
    else {
      this.isHidden = true;
      this.setValueButton('Show Bookmarks');
    }
  }

  setValueButton(msg): void{
    this.valueButton = msg;
  }

  ngOnInit(): void {
  }

}
