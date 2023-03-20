import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchWeatherComponent } from './component/search-weather/search-weather.component';
import { CurrentWeatherComponent } from './component/current-weather/current-weather.component';
import { CityListComponent } from './component/city-list/city-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchWeatherComponent,
    CurrentWeatherComponent,
    CityListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
