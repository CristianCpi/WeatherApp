import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityListComponent } from './city-list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('CityListComponent', () => {
  let component: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show cities', () => {
    component.cities = [
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
    ];

    fixture.detectChanges();
    const element: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.cities')
    );
    expect(element.length).toEqual(5);
    element.forEach((obj: DebugElement, index: number) => {
      expect(obj.children[0].nativeElement.innerHTML.trim()).toEqual(
        component.cities[index].name
      );
    });
  });
});
