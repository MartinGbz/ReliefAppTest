import {Injectable} from '@angular/core';
import { HistoryModel } from '../models/history.model';
import { HttpClient } from '@angular/common/http';
import {Serv1Service} from './serv1.service';

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  constructor(private http: HttpClient, private serv1Service: Serv1Service) {}

  /**
   * Update the History array which contains all the history
   */
  updateHistory(): void {
    this.http.get('http://localhost:8000/api/history').subscribe(
      (history: HistoryModel[]) => {
        if (history) {
          this.serv1Service.history = history;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Update the History array which contains all the history
   */
   getLastHistory(): any {
    this.http.get('http://localhost:8000/api/history/last').subscribe(
      (lastHistory: HistoryModel[]) => {
        if (lastHistory) {
          this.serv1Service.currentVideoId = lastHistory[0]._id;
          console.log('*** this.serv1Service.verifLast');
          console.log('getlast');
          console.log(lastHistory[0]._id);
          // return lastHistory[0]._id;
          // console.log(lastHistory);
          // console.log(this.serv1Service.currentVideoId);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Add a url to the History
   * @param url url to add to the history
   */
  addHistory(url: HistoryModel): any {
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
