import {Injectable} from '@angular/core';
import { HistoryModel } from '../models/history.model';
import { HttpClient } from '@angular/common/http';
import {Serv1Service} from './serv1.service';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {Observable} from '@apollo/client/utilities/observables/Observable';
import {map} from 'rxjs/operators';

const GET_HISTORY =  gql`
  query GetHistory {
    history {
      _id,
      url
    }
  }
`;

// interface Reponse{
//   history: HistoryModel[];
// }

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  constructor(private http: HttpClient, private serv1Service: Serv1Service, private apollo: Apollo) {}

  // historyGet: Observable<HistoryModel[]>;

  /**
   * Update the History array which contains all the history
   */
  // updateHistory(): void {
  //   this.historyGet = this.apollo.watchQuery<any>({
  //     query: GET_HISTORY})
  //     .valueChanges.pipe(map(result => result.data.history));
  //   this.serv1Service.history = this.historyGet;
  //   console.log('this.historyGet');
  //   console.log(this.historyGet);
  // }

  // updateHistory(): void {
  //   this.historyGet$ = this.apollo.watchQuery<any>({
  //       query: GET_HISTORY})
  //     .valueChanges.pipe(map(result => result.data.historyGet));
  //   this.serv1Service.history = this.historyGet$;
  // }

  updateHistory(): void {
    this
      .apollo
      .watchQuery<any>({
      query: GET_HISTORY})
      .valueChanges.subscribe(({ data, loading }) => {
      // this.loading = loading;
      this.serv1Service.history = data.history;
      console.log('data.history');
      console.log(data.history);
      });
  }

  // updateHistory(): void {
  //   this.http.get('http://localhost:8000/api/history').subscribe(
  //     (history: HistoryModel[]) => {
  //       if (history) {
  //         this.serv1Service.history = history;
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  /**
   * Update the History array which contains all the history
   */
   getLastHistory(): any {
    // this.http.get('http://localhost:8000/api/history/last').subscribe(
    //   (lastHistory: HistoryModel[]) => {
    //     if (lastHistory) {
    //       this.serv1Service.currentVideoId = lastHistory[0]._id;
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  /**
   * Add a url to the History
   * @param url url to add to the history
   */
  addHistory(url: HistoryModel): any {
    // return new Promise((resolve, reject) => {
    //   this.http.post('http://localhost:8000/api/history', url).subscribe(
    //     (response) => {
    //       resolve(response);
    //     },
    //     (error) => {
    //       reject(error);
    //     }
    //   );
    // });
  }

}
