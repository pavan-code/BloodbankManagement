import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { states } from '../shared/states';
import { DonorlistComponent } from '../donorlist/donorlist.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,
              private fb: FormBuilder) { }

 
  hide: boolean = false;
  bloods: String[] = ['A-', 'A+', 'AB-', 'AB+', 'B-', 'B+', 'O-', 'O+']
  states: Array<any> = [];
  districts: Array<String> = [];
  find!: FormGroup;
  count: Array<number> = []
  donors: Array<any> = [];
  donorFinal: Array<any> = [];

  show: boolean = true;

  ngOnInit(): void {
    this.states = states;
    this.createForm();
    this.getCount();
    this.show = true;
    
  }
  
  negate() {
    this.show = !this.show;
  }

  createForm() {
    this.find = this.fb.group({
      blood: [''],
      state: [''],
      district: [''],      
    })
  }
  changeState(event: any) { 
    this.districts = [];
    let state = event.target.value;
    for (let i = 0; i < this.states.length; i++) {
      if (this.states[i].name == state) {
        this.districts = this.states[i].districts;
        break;
      }
    }
  }
  findBlood() {    
    this.hide = true;
    this.donorFinal = []
    this.authService.findByBlood(this.find.value['blood'])
    .subscribe((data: any) => {
      this.hide = false;
      this.show = false
      this.donors = data['donors']
      for(var i=0; i<this.donors.length; i++) {
        if(this.donors[i].state == this.find.value.state && this.donors[i].district == this.find.value.district) {
          this.donorFinal.push(this.donors[i]);
        }
      }
    })
  }
  getCount() {
    this.authService.findBloodCount()
    .subscribe((data:any) => {
      // console.log(data)
      this.count = data
    })
  }
}

