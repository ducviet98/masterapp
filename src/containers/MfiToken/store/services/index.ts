/* eslint-disable */
import { ParamsType } from 'src/containers/Devices/interface';
import AxiosClientInstance from 'src/utils/axios';
import { formatPage } from 'src/utils/formatPage';

export const getMfiTokenService = async (data: ParamsType) =>
  await AxiosClientInstance.get(
    `/api/mfi-token?search=${data.search}&limit=${data.rowsPerPage}&offset=${formatPage(data.rowsPerPage, data.page)}&ordering=${data.ordering}`
  );

export const createMfiTokenService = async (data: any) =>
  await AxiosClientInstance.post(`/api/mfi-token`, data);

export const deleteMfiTokenService = async (data: any) =>
  await AxiosClientInstance.delete(`/api/mfi-token/${data}`);

export const editMfiTokenService = async (data: any) =>
  await AxiosClientInstance.put(`/api/mfi-token/${data.id}`, data);

export const getMfiTokenDetailService = async (id: string) =>
  await AxiosClientInstance.get(`/api/mfi-token/${id}`);
