import apiClient from './axios';
import type {
  OrganizationListItem,
  OrganizationDetail,
  GenerateCredentialsResponse,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
} from '@/types/organization.types';

export const getOrganizations = async (): Promise<OrganizationListItem[]> => {
  const { data } = await apiClient.get<OrganizationListItem[]>('/orgs');
  return data;
};

export const searchOrganizations = async (query: string): Promise<OrganizationListItem[]> => {
  const { data } = await apiClient.get<OrganizationListItem[]>('/orgs/search', { params: { q: query } });
  return data;
};

export const generateCredentials = async (orgName: string): Promise<GenerateCredentialsResponse> => {
  const { data } = await apiClient.get<GenerateCredentialsResponse>('/orgs/generate-credentials', { params: { orgName } });
  return data;
};

export const getOrganizationById = async (id: number): Promise<OrganizationDetail> => {
  const { data } = await apiClient.get<OrganizationDetail>(`/orgs/${id}`);
  return data;
};

export const createOrganization = async (
  payload: CreateOrganizationRequest,
): Promise<OrganizationDetail> => {
  const { data } = await apiClient.post<OrganizationDetail>('/orgs', payload);
  return data;
};

export const updateOrganization = async (
  id: number,
  payload: UpdateOrganizationRequest,
): Promise<OrganizationDetail> => {
  const { data } = await apiClient.put<OrganizationDetail>(`/orgs/${id}`, payload);
  return data;
};

export const deleteOrganization = async (id: number): Promise<void> => {
  await apiClient.delete(`/orgs/${id}`);
};
