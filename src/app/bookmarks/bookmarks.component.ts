import { Component, OnInit } from '@angular/core';
import {Serv1Service} from '../services/serv1.service';

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

  constructor(private serv: Serv1Service) {
    this.bookmarks = serv.bookmarks;
  }

  onAddBookMarks(): void{
    this.serv.bookmarks.push(this.serv.currentVideoUrl);
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
