import {Injectable, NgModule} from '@angular/core';
import { UrlModel } from '../models/Url.model';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';
import {Serv1Service} from './serv1.service';

@Injectable({
  providedIn: 'root'
})

// @NgModule({
//   imports: HttpClient
// })

// @NgModule({
//   imports: [HttpClientModule],
//   providers: [HttpClientModule]
// })

export class APIService {

  constructor(private http: HttpClient, private serv: Serv1Service) {}

  historyTemp = [];

  // private history: History[];

  // private stuff: History[] = [
  //   {
  //     url: '324sdfmoih3',
  //   },
  //   {
  //     url: '324sdfmoih4',
  //   },
  // ];
  // public history$ = new Subject<UrlModel[]>();

  // getHistory(): UrlModel[] {
  //   this.http.get('http://localhost:8000/api/history').subscribe(
  //     (history: UrlModel[]) => {
  //       if (history) {
  //         // this.history = history;
  //         return history;
  //       }
  //       else {
  //         return null;
  //       }
  //     },
  //     (error) => {
  //       console.log('TEST :');
  //       console.log(error);
  //     }
  //   );
  // }

  getHistory(): void {
    this.http.get('http://localhost:8000/api/history').subscribe(
      (history: UrlModel[]) => {
        if (history) {
          console.log('history :');
          console.log(history);
          console.log(history.length);

          this.serv.urlHistory = history;

          // // empty array
          // this.historyTemp.length = 0;
          //
          // for (const h of history){
          //   console.log(h);
          //   this.historyTemp.push(h.url);
          // }
          // console.log('this.historyTemp :');
          // console.log(this.historyTemp);
          // this.serv.history = this.historyTemp;
          // console.log('this.serv.history  :');
          // console.log(this.serv.history);
        }
      },
      (error) => {
        console.log('TEST :');
        console.log(error);
      }
    );
  }

  // getHistory() {
  //   this.http.get('http://localhost:8000/api/histor').subscribe(
  //     (stuff: UrlModel[]) => {
  //       if (stuff) {
  //         // this.stuff = stuff;
  //         // this.emitStuff();
  //         return stuff;
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  postUrlToHistory(url: UrlModel): any {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8000/api/history', url).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
