import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  count: any
  isLogged: boolean = false;

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
    if(this.isLogged) {
      this.count = this.authService.getAllDonors()
      .subscribe((data: any) => {
        this.count = data.donors.length;
      })
    }
  }

}
