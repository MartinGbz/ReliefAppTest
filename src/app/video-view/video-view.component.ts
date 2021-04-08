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

  setUrl(): void{
    console.log('SET URL');
    console.log('this.serv.servSearchValue = ' + this.serv.servSearchValue);
    // this.URLvideo = this.serv.servSearchValue;
    document.getElementById('video').setAttribute('src', this.serv.servSearchValue);
    console.log(document.getElementById('video'));
  }

  ngOnInit(): void {
  }

}
