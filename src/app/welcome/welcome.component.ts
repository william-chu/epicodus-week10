import { Component, OnInit } from '@angular/core';
import { AimService } from '../aim.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [AimService]
})
export class WelcomeComponent implements OnInit {
  currentRoute: string = this.router.url;
  constructor(private aimService: AimService, private router: Router) { }

  ngOnInit() {
  }

  setUser(username: string) {
    // this.aimService.setUser(username);
    this.router.navigate(['chat-display', username]);
  }

}
