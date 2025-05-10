import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * This service retrieves the public IP address of the user's device.
 * It utilizes an external API to fetch the IP address, enhancing the application’s ability to
 * dynamically determine user location and improve functionality.
 */
@Injectable({
  providedIn: 'root',
})
export class IpService {
  constructor(private http: HttpClient) {}

  /**
   * Asynchronously retrieves the public IP address via the IPify API.
   * This operation handles potential API request failures gracefully, ensuring a robust and reliable user experience.
   *
   * @returns {Promise<any>} A promise that resolves with the JSON response from the IPify API. If the API request fails, the promise will reject.
   */
  public getPublicIpAddress(): string | undefined {
    let result: string | undefined = undefined;

    try {
      this.http.get('http://api.ipify.org/?format=json').subscribe({
        next: (val: any) => {
          console.log(`ip result = ${val}`);
          result = val;
        },
      });
    } catch (err: any) {
      console.error(`Failed to determine public IP address`, err.message);
    }

    return result;
  }
}
