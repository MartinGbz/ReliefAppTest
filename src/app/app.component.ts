import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Relief';
  isAuth = false; // test

  bar1 = 'bar1 (app)';

  constructor() {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }
  // tslint:disable-next-line:typedef
  onSwitchOn(){
    console.log('HELLO');
  }
}

