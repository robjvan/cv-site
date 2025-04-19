import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserLocation } from '../models/user-location.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  public location$: BehaviorSubject<IUserLocation | undefined> =
    new BehaviorSubject<IUserLocation | undefined>(undefined);

  public locationAllowed$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public processUserLocation(): void {
    if (!navigator.geolocation) {
      console.warn(
        '[LocationService] Geolocation is not supported by this browser.'
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.setLocationAllowed(true);
          const coords: IUserLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          this.location$.next(coords);
        },
        (err: GeolocationPositionError) => {
          this.setLocationAllowed(false);
          console.warn(
            'Please allow location permissions to fetch latest weather data!',
            err.message
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    }
  }

  public setLocationAllowed(value: boolean): void {
    this.locationAllowed$.next(value);
  }
}
