import AxiosClientInstance from '../../../../../utils/axios';

export const loginService = async (data: {
  username: string,
  password: string,
}) => {
  return await AxiosClientInstance.post(`/admin/login`, data);
};
