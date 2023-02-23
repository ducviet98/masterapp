import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, MenuItem, TableCell } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import { TableComp } from 'src/components/table';
import TableMoreMenu from 'src/components/table/TableMoreMenu';
import { usePagination } from 'src/hooks/usePagination';
import { DeviceUser } from 'src/types/device.types';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { headersTable } from './constants';
import { getUserDeviceRequest } from './store/actions';
import reducer from './store/reducer';
import saga from './store/sagas';
import {
  makeSelectIsLoading,
  makeSelectListDevice, makeSelectTotalUsers, makeSelectUserDevice
} from './store/selectors';



interface IUserDeviceType {
  isLoading?: boolean;
  listDevice: DeviceUser[];
  total: number
}


const UserDeviceContainer = ({
  isLoading,
  listDevice,
  total
}: IUserDeviceType) => {

  useInjectReducer({ key: 'device', reducer });
  useInjectSaga({ key: 'device', saga });

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const { search, debouncedSearchTerm, page, rowsPerPage, handleSearch, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  const dispatch = useDispatch();

  const renderBodyTable = () => {
    return listDevice?.map((row: any) => ({
      id: row.id,
      name: row.name,
      brand_name: row.brand_name,
      category_name: row.category_name,
      status_name: row.status_name,
      description: row.description,
      model_number: row.model_number,
      upc: row.upc,
      ppid: row.ppid,
      brand: row.brand,
      category: row.category,
      status: row.status,
      created_at: dayjs(row.created_at).format('MM-DD-YY h:mm A'),
      updated_at: dayjs(row.updated_at).format('MM-DD-YY h:mm A'),

      action: <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  // onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  // onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    }));
  };

  useEffect(() => {
    dispatch(getUserDeviceRequest({
      page,
      rowsPerPage,
      search: debouncedSearchTerm
    }))
  }, [dispatch, page, rowsPerPage, debouncedSearchTerm])

  return (
    <>
      <HeaderBreadcrumbs
        heading="User List"
        links={[
          { name: 'Dashboard', href: '/' },
          { name: 'User', href: '/user-device' },
        ]}
        action={
          <Button
            variant="contained"
            component={RouterLink}
            to={'/user-device/new'}
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
  total: makeSelectTotalUsers()
});

export default connect(mapStateToProps)(UserDeviceContainer);
