import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './countries/country/country.component';
import { CountryResolverService } from './countries/country-resolver.service';

const routes: Routes = [
  {path: ':code', component: CountryComponent, resolve: {
    country: CountryResolverService
    }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
