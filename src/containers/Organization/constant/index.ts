import * as yup from 'yup';

export const headersTable = [
  {
    id: 'email',
    label: 'Email',
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
  {
    id: 'action',
    label: 'Action',
  },
];

export const FILTER_OPTIONS = [
  'email',
  'created_at',
  'updated_at',
];

export const InviteMemberSchema = yup.object().shape({
  email: yup.string().required('You must enter an e-mail').email('You must enter a valid e-mail.'),
});