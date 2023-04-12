/* eslint-disable */
import { ParamsType } from 'src/containers/Devices/interface';
import AxiosClientInstance from 'src/utils/axios';
import { formatPage } from 'src/utils/formatPage';

export const getAccessoryInfoService = async (data: ParamsType) =>
  await AxiosClientInstance.get(
    `/api/accessory_info?search=${data.search}&limit=${data.rowsPerPage}&offset=${formatPage(data.rowsPerPage, data.page)}&ordering=${data.ordering}`
  );

export const createAccessoryInfoService = async (data: any) =>
  await AxiosClientInstance.post(`/api/accessory_info`, data);

export const deleteAccessoryInfoService = async (data: any) =>
  await AxiosClientInstance.delete(`/api/accessory_info/${data}`);
