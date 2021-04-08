import {Component, OnInit} from '@angular/core';
import {Serv1Service} from './services/serv1.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private serv: Serv1Service) {
    // get history & bookmarks
    if (localStorage.getItem('history') !== null) {
      console.log('history =' + serv.history);
      serv.history = JSON.parse(localStorage.getItem('history'));
    }
    if (localStorage.getItem('bookmarks') !== null) {
      console.log('bookmarks =' + serv.bookmarks);
      serv.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }

    // serv.history = JSON.parse(localStorage.getItem('history'));
    // serv.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  }

  ngOnInit(): void {

  }
}

