export interface UpdateAvailabilityParams {}

export interface UpdateAvailabilityBody {
  weeklyCommitment?: number;
  largerOpportunities?: "yes" | "maybe" | "no";
  hourlyRate?: number;
  currency?: string;
}

export interface UpdateAvailabilityQuery {}

export interface UpdateAvailabilityResponse {}
