import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Serv1Service} from './serv1.service';
import {BookmarkModel} from '../models/bookmark.model';
import {gql} from '@apollo/client/core';
import {Apollo} from 'apollo-angular';

const GET_BOOKMARKS =  gql`
  query GetBookmarks {
    bookmarks {
      _id,
      url
    }
  }
`;

const ADD_BOOKMARKS =  gql`
  mutation AddBookmarks($_url: String!) {
    addBookmarks(url:$_url){
      _id
      url
    }
  }
`;

interface BookmarksGetReponse{
  loading: boolean;
  bookmarks: BookmarkModel[];
}

@Injectable({
  providedIn: 'root'
})

export class BookmarkService {

  constructor(private http: HttpClient, private serv1Service: Serv1Service, private apollo: Apollo) {}

  /**
   * Update Bookmarks array which contains all the bookmarks
   */
  updateBookmarks(): any {
    // GRAPHQL
    this
      .apollo
      .watchQuery<BookmarksGetReponse>({
        query: GET_BOOKMARKS})
      .valueChanges.subscribe(({ data }) => {
      this.serv1Service.bookmarks = JSON.parse(JSON.stringify(data.bookmarks));
      this.serv1Service.nbBookmark = data.bookmarks.length;
      // console.log(this.serv1Service.bookmarks);
    });
    // REST
    // this.http.get('http://localhost:8000/api/bookmarks').subscribe(
    //   (bookmarks: BookmarkModel[]) => {
    //     if (bookmarks) {
    //       this.serv1Service.bookmarks = bookmarks;
    //       this.serv1Service.nbBookmark = bookmarks.length;
    //       return true;
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //     return false;
    //   }
    // );
  }

  /**
   * Add a url to the bookmarks
   * @param bookmark bookmark to add to bookmarks
   */
  // tslint:disable-next-line:variable-name
  addBookmarks(_bookmarks: BookmarkModel): any {
    // GRAPHQL
    this.apollo.mutate({
      mutation: ADD_BOOKMARKS,
      variables: {
        _url: _bookmarks.url
      }
    }).subscribe(({ data }) => {
      // console.log('got data', data);
      this.updateBookmarks();
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
    // REST
    // return new Promise((resolve, reject) => {
    //   this.http.post('http://localhost:8000/api/bookmarks', bookmark).subscribe(
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
