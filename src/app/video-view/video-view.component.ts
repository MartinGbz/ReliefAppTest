import {Component, OnInit} from '@angular/core';
import {Serv1Service} from '../services/serv1.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  constructor(private serv1Service: Serv1Service) {}

  /**
   * Edit src attribute of iframe
   * @param from : 'search' => function called by search button click / 'select' => function called by urlSelection
   */
  setUrl(from): void{
    if (from === 'search' && this.serv1Service.searchUrl != null){
      if (this.serv1Service.getEmbedURL(this.serv1Service.searchUrl) != null) {
        document.getElementById('video').setAttribute('src', this.serv1Service.getEmbedURL(this.serv1Service.searchUrl));
      }
    }
    // if we select the same item we don't browse the video again
    if (from === 'select' && this.serv1Service.selectedUrl !== this.serv1Service.oldSelectedUrl){
      document.getElementById('video').setAttribute('src', this.serv1Service.getEmbedURL(this.serv1Service.selectedUrl));
    }
  }

  ngOnInit(): void {
  }

}
