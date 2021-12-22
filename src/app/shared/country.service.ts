import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Country } from './country.model';
import { Subject } from 'rxjs';
import { CountryDetailed } from './country-detailed.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countries: Country[] = [];
  countriesChange = new Subject<Country[]>();
  countriesFetching = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getCountries() {
    return this.countries.slice();
  }

  fetchCountries() {
    this.countriesFetching.next(true);
    this.http.get<Country>('http://146.185.154.90:8080/restcountries/rest/v2/all?fields=name%3Balpha3Code')
      .pipe(map(result => {
        return Object.entries(result).map(country => {
          return country[1];
        });
      }))
      .subscribe(result => {
        this.countries = result;
        this.countriesChange.next(this.countries);
        this.countriesFetching.next(false);
      }, () => {
        this.countriesFetching.next(false);
      })
  }

  fetchCountry(code: string) {
    const lowerCaseCode = code.toLowerCase();
    const flag = `http://146.185.154.90:8080/restcountries/data/${lowerCaseCode}.svg`;
    return this.http.get<CountryDetailed>(`http://146.185.154.90:8080/restcountries/rest/v2/alpha/${code}`)
      .pipe(map(result => {
        return new CountryDetailed(flag, result.name, result.capital, result.area, result.population, result.languages, result.alpha3Code);
      }));
  }
}
