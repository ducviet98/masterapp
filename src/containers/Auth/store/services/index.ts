import AxiosClientInstance from 'src/utils/axios';

export const loginService = async (data: {
  username: string;
  password: string;
}) => {
  return await AxiosClientInstance.post(`/admin/login`, data);
};

export const registerService = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return await AxiosClientInstance.post(`/api/auth/register`, data);
};
