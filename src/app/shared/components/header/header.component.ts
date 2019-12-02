import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  loggedInSubscription: Subscription;

  constructor(private router: Router, private loginService : LoginService) {}

  ngOnInit() {
    this.loggedInSubscription = this.loginService.getMessage().subscribe(message => {
      this.isLoggedIn = message;
    });
  }

  logout(){
    localStorage.removeItem("UrlShortnerData");
    this.loginService.sendMessage(false);
    this.router.navigate(['/login']);
  }

}
