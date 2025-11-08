export interface GetCompanyUserInviteInfoParams {}

export interface GetCompanyUserInviteInfoBody {}

export interface GetCompanyUserInviteInfoQuery {
  token: string;
}

export interface GetCompanyUserInviteInfoResponse {
  userName?: string | null;
  userEmail?: string;
}
