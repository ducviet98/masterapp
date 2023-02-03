import AxiosClientInstance from '../../../../../utils/axios';

export const loginService = async (data: {
  username: string,
  password: string,
}) => {
  return await AxiosClientInstance.post(`/admin/login`, data);
};

export const refreshTokenService = async (data: {
  refreshToken: string
}) => {
  return await AxiosClientInstance.post(`/auth/refresh-token`, data);
};

