import * as yup from 'yup';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Container, Box, Typography } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { styled } from '@mui/material/styles';

import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import Page from 'src/components/Page';

import reducer from '../../store/reducers';
import saga from '../../store/sagas';
import { makeSelectIsLoadingOrganization } from '../../store/selectors';
import { createOrganizationRequest } from '../../store/actions';

const organizationSchema = yup.object({
  name: yup.string().required('Name of Organization is required !'),
});

interface OrganizationType {
  isLoading: boolean;
}

const CreateOrganization = (props: OrganizationType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useInjectReducer({ key: 'organization', reducer });
  useInjectSaga({ key: 'organization', saga });

  const { isLoading } = props;

  const methods = useForm({
    resolver: yupResolver(organizationSchema),
    defaultValues: {
      name: '',
    },
  });

  const {
    handleSubmit,
    formState: {},
  } = methods;

  const onSubmit = handleSubmit((data) => {
    dispatch(
      createOrganizationRequest({
        name: data.name,
        callback: () => {
          navigate('/');
        },
      })
    );
  });

  return (
    <Page title="Organization">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h2" gutterBottom>
                  Organization
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Enter your name organization below input.
                </Typography>
              </Box>
            </Stack>

            <FormProvider methods={methods} onSubmit={onSubmit}>
              <Stack spacing={3} sx={{ mb: 2 }}>
                <RHFTextField name="name" label="Organization Name" />
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
              >
                Continue
              </LoadingButton>
            </FormProvider>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoadingOrganization(),
});

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
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

export default connect(mapStateToProps)(CreateOrganization);
