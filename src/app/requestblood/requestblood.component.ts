import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { states } from '../shared/states';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-requestblood',
  templateUrl: './requestblood.component.html',
  styleUrls: ['./requestblood.component.scss']
})
export class RequestbloodComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private snackbar: MatSnackBar) { }
  districts: Array<String> = [];
  states: Array<any> = [];
  bloods: String[] = ['A-', 'A+', 'AB-', 'AB+', 'B-', 'B+', 'O-', 'O+']
  request!: FormGroup;
  requests: any;
  show: boolean = true;
  hide: boolean = false;
  ngOnInit(): void {
    this.states = states;
    this.createForm();
    this.getRequests();
  }
  formErrors:any = {
    email: '',
    mobile: '',
    blood: '',
    state: '',
    district: '',
    patient: '',
    date: '',
    priority: ''
  };
  validationMsgs:any = {
    patient: {
      'required': "Patient name is required"
    },
    email: {
      'required': "Email ID is required",
      'email': "Must be a valid email id"
    },
    mobile: {
      'required': 'Mobile number is required',
      'pattern': 'Enter 10 digit mobile number'
    },
    blood: {
      'required': 'Select blood group',
    },
    state: {
      'required': 'Select State'
    },
    district: {
      'required': 'Select District'
    },
    date: {
      'required': 'Select Date of requirement'
    },
    priority: {
      'required': 'Select priority'
    }
  }

  createForm() {
    this.request = this.fb.group({
      patient: ['', [Validators.required]],
      blood: ['', [Validators.required]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      priority: ['', [Validators.required]]
    })
    this.request.valueChanges.subscribe(data => this.onValueChanged(data))
  }
  onValueChanged(data?: any) {
    if (!this.request) {
      return;
    }
    const form = this.request;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMsgs[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
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
  openSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'      
    })
  }
  submit() {
    this.hide = true;
    console.log(this.request.value)
    this.authService.requestBlood(this.request.value)
    .subscribe((data: any) => {
      console.log(data)
      this.hide = false;
      this.openSnackbar("Request sent Successfully", "close")
      if(data.statusCode == 200)
        setTimeout(() => {
          location.href = "/home"
        }, 3000);
    })
  }
  getRequests() {
    this.authService.getRequests()
    .subscribe((data: any) => {
      // console.log(data);   
      this.requests = data;   
      this.show = false;
    })
  }
}
