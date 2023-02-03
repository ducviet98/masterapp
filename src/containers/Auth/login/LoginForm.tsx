import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
// hooks
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { RHFCheckbox } from 'src/hooks/RHFCheckbox';
import { useDispatch } from 'react-redux';
import AppleSignin from 'react-apple-signin-auth';
import axios from 'axios';
import { appleAuthHelpers } from 'react-apple-signin-auth';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};

export default function LoginForm() {

  const dispatch = useDispatch()

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

  const handleLogin = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const data = await axios.get(`https://appleid.apple.com/auth/authorize?client_id=B4FK658ZHJ.com.domainname.appname.side&redirect_uri=https://cd70-171-252-130-52.ngrok.io/login&response_type=code id_token&state=&scope=email name&response_mode=form_post`,{
        headers
      })
      console.log('data', data);

    } catch (error) {
      console.log('error', error);
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
      <AppleSignin
        /** Auth options passed to AppleID.auth.init() */
        authOptions={{
          clientId: 'B4FK658ZHJ.com.domainname.appname.side',
          scope: 'email name',
          redirectURI: 'https://cd70-171-252-130-52.ngrok.io/login',
          state: '',
          nonce: 'nonce',
          usePopup: true,
        }}
        /** General props */
        uiType="light"
        /** className */
        className="apple-auth-btn"
      />

      <button onClick={handleLogin}>Login</button>


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
