import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Mui
import { Button, Container } from '@mui/material';
// Component
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import CookieHandlerInstance from 'src/utils/cookie';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';

import {
  getDetailOrganizationMemberRequest,
  getRoleOrganizationMemberRequest,
  deleteMemberOrganizationRequest,
} from '../../store/actions';
import {
  makeSelectDetailOrganizationMember,
  makeSelectIsLoadingOrganization,
  makeSelectRoleOrganizationMember,
  makeSelectOrganization,
  makeSelectOrganizationMember,
} from '../../store/selectors';
import {
  detailOrganizationType,
  RoleType,
  OrganizationType,
  OrganizationMemberType,
} from '../../interface';
import FormOrganization from '../../components/FormEditOrganization';
import reducer from '../../store/reducers';
import saga from '../../store/sagas';

interface EditMemberOrganizationType {
  isLoading: boolean;
  detailOrganization: detailOrganizationType;
  rolesOrganizations: RoleType[];
  organization: [OrganizationType];
  organizationMember: [OrganizationMemberType];
}

const EditMemberOrganization = (props: EditMemberOrganizationType) => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOrganizations = CookieHandlerInstance.getCookie('current_organizations');

  useInjectReducer({ key: 'organization', reducer });
  useInjectSaga({ key: 'organization', saga });

  const { detailOrganization, organization, organizationMember } = props;

  const { id } = useParams<{
    id: string;
  }>();

  const handleDelete = () => {
    dispatch(
      deleteMemberOrganizationRequest({
        id,
        currentOrganizations,
        organizationMember,
        organization,
        userID: detailOrganization.user,
        callback: () => {
          navigate('/organization');
        },
        callbackOrg: () => {
          navigate('/organization/new');
        },
      })
    );
  };

  useEffect(() => {
    dispatch(getDetailOrganizationMemberRequest(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(
      getRoleOrganizationMemberRequest({
        page: 0,
        rowsPerPage: 10,
        search: '',
        ordering: '',
      })
    );
  }, [dispatch]);

  return (
    <Page title="Organization Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Organization Edit"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Organization', href: '/organization' },
            { name: detailOrganization?.email },
          ]}
          action={
            <Button onClick={handleDelete} variant="contained" sx={{ marginRight: 2 }}>
              Delete
            </Button>
          }
        />
        <FormOrganization />
      </Container>
    </Page>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoadingOrganization(),
  detailOrganization: makeSelectDetailOrganizationMember(),
  rolesOrganizations: makeSelectRoleOrganizationMember(),
  organization: makeSelectOrganization(),
  organizationMember: makeSelectOrganizationMember(),
});

export default connect(mapStateToProps)(EditMemberOrganization);
