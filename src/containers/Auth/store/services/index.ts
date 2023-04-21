/* eslint-disable */
import AxiosClientInstance from 'src/utils/axios';

export const loginService = async (data: { email: string; password: string }) => {
  return await AxiosClientInstance.post(`/api/auth/login`, data);
};

export const registerService = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => {
  return await AxiosClientInstance.post(`/api/auth/register`, data);
};

export const refreshTokenService = async (data: { refresh: string }) => {
  return await AxiosClientInstance.post(`/api/auth/refresh-token`, {
    refresh: data,
  });
};
