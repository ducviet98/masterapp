/* eslint-disable */
import AxiosClientInstance from 'src/utils/axios';
import { formatPage } from 'src/utils/formatPage';

export const getPermissionService = async () => await AxiosClientInstance.get(`/api/permissions`);

export const getRoleService = async (data: any) => {
  const { search, ordering, rowsPerPage, page } = data;
  return await AxiosClientInstance.get(
    `/api/roles?search=${search}&ordering=${ordering}&limit=${rowsPerPage}&offset=${formatPage(
      rowsPerPage,
      page
    )}`
  );
};

export const updateRoleService = async (data: any) => {
  return await AxiosClientInstance.patch(`/api/roles/${data.id}`, data);
};

export const createRoleService = async (data: any) =>
  await AxiosClientInstance.post(`/api/roles`, data);

export const deleteRoleService = async (id: number) =>
  await AxiosClientInstance.delete(`/api/roles/${id}`);
