import { Component, OnInit } from '@angular/core';
import { AimService } from '../aim.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  providers: [AimService]
})
export class ConversationComponent implements OnInit {
  conversation: FirebaseListObservable<any[]>;

  constructor(private aimService: AimService
) { }

  ngOnInit() {
    // this.conversation = this.aimService.getMessages();
  }

}
