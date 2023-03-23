/* eslint-disable */
import { ParamsType } from 'src/containers/Devices/interface';
import AxiosClientInstance from 'src/utils/axios';
import { formatPage } from 'src/utils/formatPage';

export const getBrandService = async (data: ParamsType) =>
  await AxiosClientInstance.get(
    `/api/brands?search=${data.search}&limit=${data.rowsPerPage}&offset=${formatPage(data.rowsPerPage, data.page)}&ordering=${data.ordering}`
  );

export const createBrandService = async (data: any) =>
  await AxiosClientInstance.post(`/api/brands`, data);

export const deleteBrandService = async (data: any) =>
  await AxiosClientInstance.delete(`/api/brands/${data}`);

export const editBrandService = async (data: any) =>
  await AxiosClientInstance.put(`/api/brands/${data.id}`, data);

export const getBrandDetailService = async (id: string) =>
  await AxiosClientInstance.get(`/api/brands/${id}`);
