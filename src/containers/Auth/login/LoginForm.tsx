import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { createStructuredSelector } from 'reselect';
import omit from 'lodash/omit';

import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { RHFCheckbox } from 'src/hooks/RHFCheckbox';
import Iconify from 'src/components/Iconify';
import { makeSelectIsLoading } from '../store/selectors';
import { userSchema, UserSchema } from 'src/utils/rules';
import { loginRequest } from '../store/actions';
import { path } from 'src/constants/path';

type FormData = Pick<UserSchema, 'email' | 'password' | 'isRemember'>;
const loginSchema = userSchema.pick(['email', 'password', 'isRemember']);

interface IUserType {
  isLoading?: boolean;
}

function LoginForm({ isLoading }: IUserType) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [remember, setRemember] = useState<FormData>({
    email: '',
    password: '',
    isRemember: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const getRemember = () => {
    const data = localStorage.getItem('remember');
    if (data) {
      const rememberFromLs = JSON.parse(data as any);
      setRemember(rememberFromLs);
    }
  };

  const methods = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      isRemember: remember?.isRemember,
    },
  });

  const {
    handleSubmit,
    setValue,
    // eslint-disable-next-line no-empty-pattern
    formState: {},
  } = methods;

  const onSubmit = handleSubmit((data: FormData) => {
    const body = omit(data, ['isRemember']);

    dispatch(
      loginRequest({
        ...body,
        isRemember: data.isRemember,
        callback: () => {
          history.push(path.home);
        },
      })
    );
  });

  useEffect(() => {
    getRemember();
  }, []);

  useEffect(() => {
    if (remember) {
      setValue('email', remember.email);
      setValue('password', remember.password);
      setValue('isRemember', remember.isRemember);
    }
  }, [remember, setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox name="isRemember" label="Remember me" />
        <Link component={RouterLink} variant="subtitle2" to={''}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoading(),
});

export default connect(mapStateToProps)(LoginForm);
