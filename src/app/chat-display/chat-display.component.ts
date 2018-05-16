import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AimService } from '../aim.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.css'],
  providers: [AimService]
})

export class ChatDisplayComponent implements OnInit {
  @Input() userId: string;
  messages: FirebaseListObservable<any[]>;
  currentRoute: string = this.router.url;
  userKey;
  userName;
  buddyKey: string;
  buddyId: string;
  buddyName;
  volumeLevel: number = 0;

  constructor(private aimService: AimService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.userId = this.route.params['_value']['userId'];
    this.buddyKey = this.route.params['_value']['buddyKey'];
    this.messages = this.aimService.getMessagesByUserId(this.userId, this.buddyKey);

    this.aimService.getBuddyByUserId(this.userId, this.buddyKey).subscribe(dataLastEmittedFromObserver => {
      this.buddyName = dataLastEmittedFromObserver.$value;
    });
    this.aimService.getBuddyId(this.userId, this.buddyKey).subscribe(dataLastEmittedFromObserver => {
      this.buddyId = dataLastEmittedFromObserver.$value;
      this.userKey = this.aimService.getUserKey(this.userId, this.buddyId);
    });
    this.aimService.getUserById(this.userId).subscribe(dataLastEmittedFromObserver => {
      this.userName = dataLastEmittedFromObserver.$value;
    });

    // Adds click send functionality if you press enter key https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box
    document.getElementById("compose")
      .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          document.getElementById("compose-submit").click();
      }
    });
  }

  requestUserKey(){
    this.userKey = this.aimService.getUserKey(this.userId, this.buddyId);
  }

  sendMessage(newMessage) {
    this.aimService.appendUserChatList(`${this.userName}: ${newMessage}`, this.userId, this.buddyKey);
    this.aimService.appendBuddyChatList(`${this.userName}: ${newMessage}`, this.userId, this.buddyId, this.userKey);
  }

  checkUser(message) {
    let testUserName = new RegExp('^' + this.userName)
    return testUserName.test(message);
  }

  getVolume() {
    return this.volumeLevel;
  }

  setVolume() {
    this.volumeLevel = 0.5;  }
}
