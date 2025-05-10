import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserLocation } from '../models/user-location.interface';

/**
 * Manages access to the user's geolocation data using the browser's built-in `navigator.geolocation` API.
 *
 * This service provides reactive streams for both the user's coordinates and permission status, making it
 * easy to consume in components or other services. It ensures a smooth and user-friendly experience by handling potential
 * errors and providing fallback behaviors.
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
          // If location permission has been granted, emit the user's coordinates and set the locationAllowed state to true.
          this.setLocationAllowed(true);

          // Create a IUserLocation object with the user's latitude and longitude.
          const coords: IUserLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          // Emit the coordinates via the location$ subject.  This triggers any subscribers to this stream.
          this.location$.next(coords);
        },
        (err: GeolocationPositionError) => {
          // Handle permission denied or error occurred.
          this.setLocationAllowed(false);
          console.warn(
            'Please allow location permissions to fetch latest weather data!',
            err.message
          );
        },
        {
          enableHighAccuracy: true, // Use high accuracy geolocation.
          timeout: 10000, // Timeout after 10 seconds.
          maximumAge: 60000, // Maximum age of cached position data (60 seconds).
        }
      );
    }
  }

  /**
   * Manually sets the permission state for location usage.
   *
   * @param {boolean} value - `true` if user has granted permission, `false` otherwise.
   */
  public setLocationAllowed(value: boolean): void {
    this.locationAllowed$.next(value);
  }
}
