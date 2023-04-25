import * as yup from 'yup';

export const headersTable = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'user',
    label: 'User ID',
  },
  {
    id: 'created_at',
    label: 'Created at',
  },
  {
    id: 'updated_at',
    label: 'Updated at',
  },
];

export const FILTER_OPTIONS = [
  'name',
  'created_at',
  'updated_at',
];

export const InviteMemberSchema = yup.object().shape({
  email: yup.string().required('You must enter an e-mail').email('You must enter a valid e-mail.'),
});