import { Button, Card, Container } from "@mui/material";
import dayjs from 'dayjs';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
// component
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { TableComp } from 'src/components/table';
import { path } from 'src/constants/path';
import reducer from 'src/containers/AccessoryInfo/store/reducer';
import saga from 'src/containers/AccessoryInfo/store/sagas';
import Toolbar from "src/containers/MfiToken/components/Toolbar";
import { FILTER_OPTIONS, headerTable } from 'src/containers/AccessoryInfo/constants/index';
import { usePagination } from "src/hooks/usePagination";
import useSettings from "src/hooks/useSettings";
import { useInjectReducer } from "src/utils/injectReducer";
import { useInjectSaga } from "src/utils/injectSaga";
import ToolTipRow from "../Certificates/components/TooltipRow";
import { AccessoryInfoType } from "./interfaces";
import { getAccessoryInfoRequest } from "./store/actions";
import { makeSelectAccessoryInfo, makeSelectIsLoading, makeSelectTotal } from "./store/selectors";

const AccessoryInfo = () => {
  useInjectReducer({ key: 'accessoryInfo', reducer });
  useInjectSaga({ key: 'accessoryInfo', saga });

  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const accessories: AccessoryInfoType[] = useSelector(makeSelectAccessoryInfo())
  const total: number = useSelector(makeSelectTotal())
  const isLoading: boolean = useSelector(makeSelectIsLoading())

  const {
    debouncedSearchTerm,
    page,
    rowsPerPage,
    search,
    filter,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearch,
    handleFilter
  } = usePagination();

  const renderBodyTable = () => accessories?.map((row: AccessoryInfoType) => ({
    id: row.id,
    cid: row.cid,
    mfi_token_id: row.mfi_token_id,
    product_data: <ToolTipRow title={row.product_data} />,
    setup_code: <ToolTipRow title={row.setup_code} />,
    setup_id: row.setup_id,
    setup_payload: row.setup_payload,
    setup_salt: row.setup_salt,
    setup_verifier: row.setup_verifier,
    created_at: dayjs(row.created_at).format('MM-DD-YY h:mm A'),
    updated_at: dayjs(row.updated_at).format('MM-DD-YY h:mm A'),
  }));

  useEffect(() => {
    dispatch(getAccessoryInfoRequest({
      page,
      rowsPerPage,
      search: debouncedSearchTerm,
      ordering: filter
    }))
  }, [dispatch, debouncedSearchTerm, filter, page, rowsPerPage])

  return (
    <Page title="Accessory Info">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Accessory Info"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Accessory Info' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={path.newAccessoryInfo}
            >
              New Accessory Info
            </Button>
          }
        />
        <Card>
          <Toolbar
            search={search}
            filter={filter}
            onSearch={handleSearch}
            onFilter={handleFilter}
            optionsRole={FILTER_OPTIONS} />

          <TableComp
            rows={renderBodyTable()}
            columns={headerTable}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={total}
            isLoading={isLoading}
          />
        </Card>
      </Container>
    </Page>
  )
}

export default AccessoryInfo