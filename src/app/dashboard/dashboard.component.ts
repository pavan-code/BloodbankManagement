import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService) { }
  totalDonors!: number;
  totalRequests!: number;
  donors: any;

  ngOnInit(): void {
    this.getDonors();
    this.getRequests();
  }

  getDonors() {
    this.authService.getAllDonors()
    .subscribe((data: any) => {
      this.donors = data.donors;
      this.totalDonors = data.donors.length;
    })
  }

  getRequests() {
    this.authService.getRequests()
    .subscribe((data: any) => {
      this.totalRequests = data.length;
    })
  }

}
