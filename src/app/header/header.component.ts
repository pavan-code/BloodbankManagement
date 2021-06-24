import { AuthService } from './../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
    private snackbar: MatSnackBar) { }
  token: any;
  show: boolean = false;
  isAdmin: boolean = false;

  ngOnInit(): void {

    this.isAdmin = this.authService.isAdmin();    
    this.token = localStorage.getItem("token");
    if(this.token) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
  openSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'      
    })
  }
  logout() {
    localStorage.clear();
    this.openSnackbar("Logged out successfully", 'close')
    setTimeout(() => {
      location.href = "login"      
    }, 3000);
  }
  home() {
    if(this.isAdmin) {
      location.href = "admin/dashboard"
    } else {
      location.href = "home"
    }
  }

}
