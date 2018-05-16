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
    console.log(testUserName);
    console.log(testUserName.test(message));
    return testUserName.test(message);

  }
}
