import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmMailComponent } from './Auth/Components/confirm-mail/confirm-mail.component';
import { LoginComponent } from './Auth/Components/Login/login/login.component';
import { RegisterComponent } from './Auth/Components/Register/register/register.component';
import { UnathorizedComponent } from './Auth/Components/unathorized/unathorized.component';
import { HomeComponent } from './Components/home/home.component';
import { FilmoviComponent } from './filmovi/filmovi.component';
import { ProjekcijeComponent } from './projekcije/projekcije.component';
import { ProfileComponent } from './User/Components/profile/profile.component';
import { UsersPanelComponent } from './User/Components/users-panel/users-panel.component';
import { WorkerComponent } from './User/Components/worker-panel/worker/worker.component';


const routes: Routes = [
  {path: 'filmovi', component: FilmoviComponent},
  {path: 'projekcije', component: ProjekcijeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:'Profile',component:ProfileComponent},//,canActivate:[GuardService]},
  { path:'Users',component:UsersPanelComponent },
  { path:'Worker',component:WorkerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'unauthorized', component: UnathorizedComponent },
  { path:'Login',component:LoginComponent },
  { path:'Register',component:RegisterComponent },
  { path:'Confirm/:id',component:ConfirmMailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
