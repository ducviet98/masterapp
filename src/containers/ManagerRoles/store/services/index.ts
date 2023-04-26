/* eslint-disable */
import AxiosClientInstance from 'src/utils/axios';
import { formatPage } from 'src/utils/formatPage';

export const getPermissionService = async () => await AxiosClientInstance.get(`/api/permissions`);

export const getRoleService = async (data: any) => await AxiosClientInstance.get(`/api/roles`);
