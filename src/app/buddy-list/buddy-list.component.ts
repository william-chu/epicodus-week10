import { Component, OnInit } from '@angular/core';
import { AimService } from '../aim.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
// import * as $ from ‘jquery’;

@Component({
  selector: 'app-buddy-list',
  templateUrl: './buddy-list.component.html',
  styleUrls: ['./buddy-list.component.css'],
  providers: [AimService]
})
export class BuddyListComponent implements OnInit {
  currentRoute: string = this.router.url;
  userId: string;
  user;
  chatList;
  constructor(private aimService: AimService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.userId = this.route.params['_value']['userId'];
    this.chatList = this.aimService.getBuddiesByUserId(this.userId);

    // $(document).ready(function(){
    //   $(".buddy-dropDown").click(function(){
    //     let div = $(".buddyList");
    //       div.animate({down: '100px'}, "slow");
    //       div.animate({fontSize: '5em'}, "slow");
    //   });
    // });
  }

  chatWithBuddy(buddyId: string) {
    window.open(`${location.origin}/chat-display/${this.userId}/${buddyId}`, "chat", "height=300, width=300");
  }

  // seeBuddyList(listOfBuddies: buddies){
  //   this.buddies = listOfBuddies;
  // }

}
