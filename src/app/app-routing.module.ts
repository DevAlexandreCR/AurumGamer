import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainGuard } from './services/guard/main.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MainModule } from './main/main.module';
import { LegalComponent } from './legal/legal.component';



const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [MainGuard]},
  { path: 'main', loadChildren: () => MainModule, canActivateChild: [MainGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'legal', component: LegalComponent},
  { path: '**', component: LegalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
