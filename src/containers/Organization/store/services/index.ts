/* eslint-disable */
import { ParamsType } from 'src/containers/Devices/interface';
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

export const getRoleOrganizationService = async (data: ParamsType) => {
  return await AxiosClientInstance.get(
    `/api/roles?search=${data.search}&limit=${data.rowsPerPage}&offset=${formatPage(
      data.rowsPerPage,
      data.page
    )}&ordering=${data.ordering}`
  );
};

export const inviteOrganizationMemberService = async (data: any) => {
  return await AxiosClientInstance.post(`/api/organization-member`, data);
};

export const getDetailOrganizationMemberService = async (id: number) => {
  return await AxiosClientInstance.get(`/api/organization-member/${id}`);
};

export const deleteMemberOrganizationService = async (id: number) => {
  return await AxiosClientInstance.delete(`/api/organization-member/${id}`);
};

export const updateMemberOrganizationService = async (data: any) => {
  return await AxiosClientInstance.put(`/api/organization-member/${data.id}`, data);
};
