import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages: AngularFireList<any>;
  items: Observable<any>;
  name: any;
  msgVal: string = '';

  constructor(
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {

  }

  ngOnInit(): void {
    this.messages = this.afDb.list('/messages');
    this.items = this.messages.valueChanges();
    this.afAuth.user.subscribe(resp => {
      this.name = resp.displayName;
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider())
      .then(data => {
        console.log(data);
      })
  }

  sendMsg(message: string) {
    this.messages.push({
      message,
      date: new Date().toISOString(),
      name: this.name
    });
    this.msgVal = '';
  }

}
