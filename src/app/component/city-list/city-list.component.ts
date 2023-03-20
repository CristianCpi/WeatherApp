import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { City } from 'src/app/model/city';
import { FetchWeatherService } from 'src/app/service/fetch-weather.service';
import { StoreCitiesService } from 'src/app/service/store-cities.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
})
export class CityListComponent {
  @Input() cities: City[] = [];
  @Input() showPreviousSelectedCities = false;

  constructor(
    private router: Router,
    private storeCitiesService: StoreCitiesService
  ) {}

  public getWeather(city: City): void {
    if (!this.showPreviousSelectedCities) {
      this.storeCitiesService.setUserChoice(city);
    }
    this.router.navigate(['/weather', city.lat, city.lon]);
  }
}
