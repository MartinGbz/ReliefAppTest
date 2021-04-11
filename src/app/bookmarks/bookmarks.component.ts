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
  isHidden = true;
  valueButton = 'See Bookmarks';
  isHiddenLabel = true;

  constructor(public serv1Service: Serv1Service, private bookmarkService: BookmarkService) {}

  async onAddBookMarks(): Promise<void> {
    // *** LOCAL ***
    // // add to array
    // this.serv.bookmarks.push(this.serv.currentVideoUrl);
    // // update bookmarks local storage
    // localStorage.setItem('bookmarks', JSON.stringify(this.serv.bookmarks));

    // *** SERVER ***
    console.log('this.serv1Service.currentVideoUrl');
    console.log(this.serv1Service.currentVideoUrl);
    if (this.serv1Service.currentVideoUrl !== null){
      await this.bookmarkService.addBookmarks(new BookmarkModel(this.serv1Service.currentVideoUrl));
      this.bookmarkService.updateBookmarks();
      this.setLabel('The URL has been added to your Bookmarks', '#5de553');
    }
    else {
      this.setLabel('Error : You must choose a URL to add to the bookmarks', '#e55353');
    }


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

  /**
   * Set text property of the label
   * @param msg message to display
   * @param color color of the text
   */
  setLabel(msg, color): void{
    document.getElementById('bookmarkMsgLabel').innerText = msg;
    document.getElementById('bookmarkMsgLabel').setAttribute('style', 'color: ' + color);
  }

  ngOnInit(): void {
  }

}
