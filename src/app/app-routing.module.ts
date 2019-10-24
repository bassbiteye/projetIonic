import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'acceuil', loadChildren: './acceuil/acceuil.module#AcceuilPageModule' },
  { path: 'partenaire', loadChildren: './pages/partenaire/partenaire.module#PartenairePageModule' },
  { path: 'transaction', loadChildren: './pages/transaction/transaction.module#TransactionPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'addpar', loadChildren: './pages/partenaire/addpar/addpar.module#AddparPageModule' },
  { path: 'envoi', loadChildren: './pages/envoi/envoi.module#EnvoiPageModule' },
  { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule' },
  { path: 'view', loadChildren: './pages/view/view.module#ViewPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
