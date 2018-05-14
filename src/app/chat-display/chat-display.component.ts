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

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private aimService: AimService) { }

  ngOnInit() {
    this.userId = this.route.params['_value']['id'];
    this.messages = this.aimService.getMessagesByUserId(this.userId);
    this.buddy = this.aimService.getBuddyByUserId(this.userId);
    this.aimService.getUserById(this.userId).subscribe(dataLastEmittedFromObserver => {
      this.user = dataLastEmittedFromObserver.$value;
     console.log(this.user);
   })
  }

  sendMessage(newMessage) {
    this.aimService.appendMessage(`${this.user}: ${newMessage}`, this.userId);
  }

}
