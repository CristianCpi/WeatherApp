import { Injectable } from '@angular/core';

import { City } from '../model/city';

@Injectable({
  providedIn: 'root',
})
export class StoreCitiesService {
  private cities: City[] = [];

  setUserChoice(choice: City) {
    let storage = JSON.parse(localStorage.getItem('selectedCities') || '[]');
    if (storage) {
      this.cities = storage;
    }
    this.cities.push(choice);
    localStorage.setItem('selectedCities', JSON.stringify(this.cities));
  }

  getUserChoice() {
    return JSON.parse(localStorage.getItem('selectedCities') || '[]');
  }
}
