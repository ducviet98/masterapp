import { Container, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import FormUser from '../../components/FormDevices';
import reducer from '../../store/reducer';
import saga from '../../store/sagas';
import {
  getBrandsRequest,
  getCategoriesRequest,
  getDeviceDetailRequest,
  getStatusRequest,
} from '../../store/actions';
import {
  makeSelectIsLoading,
  makeSelectDeviceDetail,
} from '../../store/selectors';
import { EditDeviceType } from '../../interface';

const EditDevice = ({ isLoading, deviceDetail }: EditDeviceType) => {
  useInjectReducer({ key: 'device', reducer });
  useInjectSaga({ key: 'device', saga });

  const dispatch = useDispatch();

  const { id } = useParams<{
    id: string;
  }>();

  useEffect(() => {
    dispatch(getDeviceDetailRequest(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getCategoriesRequest());
    dispatch(getBrandsRequest());
    dispatch(getStatusRequest());
  }, [dispatch]);

  return (
    <Page title="User: Edit a new user">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Edit a device"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'devices', href: '/devices' },
            { name: 'Edit device' },
          ]}
        />
        {isLoading ? (
          <Skeleton width="100%" height={500} />
        ) : (
          <FormUser isEdit={true} oldData={deviceDetail} idDevice={id} />
        )}
      </Container>
    </Page>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoading(),
  deviceDetail: makeSelectDeviceDetail(),
});

export default connect(mapStateToProps)(EditDevice);
