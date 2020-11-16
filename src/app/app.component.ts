import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD6OGgC_jEv-vpN-IHK0FXA2dkSGhPhamQ',
      authDomain: 'udemy-angular-7.firebaseapp.com'
    });
  }
}
