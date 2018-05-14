import { Component, OnInit } from '@angular/core';
import { AimService } from '../aim.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css'],
  providers: [AimService]
})
export class ComposeComponent implements OnInit {

  constructor(private aimService: AimService) { }

  ngOnInit() {
  }

}
