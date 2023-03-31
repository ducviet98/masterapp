import { Button, Card, Container, IconButton, MenuItem, Tooltip, Link } from "@mui/material";
import dayjs from 'dayjs';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
// component
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { TableComp } from 'src/components/table';
import Toolbar from "src/containers/Certificates/components/Toolbar";
import ToolTipRow from "src/containers/Certificates/components/TooltipRow";
import { FILTER_OPTIONS, headerTable } from 'src/containers/Certificates/constants/index';
import { deleteCertificateRequest, getCertificateRequest } from "src/containers/Certificates/store/actions";
import reducer from 'src/containers/Certificates/store/reducer';
import saga from 'src/containers/Certificates/store/sagas';
import { makeSelectCertificate, makeSelectIsLoading, makeSelectTotal } from "src/containers/Certificates/store/selectors";
import { usePagination } from "src/hooks/usePagination";
import useSettings from "src/hooks/useSettings";
import { useInjectReducer } from "src/utils/injectReducer";
import { useInjectSaga } from "src/utils/injectSaga";
import { MenuAction } from "./components/MenuAction";
import { CertificateType } from "./interfaces";
import { path } from 'src/constants/path'
import useHandleDataTable from "src/hooks/useHandleTable";

const CertificateContainer = () => {

  useInjectReducer({ key: 'certificate', reducer });
  useInjectSaga({ key: 'certificate', saga });

  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const certificates: CertificateType[] = useSelector(makeSelectCertificate())
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

  const {
    selectAllTable,
    selectItemTable,
    handleEdit,
    setSelectedItems,
    selectedItems
  } = useHandleDataTable({
    dataTable: certificates
  })

  const handleDelete = (id: number) => {
    dispatch(deleteCertificateRequest({
      ids: [id],
      callback: () => {
        dispatch(getCertificateRequest({
          page: 0,
          rowsPerPage: 10,
          search: '',
          ordering: filter
        }))
        setSelectedItems([])
      }
    }))
  }

  const handleDeleteMulti = () => {
    dispatch(deleteCertificateRequest({
      ids: selectedItems,
      callback: () => {
        dispatch(getCertificateRequest({
          page: 0,
          rowsPerPage: 10,
          search: '',
          ordering: filter
        }))
        setSelectedItems([])
      }
    }))
  }

  const renderBodyTable = () => certificates?.map((row: CertificateType) => ({
    id: row?.id,
    name: <Link component={RouterLink} to={`${path.certificates}/${row?.id}`} variant="subtitle2" noWrap>
      {row?.name}
    </Link>,
    mfi_account_number: row?.mfi_account_number,
    company_name: row?.company_name,
    csr: <ToolTipRow title={row?.csr} />,
    key: <ToolTipRow title={row?.key} />,
    certificate: <ToolTipRow title={row?.certificate} />,
    created_at: dayjs(row?.created_at).format('MM-DD-YY h:mm A'),
    updated_at: dayjs(row?.updated_at).format('MM-DD-YY h:mm A'),
    action: <MenuAction >
      <MenuItem onClick={() => handleDelete(row?.id)}
        sx={{ color: 'error.main' }}
      >
        <Iconify icon={'eva:trash-2-outline'} />
        Delete
      </MenuItem>
      <MenuItem onClick={() => handleEdit(path.certificates, row?.id)}>
        <Iconify icon={'eva:edit-fill'} />
        Update
      </MenuItem>
    </MenuAction>
  }));

  useEffect(() => {
    dispatch(getCertificateRequest({
      page,
      rowsPerPage,
      search: debouncedSearchTerm,
      ordering: filter
    }))
  }, [dispatch, debouncedSearchTerm, filter, page, rowsPerPage])

  return (
    <Page title="Certificate List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Certificate List"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Certificate List' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={path.newCertificate}
            >
              New Certificate
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
            selectItemTable={selectItemTable}
            selectAllTable={selectAllTable}
            selectedItems={selectedItems}
            isSelect
            rows={renderBodyTable()}
            columns={headerTable}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={total}
            isLoading={isLoading}
            actionSelect={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={handleDeleteMulti}>
                  <Iconify icon={'eva:trash-2-outline'} />
                </IconButton>
              </Tooltip>
            }
          />
        </Card>
      </Container>
    </Page>
  )
}

export default CertificateContainer