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
  // user;
  buddyId: string;
  // buddy;

  constructor(private aimService: AimService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.userId = this.route.params['_value']['userId'];
    this.buddyId = this.route.params['_value']['buddyId'];
    this.messages = this.aimService.getMessagesByUserId(this.userId, this.buddyId);

    // this.aimService.getBuddyByUserId(this.userId).subscribe(dataLastEmittedFromObserver => {
    //   this.buddy = dataLastEmittedFromObserver.$value;
    // })
    // this.aimService.getBuddyId(this.userId).subscribe(dataLastEmittedFromObserver => {
    //   this.buddyId = dataLastEmittedFromObserver.$value;
    // })
    // this.aimService.getUserById(this.userId).subscribe(dataLastEmittedFromObserver => {
    //   this.user = dataLastEmittedFromObserver.$value;
    // })
  }

  // sendMessage(newMessage) {
  //   this.aimService.appendUserChatList(`${this.user}: ${newMessage}`, this.userId);
  //   this.aimService.appendBuddyChatList(`${this.user}: ${newMessage}`, this.buddyId);
  // }

}
