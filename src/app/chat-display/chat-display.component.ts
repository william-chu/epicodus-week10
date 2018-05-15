import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AimService } from '../aim.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.css'],
  providers: [AimService]
})
export class ChatDisplayComponent implements OnInit {
  userId: string;
  messages: FirebaseListObservable<any[]>;
  buddy;
  user;
  buddyId;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private aimService: AimService) { }

  ngOnInit() {
    this.userId = this.route.params['_value']['id'];
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
