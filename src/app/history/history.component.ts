import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  htmlToAdd;

  constructor() { }
  // tslint:disable-next-line:typedef
  addList(eltList){
    console.log('SEARCH');

    const list = document.getElementById('list');
    const li = document.createElement('li');
    li.innerText = 'TEST';
    this.htmlToAdd = li;
  }

  ngOnInit(): void {
  }

}
