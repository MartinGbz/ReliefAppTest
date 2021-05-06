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
  isHiddenBookmarks = true;
  valueButton = '<i class="fa fa-eye" aria-hidden="true"></i>';
  isHiddenLabel = 'hidden';

  constructor(public serv1Service: Serv1Service, private bookmarkService: BookmarkService) {}

  async onAddBookMarks(): Promise<void> {
    // *** LOCAL ***
    // // add to array
    // this.serv.bookmarks.push(this.serv.currentVideoUrl);
    // // update bookmarks local storage
    // localStorage.setItem('bookmarks', JSON.stringify(this.serv.bookmarks));

    // *** SERVER ***
    if (this.serv1Service.currentVideoUrl !== null){
      await this.bookmarkService.addBookmarks(new BookmarkModel(this.serv1Service.currentVideoUrl));
      // this.bookmarkService.updateBookmarks();
      this.setLabel('The URL has been added to your Bookmarks', '#5de553');
    }
    else {
      this.setLabel('Error : You must choose a URL to add to the bookmarks', '#fd614f');
    }

    this.displayLabel();
  }

  /**
   * Display the error or success label for 3000ms
   */
  displayLabel(): void{
    this.isHiddenLabel = 'visible';
    setTimeout(
      () => {
        this.isHiddenLabel = 'hidden';
      }, 3000
    );
  }

  /**
   * Show or Hide Bookmarks
   */
  showHideBookMarks(): void{
    if (this.isHiddenBookmarks === true)
    {
      this.isHiddenBookmarks = false;
      this.valueButton = '<i class="fa fa-eye-slash" aria-hidden="true"></i>';
    }
    else {
      this.isHiddenBookmarks = true;
      this.valueButton = '<i class="fa fa-eye" aria-hidden="true"></i>';
    }
  }

  /**
   * Set text property of the label
   * @param msg message to display
   * @param color color of the text
   */
  setLabel(msg, color): void{
    document.getElementById('bookmarkMsgLabel').innerText = msg;
    document.getElementById('bookmarkMsgLabel').setAttribute('style', 'color: ' + color + '; font-weight:bold;');
  }

  ngOnInit(): void {
    // set the success message (the error message works too) to let the element take the necessary place in the page
    this.setLabel('The URL has been added to your Bookmarks', '#5de553');
  }

  removeBookmark(): void {
    if (this.serv1Service.currentBookmarkId != null) {
      this.bookmarkService.removeBookmark(this.serv1Service.currentBookmarkId);
    }
    else {
      this.setLabel('Error : You must choose a bookmark to remove it from the bookmarks', '#fd614f');
      this.displayLabel();
    }
  }

  onItem(event): void {
    if (!(event.target.classList.contains('active'))){
      this.deselectAllItems();
      event.target.classList.add('active');
      this.serv1Service.currentBookmarkId = event.target.id;
    }
  }

  /**
   * deselect all bookmarks
   */
  deselectAllItems(): void{
    const list = document.getElementById('listBookmarks');
    if (list.hasChildNodes()) {
      for (let i = 0; i < list.childElementCount; i++){
        list.children[i].classList.remove('active');
        console.log(list.childElementCount);
      }
    }
  }
}
