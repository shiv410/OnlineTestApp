import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ViewallusersComponent } from './viewallusers/viewallusers.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { DisplayquestionComponent } from './displayquestion/displayquestion.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminhomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'viewall', component: ViewallusersComponent },
  { path: 'addque', component: AddquestionComponent },
  { path: 'quiz/:subjectId', component: DisplayquestionComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'score', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'que', component: QuestionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
