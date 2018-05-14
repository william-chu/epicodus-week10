import { Component, OnInit } from '@angular/core';
import { AimService } from '../aim.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [AimService]
})
export class WelcomeComponent implements OnInit {

  constructor(private aimService: AimService) { }

  ngOnInit() {
  }

  setUser(username: string) {
    //send the usernmae to the service to set it for everything
    //route to the appropriate buddylist
  }

}
