import { Injectable } from '@angular/core';
import { CountryService } from '../shared/country.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryDetailed } from '../shared/country-detailed.model';

@Injectable({
  providedIn: 'root'
})
export class CountryResolverService implements Resolve<CountryDetailed>{

  constructor(private countryService: CountryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CountryDetailed> {
    const countryCode = <string>route.params['code'];
    return this.countryService.fetchCountry(countryCode);
  }
}
