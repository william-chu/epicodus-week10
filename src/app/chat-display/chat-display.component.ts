import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  buddy;
  buddyId;
  user;

  constructor(private router: Router, private aimService: AimService) { }

  ngOnInit() {
    this.messages = this.aimService.getMessagesByUserId(this.userId);
    this.aimService.getBuddyByUserId(this.userId).subscribe(dataLastEmittedFromObserver => {
      this.buddy = dataLastEmittedFromObserver.$value;
    })
    this.aimService.getBuddyId(this.userId).subscribe(dataLastEmittedFromObserver => {
      this.buddyId = dataLastEmittedFromObserver.$value;
    })
    this.aimService.getUserById(this.userId).subscribe(dataLastEmittedFromObserver => {
      this.user = dataLastEmittedFromObserver.$value;
    })
  }

  sendMessage(newMessage) {
    this.aimService.appendUserChatList(`${this.user}: ${newMessage}`, this.userId);
    this.aimService.appendBuddyChatList(`${this.user}: ${newMessage}`, this.buddyId);
  }

}
