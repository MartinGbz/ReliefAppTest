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

  ngOnInit(): void {
  }

}
