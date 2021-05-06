import {Injectable} from '@angular/core';
import { HistoryModel } from '../models/history.model';
import { HttpClient } from '@angular/common/http';
import {Serv1Service} from './serv1.service';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';

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

  /**
   * Update the History array which contains all the history
   */
  updateHistory(): void {
    // GRAPHQL
    this
      .apollo
      .watchQuery<HistoryGetReponse>({
      query: GET_HISTORY})
      .valueChanges.subscribe(({ data }) => {
      this.serv1Service.history = JSON.parse(JSON.stringify(data.history));
      console.log('updateHistory()');
      console.log(this.serv1Service.history);
      });

    // REST
    // this.http.get('http://localhost:8000/api/history').subscribe(
    //   (history: HistoryModel[]) => {
    //     if (history) {
    //       this.serv1Service.history = history;
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

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
        this.serv1Service.currentVideoId = data.lastHistory.url;
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
      this.apollo.mutate({
        mutation: ADD_HISTORY,
        variables: {
          _url: _history.url
        }
      }).subscribe(({ data }) => {
        console.log('got data', data);
        this.updateHistory();
      }, (error) => {
        console.log('there was an error sending the query', error);
      });

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
