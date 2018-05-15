import { Component, OnInit } from '@angular/core';
import { AimService } from '../aim.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-buddy-list',
  templateUrl: './buddy-list.component.html',
  styleUrls: ['./buddy-list.component.css'],
  providers: [AimService]
})
export class BuddyListComponent implements OnInit {
  currentRoute: string = this.router.url;
  userId: string;
  chatList;
  constructor(private aimService: AimService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.userId = this.route.params['_value']['id'];
    this.chatList = this.aimService.getBuddiesByUserId(this.userId);
  }

  chatWithBuddy(buddyId: string) {
    window.open(`http://localhost:4200/buddy-list/${this.userId}`, "_blank");
  }


}
