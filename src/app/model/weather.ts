export interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      main: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  name: string;
}
