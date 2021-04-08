import {Component, OnInit} from '@angular/core';
import {Serv1Service} from './services/serv1.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private serv: Serv1Service) {}

  ngOnInit(): void {

  }
}

