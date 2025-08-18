export interface AddServiceParams {}

export interface AddServiceBody {
  serviceCategoryId: string;
  serviceName?: string;
  hourlyRate: number;
  currency: string;
  responseTimeHours?: number;
  projectIds: string[];
}

export interface AddServiceQuery {}

export interface AddServiceResponse {}
