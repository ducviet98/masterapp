export type IKey = {
  [key: string | number]: string;
};

export type rolesType = {
  created_at: string;
  id: number;
  name: string;
  organization: number;
  permissions: IKey;
  updated_at: string;
};

export interface ManagerRolesType {
  isLoading: boolean;
  total: number;
  permissions: [IKey];
  roles: rolesType[];
}

export interface addRoleType {
  openDialog: boolean;
  handleToggleDialog: () => void;
  roleDetail?: rolesType | null;
}
