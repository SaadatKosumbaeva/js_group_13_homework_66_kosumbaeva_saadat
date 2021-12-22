import { Component, OnInit } from '@angular/core';
import { CountryDetailed } from '../../shared/country-detailed.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  country!: CountryDetailed;
  languages: string[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.country = <CountryDetailed>data.country;
      this.languages = [];
      this.country.languages.forEach((lang: any) => {
        this.languages.push(lang['name']);
      });
    });
  }
}
