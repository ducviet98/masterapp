/* eslint-disable */
import { ParamsType } from 'src/containers/Devices/interface';
import AxiosClientInstance from 'src/utils/axios';
import { formatPage } from 'src/utils/formatPage';

export const getUserDeviceService = async (data: ParamsType) => await AxiosClientInstance.get(
  `/api/devices?search=${data.search}&limit=${data.rowsPerPage}&offset=${formatPage(data.rowsPerPage, data.page)}`
)

export const getBrandsService = async () =>
  await AxiosClientInstance.get(`/api/brands`);

export const getCategoriesService = async () =>
  await AxiosClientInstance.get(`/api/categories`);

export const getStatusService = async () =>
  await AxiosClientInstance.get(`/api/status`);

export const createDeviceService = async (data: any) =>
  await AxiosClientInstance.post(`/api/devices`, data);

export const deleteDeviceService = async (data: any) =>
  await AxiosClientInstance.delete(`/api/devices/${data}`);

export const editDeviceService = async (data: any) =>
  await AxiosClientInstance.put(`/api/devices/${data.idDevice}`, data);

export const getDeviceDetailService = async (id: string) =>
  await AxiosClientInstance.get(`/api/devices/${id}`);
