import { Component, Input, OnInit } from '@angular/core';
import { AimService } from '../aim.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-buddy-list',
  templateUrl: './buddy-list.component.html',
  styleUrls: ['./buddy-list.component.css'],
  providers: [AimService]
})
export class BuddyListComponent implements OnInit {
  @Input() childUserId: string;
  chatList;
  constructor(private aimService: AimService) { }

  ngOnInit() {
    this.chatList = this.aimService.getBuddiesByUserId(this.childUserId);
  }

}
