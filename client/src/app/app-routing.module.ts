import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmMailComponent } from './Auth/Components/confirm-mail/confirm-mail.component';
import { LoginComponent } from './Auth/Components/Login/login/login.component';
import { RegisterComponent } from './Auth/Components/Register/register/register.component';
import { UnathorizedComponent } from './Auth/Components/unathorized/unathorized.component';
import { GuardService } from './Auth/Services/guard.service';
import { HomeComponent } from './Components/home/home.component';
import { FilmoviComponent } from './filmovi/filmovi.component';
import { PonudeComponent } from './Ponude/ponude/ponude.component';
import { ProjekcijeComponent } from './projekcije/projekcije.component';
import { ProfileComponent } from './User/Components/profile/profile.component';
import { UsersPanelComponent } from './User/Components/users-panel/users-panel.component';
import { WorkerComponent } from './User/Components/worker-panel/worker/worker.component';
import {DetaljiFilmaComponent} from "./detalji-filma/detalji-filma.component";
import {GlumciComponent} from "./glumci/glumci.component";
import { DashboardComponent } from './bi-dashboard/dashboard/dashboard.component';
import { ClientHomeComponent } from './Components/home/client/client-home/client-home.component';
import { ClientMovieDetailsComponent } from './client-movie-details/client-movie-details/client-movie-details.component';
import { DatepipeComponent } from './datepipe/datepipe.component';
import { ProizvodComponent } from './proizvod/proizvod.component';
import { StavkeComponent } from './stavke/stavke.component';
import { MoviesPanelComponent } from './client-movies/movies-panel/movies-panel.component';
import { BuyTicketsComponent } from './buy-tickets/buy-tickets.component';


const routes: Routes = [
  {path: 'Film', component: FilmoviComponent},
  {path: 'Projekcija', component: ProjekcijeComponent},
  { path:'Profile',component:ProfileComponent , canActivate:[GuardService]},
  { path:'Users',component:UsersPanelComponent },
  { path:'Worker',component:WorkerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'unauthorized', component: UnathorizedComponent },
  { path:'Login',component:LoginComponent },
  { path:'Register',component:RegisterComponent },
  { path:'Confirm/:id',component:ConfirmMailComponent },
  { path:'Ponude',component:PonudeComponent },
  { path:'DetaljiFilma',component:DetaljiFilmaComponent },
  { path:'Glumci',component:GlumciComponent },
  { path: 'Statistics', component: DashboardComponent },
  { path: 'cinehome', component: ClientHomeComponent },
  { path: 'movie/:id', component: ClientMovieDetailsComponent },
  { path:'Stavke/:id',component:StavkeComponent },
  { path:'Stavke',component:StavkeComponent },
  { path:'Proizvod/:id',component:ProizvodComponent },
  { path:'Proizvod',component:ProizvodComponent },
  { path:'Datepipe',component:DatepipeComponent },
  { path: 'movies', component: MoviesPanelComponent },
  { path: 'buy-tickets', component: BuyTicketsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
