import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject,
  tick,
} from '@angular/core/testing';

import { of } from 'rxjs';

import { CurrentWeatherComponent } from './current-weather.component';
import { FetchWeatherService } from 'src/app/service/fetch-weather.service';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchWeatherComponent } from '../search-weather/search-weather.component';
import { Router } from '@angular/router';

fdescribe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let landingFixture: ComponentFixture<SearchWeatherComponent>;
  let router: Router;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj<FetchWeatherService>([
      'getWeather',
    ]);
    weatherServiceSpy.getWeather.and.callFake(function () {
      return of({
        coord: {
          lon: -0.1278,
          lat: 51.5074,
        },
        main: {
          temp: 283.73,
          feels_like: 283.14,
          temp_min: 281.29,
          temp_max: 285.03,
          pressure: 1006,
          humidity: 88,
        },
        name: 'London',
      });
    });

    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent, SearchWeatherComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: FetchWeatherService,
          useValue: weatherServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display weather', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component).toBeTruthy();

    expect(fixture.debugElement.query(By.css('#name'))).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('#name')).nativeElement.textContent
    ).toBe('Weather in London');

    expect(fixture.debugElement.query(By.css('#temp'))).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('#temp')).nativeElement.textContent
    ).toBe('Current temp: 283.73');
  }));

  it('should navigate back to search', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.returnToSearch();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
