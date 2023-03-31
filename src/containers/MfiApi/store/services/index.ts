/* eslint-disable */
import { ParamsType } from 'src/containers/Devices/interface';
import AxiosClientInstance from 'src/utils/axios';
import { formatPage } from 'src/utils/formatPage';

export const getMfiApiService = async (data: ParamsType) =>
  await AxiosClientInstance.get(
    `/api/mfi-api?search=${data.search}&limit=${data.rowsPerPage}&offset=${formatPage(data.rowsPerPage, data.page)}&ordering=${data.ordering}`
  );

export const createMfiApiService = async (data: any) =>
  await AxiosClientInstance.post(`/api/mfi-api`, data);

export const deleteMfiApiService = async (data: any) =>
  await AxiosClientInstance.delete(`/api/mfi-api/${data}`);

export const editMfiApiService = async (data: any) =>
  await AxiosClientInstance.put(`/api/mfi-api/${data.id}`, data);

export const getMfiApiDetailService = async (id: string) =>
  await AxiosClientInstance.get(`/api/mfi-api/${id}`);

export const requestMfiApiService = async (data: any) =>
  await AxiosClientInstance.post(`/api/mfi-api/request`, data);
