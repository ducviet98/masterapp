
import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import FormUser from '../../components/FormUser';
import { getCategoriesRequest, getBrandsRequest, getStatusRequest } from '../../store/actions';
import reducer from '../../store/reducer'
import saga from '../../store/sagas'


const NewDevice = () => {

  useInjectReducer({ key: 'device', reducer });
  useInjectSaga({ key: 'device', saga });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesRequest())
    dispatch(getBrandsRequest())
    dispatch(getStatusRequest())
  }, [dispatch])

  return <Page title="User: Create a new user">
    <Container maxWidth='lg'>
      <HeaderBreadcrumbs
        heading='Create a new device'
        links={[
          { name: 'Dashboard', href: '/' },
          { name: 'devices', href: '/user-device' },
          { name: 'new device' },
        ]}
      />
      <FormUser />
    </Container>
  </Page>
}

export default NewDevice