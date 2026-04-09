export interface OrganizationListItem {
  sn: number;
  orgName: string;
  palika: string | null;
  email: string | null;
  mobile: string | null;
  telNo: string | null;
  active: boolean;
}

export interface GenerateCredentialsResponse {
  orgCode: string;
  orgPassword: string;
}

export interface OrganizationDetail {
  sn: number;
  date: string;
  orgName: string;
  dbName: string;
  palika: string | null;
  wardNo: number | null;
  telNo: string | null;
  mobile: string | null;
  email: string | null;
  qty: number | null;
  orgCode: string;
  orgPassword: string;
  active: boolean;
}

export interface CreateOrganizationRequest {
  orgName: string;
  dbName: string;
  palika?: string;
  wardNo?: number;
  telNo?: string;
  mobile?: string;
  email?: string;
  qty?: number;
  orgCode: string;
  orgPassword: string;
  active: boolean;
}

export interface UpdateOrganizationRequest extends CreateOrganizationRequest {}
