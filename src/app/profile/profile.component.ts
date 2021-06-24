import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  donor: any | null;

  constructor() { }
  

  ngOnInit(): void {
    this.donor = JSON.parse(localStorage.getItem('donor') || '{}')  
  }

}
