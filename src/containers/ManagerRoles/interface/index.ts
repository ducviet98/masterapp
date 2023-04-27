export type IKey = {
  [key: string | number]: string;
};

export type RolesType = {
  created_at: string;
  id: number;
  name: string;
  organization: number;
  permissions: IKey;
  updated_at: string;
};

export interface IManagerRoles {
  isLoading: boolean;
  total: number;
  permissions: [IKey];
  roles: RolesType[];
}

export interface IAddRole {
  openDialog: boolean;
  handleToggleDialog: () => void;
  roleDetail?: RolesType | null;
}
