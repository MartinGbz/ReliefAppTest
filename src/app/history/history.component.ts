import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Serv1Service} from '../services/serv1.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Output() myEvent: EventEmitter<any> = new EventEmitter();
  htmlToAdd;
  history = [];

  constructor(private serv: Serv1Service) {
    this.history = serv.history;
  }

  onItem(event): void{
    if (event.target.classList.contains('active')) {
      // remove active selected
      // event.target.classList.remove('active');
      this.serv.oldSlectedItem = this.serv.selectedItem;
    }
    else {
      // reset selection
      if (event.target.parentElement.hasChildNodes()) {
        for (let i = 0; i < event.target.parentElement.childElementCount; i++){
          event.target.parentElement.children[i].classList.remove('active');
        }
      }
      // add active selected
      event.target.classList.add('active');
      this.serv.oldSlectedItem = this.serv.selectedItem;
      this.serv.selectedItem = event.target.textContent;
    }

    console.log(event.target.textContent);
    // this.selectedItem = event.target.textContent;

    this.myEvent.emit(null);
  }

  deSelectAllItems(): void{
    const list = document.getElementById('list');
    if (list.hasChildNodes()) {
      for (let i = 0; i < list.childElementCount; i++){
        list.children[i].classList.remove('active');
      }
    }
    this.serv.oldSlectedItem = this.serv.selectedItem;
    this.serv.selectedItem = null;
  }

  ngOnInit(): void {
  }

  onBtn(): void{
    console.log('selectedItem : ' + this.serv.selectedItem);
  }

}
