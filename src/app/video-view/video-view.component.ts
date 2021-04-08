import { Component, OnInit } from '@angular/core';
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

  setUrl(from): void{
    console.log('SET URL');
    console.log('this.serv.servSearchValue = ' + this.serv.servSearchValue);
    // this.URLvideo = this.serv.servSearchValue;

    if (from === 'search' && this.serv.servSearchValue != null){
      document.getElementById('video').setAttribute('src', this.getEmbedURL(this.serv.servSearchValue));
    }
    if (from === 'select' && this.serv.selectedItem != null){
      document.getElementById('video').setAttribute('src', this.getEmbedURL(this.serv.selectedItem));
    }

    console.log(document.getElementById('video'));
  }

  getID(url): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  getEmbedURL(url): string {
    const id = this.getID(url);
    return 'https://www.youtube.com/embed/' + id;
  }

  ngOnInit(): void {
  }

}
