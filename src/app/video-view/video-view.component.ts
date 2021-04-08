import {Component, OnInit} from '@angular/core';
import {Serv1Service} from '../services/serv1.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {
  URLvideo;

  constructor(private serv: Serv1Service) {

  }

  /**
   * Edit url attribut of iframe
   * @param from : search=>come from search button / select=>come from item selection
   */
  setUrl(from): void{
    console.log('SET URL');
    console.log('this.serv.servSearchValue = ' + this.serv.servSearchValue);
    console.log('this.serv.selectedItem = ' + this.serv.selectedItem);
    // this.URLvideo = this.serv.servSearchValue;

    if (from === 'search' && this.serv.servSearchValue != null){
      if (this.serv.getEmbedURL(this.serv.servSearchValue) != null) {
        document.getElementById('video').setAttribute('src', this.serv.getEmbedURL(this.serv.servSearchValue));
      }
    }
    // if we select the same item we don't browse the video again
    if (from === 'select' && this.serv.selectedItem !== this.serv.oldSlectedItem){
      document.getElementById('video').setAttribute('src', this.serv.getEmbedURL(this.serv.selectedItem));
    }

    console.log(document.getElementById('video'));
  }



  ngOnInit(): void {
  }

}
