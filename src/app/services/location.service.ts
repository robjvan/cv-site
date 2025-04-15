import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserLocation } from '../models/user-location.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  public location$ = new BehaviorSubject<IUserLocation | undefined>(undefined);
  public locationAllowed$ = new BehaviorSubject<boolean>(false);

  public getUserLocation() {
    console.debug('[LocationService] Determining user location...');

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
          console.debug('[LocationService] Location determined:', coords);
        },
        (err: GeolocationPositionError) => {
          this.setLocationAllowed(false);
          console.error(
            '[LocationService] Error getting location:',
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

  public setLocationAllowed(value: boolean) {
    this.locationAllowed$.next(value);
  }
}
