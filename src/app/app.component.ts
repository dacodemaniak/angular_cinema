import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cinema-app';
  constructor(
    public router: Router,
    private httpClient: HttpClient
  ) {}

  public ping() {
    this.httpClient.get(`${environment.wishList}`)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }
}
