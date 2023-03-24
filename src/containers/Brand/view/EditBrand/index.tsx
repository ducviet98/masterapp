import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import reducer from 'src/containers/Brand/store/reducer';
import saga from 'src/containers/Brand/store/sagas';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { getBrandDetailRequest } from '../../store/actions';
import { makeSelectBrandDetail } from '../../store/selectors';
import FormBrand from '../../components/FormBrand/index';

const EditBrand = () => {
  useInjectReducer({ key: 'brand', reducer });
  useInjectSaga({ key: 'brand', saga });

  const brandDetail = useSelector(makeSelectBrandDetail());

  console.log('brandDetail', brandDetail);


  const { id } = useParams<{
    id: string;
  }>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrandDetailRequest(id));
  }, [dispatch, id]);

  return (
    <Page title="Brand: Edit Brand">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Edit Brand"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Brands', href: '/brand' },
            { name: brandDetail.name },
          ]}
        />
        <FormBrand isEdit={true} oldData={brandDetail} idDevice={id} />
      </Container>
    </Page>
  );
};

export default EditBrand;
