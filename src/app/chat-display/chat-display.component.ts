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
  messages;
  colorMessages: string[] = [];
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
    // this.messages = this.aimService.getMessagesByUserId(this.userId, this.buddyKey);

    this.aimService.getUserById(this.userId).subscribe(dataLastEmittedFromObserver => {
      this.userName = dataLastEmittedFromObserver.$value;
    });

    this.aimService.getBuddyByUserId(this.userId, this.buddyKey).subscribe(dataLastEmittedFromObserver => {
      this.buddyName = dataLastEmittedFromObserver.$value;
    });

    this.aimService.getMessagesByUserId(this.userId, this.buddyKey).subscribe(dataLastEmittedFromObserver => {
      this.messages = dataLastEmittedFromObserver;
      for(let i = 0; i < this.messages.length; i++) {
        // let regUserName = new RegExp('^.*:')
        if (JSON.stringify(this.messages[i].$value).includes(this.userName) === true) {
          this.colorMessages.push(this.messages[i].$value.replace(this.userName, "<span class='blue'>" + this.userName + "</span>"))
        } else if (JSON.stringify(this.messages[i].$value).includes(this.buddyName) === true){
          this.colorMessages.push(this.messages[i].$value.replace(this.buddyName, "<span class='red'>" + this.buddyName + "</span>"))
        } else {
        }
      }
    });
    this.aimService.getBuddyId(this.userId, this.buddyKey).subscribe(dataLastEmittedFromObserver => {
      this.buddyId = dataLastEmittedFromObserver.$value;
      this.userKey = this.aimService.getUserKey(this.userId, this.buddyId);
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
