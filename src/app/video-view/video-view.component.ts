import {Component, OnInit} from '@angular/core';
import {Serv1Service} from '../services/serv1.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  constructor(private serv: Serv1Service) {}

  /**
   * Edit url attribut of iframe
   * @param from : search=>come from search button / select=>come from item selection
   */
  setUrl(from): void{
    console.log('SET URL');
    console.log('this.serv.oldSlectedItem = ' + this.serv.oldSelectedUrl);
    console.log('this.serv.selectedItem = ' + this.serv.selectedUrl);
    console.log('this.serv.servSearchValue = ' + this.serv.searchUrl);
    // this.URLvideo = this.serv.servSearchValue;

    if (from === 'search' && this.serv.searchUrl != null){
      if (this.serv.getEmbedURL(this.serv.searchUrl) != null) {
        document.getElementById('video').setAttribute('src', this.serv.getEmbedURL(this.serv.searchUrl));
      }
    }
    // if we select the same item we don't browse the video again
    if (from === 'select' && this.serv.selectedUrl !== this.serv.oldSelectedUrl){
      document.getElementById('video').setAttribute('src', this.serv.getEmbedURL(this.serv.selectedUrl));
    }

    console.log(document.getElementById('video'));
  }


  ngOnInit(): void {
  }

}
