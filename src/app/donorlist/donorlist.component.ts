import { AuthService } from './../services/auth.service';
import { Component, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-donorlist',
  templateUrl: './donorlist.component.html',
  styleUrls: ['./donorlist.component.scss']
})
export class DonorlistComponent implements OnInit {

  constructor(private authService: AuthService) { }
  blood: String = "";

  @Input()
  donors: any[] = []

  ngOnInit(): void {
    if(this.donors)
      this.blood = this.donors[0].bloodGroup;
  }
 
}
