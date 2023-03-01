import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Label from 'src/components/Label';
import { TableComp } from 'src/components/table';
import { DeviceUser } from 'src/containers/Devices/interface';
import { usePagination } from 'src/hooks/usePagination';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { MenuUserAction } from './components/MenuUserAction';
import { headersTable } from './constants';
import { deleteDeviceRequest, getUserDeviceRequest } from './store/actions';
import reducer from './store/reducer';
import saga from './store/sagas';
import {
  makeSelectIsLoading,
  makeSelectListDevice,
  makeSelectTotalUsers,
  makeSelectUserDevice
} from './store/selectors';

interface IUserDeviceType {
  isLoading?: boolean;
  listDevice: DeviceUser[];
  total: number;
}

const UserDeviceContainer = ({
  isLoading,
  listDevice,
  total,
}: IUserDeviceType) => {
  useInjectReducer({ key: 'device', reducer });
  useInjectSaga({ key: 'device', saga });

  const {
    debouncedSearchTerm,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderBodyTable = () => listDevice?.map((row: any) => ({
    id: <Typography variant="subtitle2" noWrap>{row.id}</Typography>,
    name: row.name,
    brand_name: row.brand_name,
    category_name: row.category_name,
    description: row.description,
    model_number: row.model_number,
    upc: row.upc,
    ppid: row.ppid,
    brand: row.brand,
    category: row.category,
    status: (
      <Label
        color={row.status === 1 ? 'success' : 'error'}
        sx={{ textTransform: 'capitalize' }}
      >
        {row.status === 1 ? 'Active' : 'Banned'}
      </Label>
    ),
    created_at: (
      <div style={{ whiteSpace: 'nowrap' }}>
        {dayjs(row.created_at).format('MM-DD-YY h:mm A')}
      </div>
    ),
    updated_at: (
      <div style={{ whiteSpace: 'nowrap' }}>
        {dayjs(row.updated_at).format('MM-DD-YY h:mm A')}
      </div>
    ),
    action: (
      <MenuUserAction
        row={row}
        onDeleteAction={() => dispatch(deleteDeviceRequest(row.id))}
        onEditAction={() => handleEditDevice(row.id)}
        titleAction1="Edit"
        titleAction2="Delete"
      />
    ),
  }));

  const handleEditDevice = (id: number) => {
    navigate(`/devices/${id}/edit`);
  };

  useEffect(() => {
    dispatch(
      getUserDeviceRequest({
        page,
        rowsPerPage,
        search: debouncedSearchTerm,
      })
    );
  }, [dispatch, page, rowsPerPage, debouncedSearchTerm]);

  return (
    <>
      <HeaderBreadcrumbs
        heading="User List"
        links={[
          { name: 'Dashboard', href: '/' },
          { name: 'Devices', href: '/devices' },
        ]}
        action={
          <Button
            variant="contained"
            component={RouterLink}
            to={'/devices/new'}
            startIcon={<AddIcon />}
          >
            New User
          </Button>
        }
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableComp
            rows={renderBodyTable()}
            columns={headersTable}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={total}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoading(),
  userDevice: makeSelectUserDevice(),
  listDevice: makeSelectListDevice(),
  total: makeSelectTotalUsers(),
});

export default connect(mapStateToProps)(UserDeviceContainer);
