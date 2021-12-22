import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountryService } from '../shared/country.service';
import { Country } from '../shared/country.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries!: Country[];
  countriesFetchingSubscription!: Subscription;
  countriesChangeSubscription!: Subscription;
  isFetching = false;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countries = this.countryService.getCountries();
    this.countriesChangeSubscription = this.countryService.countriesChange.subscribe(countries => {
      this.countries = countries;
    });
    this.countriesFetchingSubscription = this.countryService.countriesFetching.subscribe(isFetching => {
      this.isFetching = isFetching;
    });
    this.countryService.fetchCountries();
  }

  ngOnDestroy(): void {
    this.countriesChangeSubscription.unsubscribe();
    this.countriesFetchingSubscription.unsubscribe();
  }

}
