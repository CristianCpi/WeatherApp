import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchWeatherComponent } from './component/search-weather/search-weather.component';
import { CurrentWeatherComponent } from './component/current-weather/current-weather.component';

const routes: Routes = [
  {
    path: 'weather/:lat/:lon',
    component: CurrentWeatherComponent,
  },
  {
    path: '',
    component: SearchWeatherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
