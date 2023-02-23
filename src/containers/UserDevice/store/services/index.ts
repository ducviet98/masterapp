import { ParamsType } from 'src/types/device.types';
import AxiosClientInstance from 'src/utils/axios';

export const getUserDeviceService = async (data: ParamsType) =>
  await AxiosClientInstance.get(`/api/devices?search=${data.search}&limit=${data.rowsPerPage}&offset=${data.page}`);

export const getBrandsService = async () =>
  await AxiosClientInstance.get(`/api/brands`);

export const getCategoriesService = async () =>
  await AxiosClientInstance.get(`/api/categories`);

export const getStatusService = async () =>
  await AxiosClientInstance.get(`/api/status`);

export const createDeviceService = async (data: any) =>
  await AxiosClientInstance.post(`/api/devices`, data);