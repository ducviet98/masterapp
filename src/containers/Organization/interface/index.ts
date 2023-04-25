export interface OrganizationType {
  created_at: string;
  created_by: number;
  id: number;
  name: string;
  updated_at: string;
}

export interface OrganizationMemberType {
  created_at: string;
  id: number;
  role: number;
  updated_at: string;
  user: number;
}

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
  organization_id: string;
  isLoading: boolean;
}

export interface detailOrganizationType {
  created_at: string;
  id: number;
  role: number;
  updated_at: string;
  user: number;
}
