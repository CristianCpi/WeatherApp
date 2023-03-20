import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { SearchWeatherComponent } from './search-weather.component';
import { FetchWeatherService } from 'src/app/service/fetch-weather.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CityListComponent } from '../city-list/city-list.component';

fdescribe('SearchWeatherComponent', () => {
  let component: SearchWeatherComponent;
  let fixture: ComponentFixture<SearchWeatherComponent>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj<FetchWeatherService>([
      'getCities',
    ]);
    weatherServiceSpy.getCities.and.callFake(function () {
      return of([
        {
          name: 'London',
          lat: '51.5073219',
          lon: '-0.1276474',
          country: 'GB',
          state: 'England',
        },
        {
          name: 'City of London',
          lat: '51.5156177',
          lon: '-0.0919983',
          country: 'GB',
          state: 'England',
        },
        {
          name: 'London',
          lat: '42.9832406',
          lon: '-81.243372',
          country: 'CA',
          state: 'Ontario',
        },
        {
          name: 'Chelsea',
          lat: '51.4875167',
          lon: '-0.1687007',
          country: 'GB',
          state: 'England',
        },
        {
          name: 'London',
          lat: '37.1289771',
          lon: '-84.0832646',
          country: 'US',
          state: 'Kentucky',
        },
      ]);
    });

    await TestBed.configureTestingModule({
      declarations: [SearchWeatherComponent, CityListComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: FetchWeatherService,
          useValue: weatherServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch cities', fakeAsync(() => {
    component.searchCities('London');
    tick();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  }));
});
