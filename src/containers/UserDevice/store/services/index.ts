import { DeviceUser } from 'src/types/device.types';
import AxiosClientInstance from 'src/utils/axios';

export const getUserDeviceService = async (data: DeviceUser) =>
  await AxiosClientInstance.get(`/admin/users/${data}/device`);
