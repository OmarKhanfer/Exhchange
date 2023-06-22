import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CurrencyModule } from './currency/currency.module';

const routes: Routes = [
  { path: '', redirectTo: 'currency', pathMatch: 'full' },
  { path: 'currency', component: HomePageComponent },
  { path: 'currency/details/:base/:target', component: DetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CurrencyModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
