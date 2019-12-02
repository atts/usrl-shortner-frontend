import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isNewUser = false;
  userData = {
    name: "",
    email: "",
    password: ""
  }
  isRegistered = false;
  constructor(private loginService: LoginService, private router: Router) {
    const loggedInData = JSON.parse(localStorage.getItem('UrlShortnerData'));
    if (loggedInData) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

  toggleUser() {
    this.isNewUser = !this.isNewUser;
  }

  registerUser() {
    this.loginService.createUser(this.userData).subscribe(resp => {
      console.log("user successfully registered")
      this.toggleUser();
      this.isRegistered = true;
    })
  }

  loginUser() {
    this.isRegistered = false;
    this.loginService.loginUser(this.userData).subscribe(resp => {
      localStorage.setItem('UrlShortnerData', JSON.stringify(resp));
      this.router.navigate(['/home']);
    })
  }

}
