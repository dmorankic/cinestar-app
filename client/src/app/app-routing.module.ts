import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesPanelComponent } from './client-movies/movies-panel/movies-panel.component';
import { DatepipeComponent } from './datepipe/datepipe.component';
import { DetaljiFilmaComponent } from './detalji-filma/detalji-filma.component';
import { FilmoviComponent } from './filmovi/filmovi.component';
import { GlumciComponent } from './glumci/glumci.component';
import { PonudeComponent } from './Ponude/ponude/ponude.component';
import { ProizvodComponent } from './proizvod/proizvod.component';
import { ProjekcijeComponent } from './projekcije/projekcije.component';
import { StavkeComponent } from './stavke/stavke.component';

const routes: Routes = [
  {path: 'Film', component: FilmoviComponent},
  {path: 'Projekcija', component: ProjekcijeComponent},
  { path:'Ponude',component:PonudeComponent },
  { path:'DetaljiFilma',component:DetaljiFilmaComponent },
  { path:'Glumci',component:GlumciComponent },
  { path:'Stavke/:id',component:StavkeComponent },
  { path:'Stavke',component:StavkeComponent },
  { path:'Proizvod/:id',component:ProizvodComponent },
  { path:'Proizvod',component:ProizvodComponent },
  { path:'Datepipe',component:DatepipeComponent },
  { path: 'movies', component: MoviesPanelComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
