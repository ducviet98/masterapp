import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { useState } from 'react';
import AppleSignin from 'react-apple-signin-auth';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { RHFCheckbox } from 'src/hooks/RHFCheckbox';
import CookieHandlerInstance from 'src/utils/cookie';
import Iconify from '../../../components/Iconify';

type FormValuesProps = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};

export default function LoginForm() {

  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
    remember: true,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {

    try {
      history.push('/')
    } catch (error) {
      console.error(error);
      reset();
    }
  };

  const handleLogin = (response: any) => {
    if (response.authorization.id_token) {
      CookieHandlerInstance.setCookie('token', response.authorization.id_token);
      history.push('/')
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <div>or</div>
      <AppleSignin
        authOptions={{
          clientId: 'B4FK658ZHJ.com.domainname.appname.side',
          scope: 'email name',
          redirectURI: window.location.href,
          state: '',
          nonce: 'nonce',
          usePopup: true,
        }}
        uiType="dark"
        className="apple-auth-btn"
        noDefaultStyle={false}
        buttonExtraChildren="Continue with Apple"
        onSuccess={(response: any) => handleLogin(response)}
        onError={(error: any) => console.error(error)}
        skipScript={false}
        iconProp={{ style: { marginTop: '10px' } }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link component={RouterLink} variant="subtitle2" to={''}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
