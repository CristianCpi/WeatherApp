import { TestBed } from '@angular/core/testing';

import { FetchWeatherService } from './fetch-weather.service';
import { environment } from 'src/environments/environment';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

fdescribe('FetchWeatherService', () => {
  let service: FetchWeatherService;
  let httpMock: HttpTestingController;
  const apiKey: string = environment.API_KEY;
  const openWeathermapUrl = 'http://api.openweathermap.org/';
  const loc = 'London';
  const lat = '51.5073219';
  const lon = '-0.1276474';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FetchWeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of cities as result', () => {
    service.getCities(loc).subscribe((result) => {
      expect(result).toBeTruthy();
      expect(result.length).toEqual(5);
      console.log('cities result verified');
    });

    const req = httpMock.expectOne(
      `${openWeathermapUrl}geo/1.0/direct?q=${loc}&limit=8&appid=${apiKey}`
    );
    expect(req.request.method).toBe('GET');
  });

  it('should return an weather result', () => {
    service.getWeather(lat, lon).subscribe((result) => {
      expect(result).toBeTruthy();
      console.log('weather result verified');
    });

    const req = httpMock.expectOne(
      `${openWeathermapUrl}data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush({
      coord: {
        lon: -0.1278,
        lat: 51.5074,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02n',
        },
      ],
      base: 'stations',
      main: {
        temp: 283.73,
        feels_like: 283.14,
        temp_min: 281.29,
        temp_max: 285.03,
        pressure: 1006,
        humidity: 88,
      },
      visibility: 10000,
      wind: {
        speed: 2.57,
        deg: 240,
      },
      clouds: {
        all: 20,
      },
      dt: 1679169162,
      sys: {
        type: 2,
        id: 2075535,
        country: 'GB',
        sunrise: 1679119726,
        sunset: 1679162919,
      },
      timezone: 0,
      id: 2643743,
      name: 'London',
      cod: 200,
    });
  });
});
