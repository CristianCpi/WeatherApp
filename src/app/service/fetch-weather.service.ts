import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../model/city';
import { Weather } from '../model/weather';
import { environment } from 'src/environments/environment';

const apiKey: string = environment.API_KEY;

@Injectable({
  providedIn: 'root',
})
export class FetchWeatherService {
  private readonly openWeathermapUrl = 'http://api.openweathermap.org/';

  constructor(private http: HttpClient) {}

  getCities(loc: string): Observable<City[]> {
    return this.http.get<City[]>(
      `${this.openWeathermapUrl}geo/1.0/direct?q=${loc}&limit=8&appid=${apiKey}`
    );
  }

  getWeather(lat: string, lon: string): Observable<Weather> {
    return this.http.get<Weather>(
      `${this.openWeathermapUrl}data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
  }
}
