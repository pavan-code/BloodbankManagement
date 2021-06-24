import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { states } from '../shared/states';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  districts: Array<String> = [];
  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private snackbar: MatSnackBar) {}
  states: Array<any> = [];
  register!: FormGroup;
  show: boolean = true;

  ngOnInit(): void {
    this.states = states;
    this.createForm();
  }
  formErrors:any = {
    username: '',
    email: '',
    mobile: '',
    password: '',
    bloodGroup: '',
    gender: '',
    dob: '',
    weight: '',
    state: '',
    district: '',
    city: '',
    pincode: '',
  };
  validationMsgs:any = {
    username: {
      'required': "Username is required"
    },
    email: {
      'required': "Email ID is required",
      'email': "Must be a valid email id"
    },
    mobile: {
      'required': 'Mobile number is required',
      'minlength': 'Mobile no. should be 10 digits',
      'maxlength': 'Mobile no. should be 10 digits'
    },
    password: {
      'required': 'Password is required',
      'minlength': 'Password should be min. 8 characters'
    },
    bloodGroup: {
      'required': 'Select Blood group'
    },
    gender: {
      'required': 'Select gender'
    },
    dob: {
      'required': 'Select Date of Birth'
    },
    weight: {
      'required': 'Enter weight'
    },
    state: {
      'required': 'Select your state'
    },
    district: {
      'required': 'Select your district'
    },
    city: {
      'required': 'Enter your City'
    },
    pincode: {
      'required': 'Enter your postal pincode'
    }
  }
  createForm() {
    this.register = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      bloodGroup: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
    });
    this.register.valueChanges.subscribe((data) => this.onValueChanged(data));
  }
  onValueChanged(data?: any) {
    if (!this.register) {
      return;
    }
    const form = this.register;
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
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
  getRegister() {
    this.show = false;
    // console.log(this.register.value)
    this.authService.register(this.register.value)
    .subscribe((res:any) => {
      this.show = true;
      console.log(res);
      if(res.statusCode == 200) {
        this.openSnackbar(res.message, 'close');
        setTimeout(() => {
          location.href = "login"
        }, 2500);
      }
    })
  }
}
