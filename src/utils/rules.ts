import * as yup from 'yup';

export const userSchema = yup.object({
  username: yup
    .string()
    .required('Name required')
    .min(6, 'Length from 6 - 160 characters')
    .max(160, 'Length from 6 - 160 characters'),
  email: yup
    .string()
    .required('Email is required')
    .min(6, 'Length from 6 - 160 characters')
    .max(160, 'Length from 6 - 160 characters')
    .email('Email must be a valid email address'),
  password: yup.string().required('Password is required'),
});

export type UserSchema = yup.InferType<typeof userSchema>;
