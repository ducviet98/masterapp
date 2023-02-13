import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { userSchema, UserSchema } from 'src/utils/rules';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import Iconify from 'src/components/Iconify';
import Logo from 'src/components/Logo';
import Image from 'src/components/Logo';
import Page from 'src/components/Page';
import useResponsive from 'src/hooks/useResponsive';
import { path } from 'src/constants/path';

import reducer from '../store/reducer';
import saga from '../store/sagas';
import { registerRequest } from '../store/actions';
import { makeSelectIsLoading } from '../store/selectors';
import { ContentStyle, HeaderStyle, RootStyle, SectionStyle } from './styles';

type FormData = Pick<
  UserSchema,
  'first_name' | 'last_name' | 'email' | 'password'
>;
const registerSchema = userSchema.pick([
  'first_name',
  'last_name',
  'email',
  'password',
]);

interface IUserType {
  isLoading?: boolean;
}

function RegisterContainer({ isLoading }: IUserType) {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const methods = useForm<FormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    reset,
    // eslint-disable-next-line no-empty-pattern
    formState: {},
  } = methods;

  const onSubmit = handleSubmit((data) => {
    dispatch(
      registerRequest({
        ...data,
        callback: () => {
          history.push(path.login);
          reset();
        },
      })
    );
  });

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account?
              <Link variant="subtitle2" component={RouterLink} to={path.login}>
                {' '}
                Login
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Manage the job more effectively with Minimal
            </Typography>
            <Image
              visibleByDefault
              disabledEffect
              alt="register"
              src="/assets/illustrations/illustration_register.png"
            />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Get started absolutely free.
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Free forever. No credit card needed.
                </Typography>
              </Box>
            </Box>

            <FormProvider methods={methods} onSubmit={onSubmit}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <RHFTextField name="first_name" label="First name" />
                  <RHFTextField name="last_name" label="Last name" />
                </Stack>

                <RHFTextField name="email" label="Email address" />

                <RHFTextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Iconify
                            icon={
                              showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                >
                  Register
                </LoadingButton>
              </Stack>
            </FormProvider>

            <Typography
              variant="body2"
              align="center"
              sx={{ color: 'text.secondary', mt: 3 }}
            >
              By registering, I agree to Minimal&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link
                  variant="subtitle2"
                  to={path.login}
                  component={RouterLink}
                >
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoading(),
});

export default connect(mapStateToProps)(RegisterContainer);
