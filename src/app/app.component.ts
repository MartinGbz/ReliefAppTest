import {Component, OnInit} from '@angular/core';
import {Serv1Service} from './services/serv1.service';
import {APIService} from './services/history.service';
import {UrlModel} from './models/Url.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  h: UrlModel[] = [];
  historyTemp = [];

  constructor(private serv: Serv1Service, private servAPI: APIService) {
    // *** LOCAL ***
    // get history (from localStorage)
    // if (localStorage.getItem('history') !== null) {
    //   console.log('history =' + serv.history);
    //   serv.history = JSON.parse(localStorage.getItem('history'));
    // }

    // *** SERVER ***
    servAPI.getHistory();

    // console.log('serv.history :');
    // console.log(serv.history);

    // console.log('serv.urlHistory :');
    // console.log(serv.urlHistory);
    // for (const h of serv.urlHistory){
    //   console.log(h);
    //   this.historyTemp.push(h.url);
    // }
    // console.log('historyTemp');
    // console.log(this.historyTemp);
    // serv.history = this.historyTemp;


    // *** LOCAL ***
    // get bookmarks (from localStorage)
    if (localStorage.getItem('bookmarks') !== null) {
      console.log('bookmarks =' + serv.bookmarks);
      serv.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
  }

  ngOnInit(): void {

  }
}

