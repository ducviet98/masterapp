export interface OrganizationType {
  created_at: string;
  created_by: number;
  id: number;
  name: string;
  updated_at: string;
}

export type OrganizationMemberType = {
  created_at: string;
  email: string;
  id: number;
  role: number;
  updated_at: string;
  user: number;
};

type IKey = {
  [key: number]: string;
};

export interface RoleType {
  created_at: string;
  id: number;
  name: string;
  organization: number;
  permissions: IKey;
  updated_at: string;
}

export interface InviteMemberType {
  openDialog: boolean;
  handleToggleDialog: () => void;
  rolesOrganizations: RoleType[];
  isLoading: boolean;
}

export interface detailOrganizationType {
  created_at: string;
  id: number;
  role: number;
  updated_at: string;
  user: number;
  email: string;
}
