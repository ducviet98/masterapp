import { Box, Card, Container, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import Image from 'src/components/Logo';
import Page from 'src/components/Page';
import { path } from 'src/constants/path';
import useResponsive from 'src/hooks/useResponsive';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import LoginForm from './LoginForm';
import reducer from '../store/reducer';
import saga from '../store/sagas';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <Image
              visibleByDefault
              disabledEffect
              src="/illustration_login.png"
              alt="login"
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Sign in to Master
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Enter your details below.
                </Typography>
              </Box>
            </Stack>
            <LoginForm />

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?{' '}
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={path.register}
              >
                Get started
              </Link>
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
