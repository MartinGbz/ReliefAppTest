import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Serv1Service} from '../services/serv1.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Output() setUrlEvent: EventEmitter<any> = new EventEmitter();

  // set serv1Service to Public to get access in html file
  constructor(public serv1Service: Serv1Service) {}

  onItem(event): void{
    if (event.target.classList.contains('active')) {
      this.serv1Service.oldSelectedUrl = this.serv1Service.selectedUrl;
    }
    else {
      this.deselectAllItems();
      event.target.classList.add('active');
      this.serv1Service.selectedUrl = event.target.textContent;
      this.serv1Service.currentVideoUrl = this.serv1Service.selectedUrl;
    }

    console.log(event.target.textContent);

    this.setUrlEvent.emit(null); // setUrl() (in video-view)
  }

  /**
   * deselect all history URLs and update selectedUrl & oldSelectedUrl
   * called also by search-bar
   */
  deselectAllItems(): void{
    const list = document.getElementById('list');
    if (list.hasChildNodes()) {
      for (let i = 0; i < list.childElementCount; i++){
        list.children[i].classList.remove('active');
      }
    }
    this.serv1Service.oldSelectedUrl = this.serv1Service.selectedUrl;
    this.serv1Service.selectedUrl = null;
  }

  ngOnInit(): void {
  }

}
