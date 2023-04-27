/* eslint-disable */
import AxiosClientInstance from 'src/utils/axios';
import { formatPage } from 'src/utils/formatPage';

export const getPermissionService = async () => await AxiosClientInstance.get(`/api/permissions`);

export const getRoleService = async (data: any) =>
  await AxiosClientInstance.get(
    `/api/roles?search=${data.search}&ordering=${data.ordering}&limit=${data.rowsPerPage}&offset=${formatPage(
      data.rowsPerPage,
      data.page
    )}`
  );

export const updateRoleService = async (data: any) => {
  return await AxiosClientInstance.patch(`/api/roles/${data.id}`, data);
};

export const createRoleService = async (data: any) =>
  await AxiosClientInstance.post(`/api/roles`, data);

export const deleteRoleService = async (id: number) =>
  await AxiosClientInstance.delete(`/api/roles/${id}`);
