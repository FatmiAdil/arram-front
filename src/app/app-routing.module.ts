import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LicenceListComponent } from './components/licence/licence-list/licence-list.component';
import { RelaisListComponent } from './components/relais/relais-list/relais-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'relais', component: RelaisListComponent, data: { title: 'Relais' } },
  { path: 'licence', component: LicenceListComponent, data: { title: 'Annuaire' } },
  { path: 'home', component: HomeComponent, data: { title: 'Accueil' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
