import { Component, Input, OnInit } from '@angular/core';
import { AimService } from '../aim.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buddy-list',
  templateUrl: './buddy-list.component.html',
  styleUrls: ['./buddy-list.component.css'],
  providers: [AimService]
})
export class BuddyListComponent implements OnInit {
  @Input() childUserId: string;
  currentRoute: string = this.router.url;
  chatList;
  constructor(private aimService: AimService, private router: Router) { }

  ngOnInit() {
    this.chatList = this.aimService.getBuddiesByUserId(this.childUserId);
  }

  chatWithBuddy(buddyId: string) {
    window.open(`http://localhost:4200/chat-display/${this.childUserId}`, "_blank");
  }


}
