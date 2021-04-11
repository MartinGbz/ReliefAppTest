import {UrlModel} from '../models/Url.model';
import {BookmarkModel} from '../models/bookmark.model';

export class Serv1Service{
  // *** LOCAL HISTORY ***
  // history = [];
  // *** SERVER HISTORY ***
  urlHistory: UrlModel[] = [];

  // *** LOCAL HISTORY ***
  // bookmarks = [];
  // *** SERVER HISTORY ***
  bookmarks: BookmarkModel[] = [];

  searchUrl = null;
  selectedUrl = null;
  oldSelectedUrl = null;

  currentVideoUrl = null;




  /**
   * Get id of Youtube video
   * @param url : url basic of the video
   */
  getID(url): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  /**
   * Create the Youtube code url for the iframe src attribute
   * @param url : url basic of the video
   */
  getEmbedURL(url): string {
    const id = this.getID(url);
    if (id != null){
      return 'https://www.youtube.com/embed/' + id;
    }
    else{
      return null;
    }
  }
}
