export interface UpdateServiceParams {}

export interface UpdateServiceBody {
  serviceName?: string;
  hourlyRate?: number;
  currency?: string;
  responseTimeHours?: number | null;
  projectIds?: string[];
}

export interface UpdateServiceQuery {}

export interface UpdateServiceResponse {}
