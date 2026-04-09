import apiClient from './axios';

export const getDatabases = async (): Promise<string[]> => {
  const { data } = await apiClient.get<string[]>('/system/databases');
  return data;
};
