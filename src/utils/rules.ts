import * as yup from 'yup';

export const userSchema = yup.object({
  first_name: yup
    .string()
    .matches(/^\S*$/, 'First name without spaces')
    .required('First name is required'),
  last_name: yup
    .string()
    .matches(/^\S*$/, 'Last name without spaces')
    .required('Last name is required'),
  email: yup
    .string()
    .matches(/^\S*$/, 'Email without spaces')
    .required('Email is required')
    .email('Email must be a valid email address'),
  password: yup
    .string()
    .matches(/^\S*$/, 'Password without spaces')
    .required('Password is required'),
  isRemember: yup.boolean(),
});

export type UserSchema = yup.InferType<typeof userSchema>;
