import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Serv1Service} from './serv1.service';
import {BookmarkModel} from '../models/bookmark.model';

@Injectable({
  providedIn: 'root'
})

export class BookmarkService {

  constructor(private http: HttpClient, private serv1Service: Serv1Service) {}

  /**
   * Update Bookmarks array which contains all the bookmarks
   */
  updateBookmarks(): any {
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
  addBookmarks(bookmark: BookmarkModel): any {
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
