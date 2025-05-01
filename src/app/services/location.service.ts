import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserLocation } from '../models/user-location.interface';

/**
 * LocationService manages access to the user's geolocation data
 * using the browser's built-in `navigator.geolocation` API.
 *
 * It exposes reactive streams for both the user's coordinates and
 * permission status, making it easy to consume in components or other services.
 */
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  /**
   * BehaviorSubject stream emitting the user's current latitude and longitude.
   * Emits `undefined` if not yet retrieved or denied.
   */
  public location$: BehaviorSubject<IUserLocation | undefined> =
    new BehaviorSubject<IUserLocation | undefined>(undefined);

  /**
   * BehaviorSubject that tracks whether the user has granted geolocation permissions.
   */
  public locationAllowed$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  /**
   * Attempts to retrieve the user's current position via `navigator.geolocation`.
   * Emits the user's coordinates and sets permission state accordingly.
   *
   * If location access is denied or not supported, the appropriate fallback behavior is triggered.
   */
  public processUserLocation(): void {
    if (!navigator.geolocation) {
      console.warn(
        '[LocationService] Geolocation is not supported by this browser.'
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          // Permission granted - emit location
          this.setLocationAllowed(true);

          const coords: IUserLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          this.location$.next(coords);
        },
        (err: GeolocationPositionError) => {
          // Permission denied or error occurred
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

  /**
   * Manually sets the permission state for location usage.
   *
   * @param value - `true` if user has granted permission, `false` otherwise.
   */
  public setLocationAllowed(value: boolean): void {
    this.locationAllowed$.next(value);
  }
}
