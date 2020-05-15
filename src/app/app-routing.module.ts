import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainGuard } from './services/guard/main.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [MainGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
