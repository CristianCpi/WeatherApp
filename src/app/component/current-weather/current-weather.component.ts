import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { Weather } from 'src/app/model/weather';
import { FetchWeatherService } from 'src/app/service/fetch-weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  private destroy$ = new Subject<void>();
  public weather = {} as Weather;

  private routeSub: Subscription | undefined;
  public lat = '';
  public lon = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public weatherService: FetchWeatherService
  ) {}

  public ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.lat = params['lat'];
      this.lon = params['lon'];
    });

    this.weatherService.getWeather(this.lat, this.lon).subscribe(
      (weather) => {
        this.weather = weather;
      },
      (err) => {
        if (err.error && err.error.message) {
          alert(err.error.message);
          return;
        }
        alert('Failed to get weather.');
      },
      () => {}
    );
  }

  public returnToSearch(): void {
    this.router.navigate(['/']);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
