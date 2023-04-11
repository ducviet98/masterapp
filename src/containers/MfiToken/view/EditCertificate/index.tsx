import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import reducer from 'src/containers/MfiToken/store/reducer';
import saga from 'src/containers/MfiToken/store/sagas';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { getMfiTokenDetailRequest } from '../../store/actions';
import { makeSelectMfiTokenDetail } from '../../store/selectors';
import FormMfiToken from '../../components/FormMfiToken';

const EditCertificate = () => {
  useInjectReducer({ key: 'mfiToken', reducer });
  useInjectSaga({ key: 'mfiToken', saga });

  const mfiDetail = useSelector(makeSelectMfiTokenDetail());

  const { id } = useParams<{
    id: string;
  }>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMfiTokenDetailRequest(id));
  }, [dispatch, id]);

  return (
    <Page title="MFI Token: Edit MFI Token">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Edit MFI Token"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'MFI Tokens', href: '/mfi-token' },
            { name: mfiDetail?.name },
          ]}
        />
        <FormMfiToken isEdit={true} oldData={mfiDetail} idDevice={id} />
      </Container>
    </Page>
  );
};

export default EditCertificate;
