import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  login!: FormGroup;
  hide: boolean = true;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.login = this.fb.group({
      email: ['', ],
      password: ['', [Validators.required]],
    });
    this.login.valueChanges.subscribe((data) => this.onValueChanged(data));
  }
  formErrors: any = {
    email: '',
    password: '',
  };
  validationMsgs: any = {
    email: {
      required: 'Email ID required',
    },
    password: {
      required: 'Password is required',
    },
  };
  openSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  getLogin() {
    // console.log(this.login.value);
    this.hide = false;
    this.authService.connect(this.login.value).subscribe(
      (res: any) => {
        console.log(res);
        this.hide = true;
        if (res.statusCode == 200) {
          this.openSnackbar('Login Successfull', 'close');
          delete res.donor.password;
          localStorage.setItem('donor', JSON.stringify(res.donor));
          localStorage.setItem('token', res.jwt);
          if (res.donor.roles == 'ROLE_USER') {
            setTimeout(() => {
              location.href = '/home';
            }, 2500);
          } else {
            setTimeout(() => {
              location.href = '/admin/dashboard'
            }, 2500);
          }
        } else if (res.statusCode == 403) {
          this.openSnackbar(res.message, 'close');
        }
      },
      (err) => console.log(err)
    );
  }
  onValueChanged(data?: any) {
    if (!this.login) {
      return;
    }
    const form = this.login;
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
}
