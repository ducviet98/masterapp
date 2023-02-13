import { Grid } from '@mui/material';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TitleHeader from 'src/components/TitleHeader';
import { TableComp } from 'src/components/table';
import { usePagination } from 'src/hooks/usePagination';
import { DeviceUser } from 'src/types/device.types';

import { headersTable } from './constants';
import {
  makeSelectIsLoading,
  makeSelectListDevice,
  makeSelectUserDevice,
} from './store/selectors';

import { userList } from './fakeData';

interface IUserDeviceType {
  isLoading?: boolean;
  userDevice: any;
  listDevice: DeviceUser;
}

const renderBodyTable = () => {
  return userList?.map((row: any) => ({
    id: row.id,
    user: (
      <span
        style={{
          fontWeight: 600,
        }}
      >
        {row.user}
      </span>
    ),
    device_name: row.device_name,
    description: row.description,
    phoneNumber: row.phoneNumber,
    brand: row.brand,
    upc: row.upc,
    category: row.category,
    ppid: row.ppid,
  }));
};

const UserDeviceContainer = ({
  isLoading,
  userDevice,
  listDevice,
}: IUserDeviceType) => {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  return (
    <>
      <TitleHeader title="Manage Users Device" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableComp
            rows={renderBodyTable()}
            columns={headersTable}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={0}
            isLoading={false}
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
});

export default connect(mapStateToProps)(UserDeviceContainer);
