import * as Yup from 'yup';

export const headersTable = [
  {
    id: 'name',
    label: 'Role Name',
  },
  {
    id: 'permissions',
    label: 'Permissions',
  },
  {
    id: 'created_at',
    label: 'Created at',
  },
  {
    id: 'updated_at',
    label: 'Updated at',
  },
  {
    id: 'action',
    label: 'Action',
  },
];

export const AddRoleSchema: any = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  permissions: Yup.array().min(1, 'You must select role'),
});

export const FILTER_OPTIONS = [
  'name',
  'created_at',
  'updated_at',
];