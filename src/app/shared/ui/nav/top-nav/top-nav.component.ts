import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from 'src/app/core/service/identity.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  
  constructor(
    public router: Router,
    public identityService: IdentityService
  ) { }

  ngOnInit(): void {
  }
  
  public doLogout() {
    this.identityService.logout();
  }
}
