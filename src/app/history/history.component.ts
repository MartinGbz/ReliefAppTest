import { Component, OnInit } from '@angular/core';
import {Serv1Service} from '../services/serv1.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  htmlToAdd;
  history = [];

  constructor(private serv: Serv1Service) {
    this.history = serv.history;
  }

  onItem(event): void{
    if (event.target.classList.contains('active')) {
      // remove active selected
      event.target.classList.remove('active');
      this.serv.selectedItem = null;
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
      this.serv.selectedItem = event.target.textContent;
    }

    console.log(event.target.textContent);
    // this.selectedItem = event.target.textContent;

  }

  ngOnInit(): void {
  }

  onBtn(): void{
    console.log('selectedItem : ' + this.serv.selectedItem);
  }

}
