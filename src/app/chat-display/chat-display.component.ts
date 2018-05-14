import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AimService } from '../aim.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.css'],
  providers: [AimService]
})
export class ChatDisplayComponent implements OnInit {
  userId: string;
  conversation;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private aimService: AimService) { }

  ngOnInit() {
    this.userId = this.route.params['_value']['id'];
    console.log(this.userId);
    this.conversation = this.aimService.getMessagesByUserId(this.userId).subscribe(dataLastEmittedFromObserver => {
      this.conversation = dataLastEmittedFromObserver;
      console.log(this.conversation);
    });

  }

}
