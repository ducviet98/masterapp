/* eslint-disable */
import AxiosClientInstance from 'src/utils/axios';
import { formatPage } from 'src/utils/formatPage';

export const getOrganizationService = async () =>
  await AxiosClientInstance.get(`/api/organizations`);

export const createOrganizationService = async (name: string) => {
  return await AxiosClientInstance.post('/api/organizations', { name });
};

export const getOrganizationMemberService = async (data: any) => {
  return await AxiosClientInstance.get(
    `/api/organization-member?ordering=${data.ordering}&search=${data.search}&limit=${
      data.rowsPerPage
    }&offset=${formatPage(data.rowsPerPage, data.page)}`
  );
};

export const getRoleOrganizationService = async () => {
  return await AxiosClientInstance.get(`/api/roles?limit=20&offset=0`);
};
