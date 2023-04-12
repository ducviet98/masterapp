export interface IDeviceItem {
  brand: number;
  brand_name: string;
  category: number;
  category_name: string;
  created_at: string;
  description: string;
  id: number;
  model_number: string;
  name: string;
  ppid: string;
  status: number;
  status_name: string;
  upc: string;
  updated_at: string;
}

export type Key = {
  [key: string]: string;
};

export interface DeviceDetailType {
  id: number;
  brand_name: string;
  category_name: string;
  status_name: string;
  name: string;
  description: string;
  model_number: string;
  upc: string;
  ppid: string;
  created_at: string;
  updated_at: string;
  brand: number;
  category: number;
  status: number;
  certificate: string;
}

export interface EditDeviceType {
  isLoading: boolean;
  deviceDetail: DeviceDetailType;
}

export interface FormUserType {
  isEdit: boolean;
  oldData?: DeviceDetailType;
  idDevice?: string;
}

export type BrandType = {
  id: number,
  name: string,
  created_at: string,
  updated_at: string
}

export interface DeviceUser {
  id: string;
  user: string;
  device_name: string;
  description: string;
  phoneNumber: string;
  brand: string;
  upc: string;
  category: string;
  ppid: string;
  createdAt: string;
  updatedAt: string;
}

export type ParamsType = {
  page: number,
  rowsPerPage: number,
  search: string,
  ordering?: string
}
