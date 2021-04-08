import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Serv1Service} from '../services/serv1.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Output() setUrlEvent: EventEmitter<any> = new EventEmitter();
  history = [];

  constructor(private serv: Serv1Service) {
    this.history = serv.history;
  }

  onItem(event): void{
    if (event.target.classList.contains('active')) {
      this.serv.oldSelectedUrl = this.serv.selectedUrl;
    }
    else {
      this.deselectAllItems();
      event.target.classList.add('active');
      this.serv.selectedUrl = event.target.textContent;
      this.serv.currentVideoUrl = this.serv.selectedUrl;
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
    this.serv.oldSelectedUrl = this.serv.selectedUrl;
    this.serv.selectedUrl = null;
  }

  ngOnInit(): void {
  }

}
