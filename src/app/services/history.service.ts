import {Injectable} from '@angular/core';
import { UrlModel } from '../models/Url.model';
import { HttpClient } from '@angular/common/http';
import {Serv1Service} from './serv1.service';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  constructor(private http: HttpClient, private serv: Serv1Service) {}

  /**
   * Update the History array which contains all the history
   */
  updateHistory(): void {
    this.http.get('http://localhost:8000/api/history').subscribe(
      (history: UrlModel[]) => {
        if (history) {
          this.serv.urlHistory = history;
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
  addHistory(url: UrlModel): any {
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
