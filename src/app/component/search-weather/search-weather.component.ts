import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { City } from 'src/app/model/city';
import { FetchWeatherService } from 'src/app/service/fetch-weather.service';
import { StoreCitiesService } from 'src/app/service/store-cities.service';

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.css'],
})
export class SearchWeatherComponent implements OnInit, OnDestroy {
  public showPreviousSelectedCities = false;
  public previousSelectedCities: City[] = [];

  public cities: City[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private weatherService: FetchWeatherService,
    private storeCitiesService: StoreCitiesService
  ) {}

  public ngOnInit(): void {
    this.previousSelectedCities = this.storeCitiesService.getUserChoice();
    if (this.previousSelectedCities.length !== 0) {
      this.showPreviousSelectedCities = true;
    }
  }

  public searchCities(term: string): void {
    if (term === '' && this.previousSelectedCities.length !== 0) {
      this.showPreviousSelectedCities = true;
    }
    this.weatherService.getCities(term).subscribe(
      (cities) => {
        this.cities = cities;
        this.showPreviousSelectedCities = false;
      },
      (err) => {
        if (err.error && err.error.message) {
          alert(err.error.message);
          return;
        }
        alert('Failed to get city.');
      },
      () => {}
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
