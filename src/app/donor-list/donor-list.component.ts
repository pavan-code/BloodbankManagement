import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donor-list',
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.scss']
})
export class DonorListComponent implements OnInit {

  constructor(private authService: AuthService) { }
  donors: any;
  show: boolean = false;

  ngOnInit(): void {
    this.authService.getAllDonors()
    .subscribe((data: any) => {
      this.show = true;
      this.donors = data.donors
    })
  }

}
