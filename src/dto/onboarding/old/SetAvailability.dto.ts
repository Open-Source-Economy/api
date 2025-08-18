export interface SetAvailabilityParams {}

export interface SetAvailabilityBody {
  weeklyCommitment: number;
  largerOpportunities: "yes" | "maybe" | "no";
  hourlyRate: number;
  currency: string;
}

export interface SetAvailabilityQuery {}

export interface SetAvailabilityResponse {}
