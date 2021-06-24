import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

  constructor(private authService: AuthService) { }
  requests: any;
  show: boolean = false;

  ngOnInit(): void {
    this.authService.getRequests()
    .subscribe((data: any) => {
      this.show = true;
      this.requests = data;
    })
  }

}
