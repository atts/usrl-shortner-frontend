import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { GenerateUrlService } from '../services/generate-url.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  sourceUrl = "";
  newUrl = "";
  
  constructor(private router: Router, private loginService : LoginService, private urlService : GenerateUrlService) {
    const loggedInData = JSON.parse(localStorage.getItem('UrlShortnerData'));
    if (!loggedInData) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.loginService.sendMessage(true);
  }

  generateUrl(){
    const obj = {
      "originalUrl": this.sourceUrl,
      "shortBaseUrl": "http://localhost"
  }
    this.urlService.generateUrl(obj).subscribe(resp=>{
      console.log(resp);
      this.newUrl = resp['shortUrl'];
      this.sourceUrl = "";
    })
  }

  navigate(){
    const identifier = this.newUrl.slice(this.newUrl.lastIndexOf('/') + 1, this. newUrl.length)
    console.log(identifier);
    this.urlService.getUrl(identifier).subscribe(resp=>{
      const url = resp.toString();
      window.open(url, '_blank');
    })
  }


}
