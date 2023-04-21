/* eslint-disable */
import AxiosClientInstance from 'src/utils/axios';
import { formatPage } from 'src/utils/formatPage';

export const getOrganizationService = async () =>
  await AxiosClientInstance.get(`/api/organizations`);

export const createOrganizationService = async (name: string) => {
  return await AxiosClientInstance.post('/api/organizations', { name });
};
