export interface IWeatherAlert {
  /** Alert headline provided by the issuing authority (e.g., "Heavy Rain Warning"). */
  headline?: string;

  /** Type of message issued (e.g., "Alert", "Update", "Cancel"). */
  msgtype?: string;

  /** Severity of the weather alert as reported (e.g., "Moderate", "Severe"). */
  severity?: string;

  /** Level of urgency for the alert (e.g., "Immediate", "Expected", "Future"). */
  urgency?: string;

  /** Regions or areas affected by the alert, usually comma-separated. */
  areas?: string;

  /** Category of hazard or event (e.g., "Met", "Geo", "Safety"). */
  category?: string;

  /** Level of certainty for the alert (e.g., "Likely", "Possible", "Observed"). */
  certainty?: string;

  /** Name or type of the weather event (e.g., "Thunderstorm", "Flood Warning"). */
  event?: string;

  /** Optional notes or context included by the issuing organization. */
  note?: string;

  /** ISO 8601 timestamp indicating when the alert becomes effective. */
  effective?: string;

  /** ISO 8601 timestamp indicating when the alert will expire. */
  expires?: string;

  /** Detailed description of the weather event, including potential impacts. */
  desc?: string;

  /** Official safety instructions or guidance for the public. */
  instruction?: string;
}
