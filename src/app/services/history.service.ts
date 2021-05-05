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

const GET_LAST_HISTORY =  gql`
  query LastHistory {
    lastHistory {
      _id,
      url
    }
  }
`;

const ADD_HISTORY =  gql`
  mutation AddHistory($_url: String!) {
    addHistory(url:$_url){
      _id
      url
    }
  }
`;

interface HistoryGetReponse{
  loading: boolean;
  history: HistoryModel[];
}

interface LastHistoryReponse{
  loading: boolean;
  lastHistory: HistoryModel;
}

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  constructor(private http: HttpClient, private serv1Service: Serv1Service, private apollo: Apollo) {}

  history: HistoryModel[] = [];

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
      .watchQuery<HistoryGetReponse>({
      query: GET_HISTORY})
      .valueChanges.subscribe(({ data }) => {
      // this.loading = loading;
      // var historyTemp:HistoryModel[] = new Array();
      // let historyTemp = new Array();
      // historyTemp = data.history;
      // historyTemp.forEach(function(v){delete v.typename});
      console.log('data.history');
      console.log(data.history);
      // console.log(historyTemp);
      this.serv1Service.history = data.history;
      console.log(this.serv1Service.history);
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
     // GRAPHQL
    this
      .apollo
      .watchQuery<LastHistoryReponse>({
        query: GET_LAST_HISTORY})
      .valueChanges.subscribe(({ data }) => {
        console.log('1data');
        console.log(data);
        console.log(data.lastHistory.url);
        // this.serv1Service.currentVideoId = data.history[0]._id;
        this.serv1Service.currentVideoId = data.lastHistory.url;
        console.log('2data');
        console.log(data);
        console.log('currentVideoId');
        console.log(data.lastHistory);
        console.log(this.serv1Service.currentVideoId);
    });

     // REST
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
   * @param urlIn url to add to the history
   */
  // tslint:disable-next-line:variable-name
  addHistory(_history: HistoryModel): any {
    // GRAPHQL
    // this.apollo.mutate({
    //   mutation: ADD_HISTORY,
    //   variables: {_url: urlIn}
    // }).subscribe(({data}) => {console.log('got data', data); },
    //     (error) => {console.log('there was an error sending the query', error);
    // });
      this.apollo.mutate({
        mutation: ADD_HISTORY,
        variables: {
          _url: _history.url
        }
      }).subscribe(({ data }) => {
        console.log('got data', data);
      }, (error) => {
        console.log('there was an error sending the query', error);
      });

      console.log('_history.url');
      console.log(_history.url);
    // REST
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
