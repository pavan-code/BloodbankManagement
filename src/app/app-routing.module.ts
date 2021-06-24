import { RequestListComponent } from './request-list/request-list.component';
import { DonorListComponent } from './donor-list/donor-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestbloodComponent } from './requestblood/requestblood.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/Auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }, {
    path: 'login', component: LoginComponent
  }, {
    path: 'register', component: RegisterComponent
  }, {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  }, {
    path: 'requestBlood', component: RequestbloodComponent, canActivate: [AuthGuard]
  }, {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
  }, {
    path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  }, {
    path: 'admin/all-donors', component: DonorListComponent, canActivate: [AuthGuard]
  }, {
    path: 'admin/blood-requests', component: RequestListComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
