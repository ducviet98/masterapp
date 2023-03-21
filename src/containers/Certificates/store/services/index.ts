/* eslint-disable */
import { ParamsType } from 'src/containers/Devices/interface';
import AxiosClientInstance from 'src/utils/axios';
import { formatPage } from 'src/utils/formatPage';

export const getCertificateService = async (data: ParamsType) =>
  await AxiosClientInstance.get(
    `/api/certificates?search=${data.search}&limit=${data.rowsPerPage}&offset=${formatPage(data.rowsPerPage, data.page)}&ordering=${data.ordering}`
  );

export const createCertificateService = async (data: any) =>
  await AxiosClientInstance.post(`/api/certificates`, data);

export const deleteCertificateService = async (data: any) =>
  await AxiosClientInstance.delete(`/api/certificates/${data}`);

export const editCertificateService = async (data: any) =>
  await AxiosClientInstance.put(`/api/certificates/${data.id}`, data);

export const getCertificateDetailService = async (id: string) =>
  await AxiosClientInstance.get(`/api/certificates/${id}`);
