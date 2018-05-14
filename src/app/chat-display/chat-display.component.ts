import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AimService } from '../aim.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.css'],
  providers: [AimService]
})
export class ChatDisplayComponent implements OnInit {
  userId: string;
  messages: FirebaseListObservable<any[]>;
  name;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private aimService: AimService) { }

  ngOnInit() {
    this.userId = this.route.params['_value']['id'];
    this.messages = this.aimService.getMessagesByUserId(this.userId);
    this.name = this.aimService.getBuddyByUserId(this.userId);
    console.log(this.name);
  }

  sendMessage(newMessage) {
    this.aimService.appendMessage(`${this.name}: ${newMessage}`, this.userId);
  }

}
