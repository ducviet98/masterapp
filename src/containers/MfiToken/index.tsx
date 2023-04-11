import { Button, Card, Container, IconButton, MenuItem, Tooltip, Link } from "@mui/material";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// component
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import Toolbar from "src/containers/MfiToken/components/Toolbar";
import reducer from 'src/containers/MfiToken/store/reducer';
import saga from 'src/containers/MfiToken/store/sagas';
import useSettings from "src/hooks/useSettings";
import ToolTipRow from "../Certificates/components/TooltipRow";
import { TableComp } from 'src/components/table';
import { FILTER_OPTIONS, headerTable } from 'src/containers/MfiToken/constants/index';
import { makeSelectMfiToken, makeSelectIsLoading, makeSelectTotal } from "src/containers/MfiToken/store/selectors";
import { usePagination } from "src/hooks/usePagination";
import { useInjectReducer } from "src/utils/injectReducer";
import { useInjectSaga } from "src/utils/injectSaga";
import { MenuAction } from "./components/MenuAction";
import { path } from 'src/constants/path'
import { deleteMfiTokenRequest, getMfiTokenRequest } from "./store/actions";
import { MFiTokenType } from "./interfaces";

const MfiContainer = () => {
  useInjectReducer({ key: 'mfiToken', reducer });
  useInjectSaga({ key: 'mfiToken', saga });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { themeStretch } = useSettings();

  const mfiTokens: MFiTokenType[] = useSelector(makeSelectMfiToken())
  const total: number = useSelector(makeSelectTotal())
  const isLoading: boolean = useSelector(makeSelectIsLoading())

  const [selectedItems, setSelectedItems] = useState<number[]>([])

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

  const selectAllTable = () => {
    if (mfiTokens.length === selectedItems.length) {
      setSelectedItems([])
    }
    else {
      const all = mfiTokens.map((item: MFiTokenType) => item.id)
      setSelectedItems(all)
    }
  }

  const selectItemTable = (value: number) => {
    if (selectedItems.includes(value)) return setSelectedItems(selectedItems.filter((item: any) => item !== value))
    setSelectedItems([...selectedItems, value])
  }

  const handleEdit = (value: number) => {
    navigate(`${path.mfiToken}/${value}`)
  }

  const handleDelete = (id: number) => {
    dispatch(deleteMfiTokenRequest({
      ids: [id],
      callback: () => {
        dispatch(getMfiTokenRequest({
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
    dispatch(deleteMfiTokenRequest({
      ids: selectedItems,
      callback: () => {
        dispatch(getMfiTokenRequest({
          page: 0,
          rowsPerPage: 10,
          search: '',
          ordering: filter
        }))
        setSelectedItems([])
      }
    }))
  }

  const renderBodyTable = () => mfiTokens?.map((row: any) => ({
    id: row.id,
    certificate_id: <Link component={RouterLink} to={`${path.mfiToken}/${row.id}`} variant="subtitle2" noWrap>
      {row.certificate_id}
    </Link>,
    name: row.name,
    token_id: row.token_id,
    base64_token: <ToolTipRow title={row.base64_token} />,
    crc32_in_hex: row.crc32_in_hex,
    ppid: row.ppid,
    request_id: row.request_id,
    created_at: dayjs(row.created_at).format('MM-DD-YY h:mm A'),
    updated_at: dayjs(row.updated_at).format('MM-DD-YY h:mm A'),
    action: <MenuAction >
      <MenuItem onClick={() => handleDelete(row.id)}
        sx={{ color: 'error.main' }}
      >
        <Iconify icon={'eva:trash-2-outline'} />
        Delete
      </MenuItem>
      <MenuItem onClick={() => handleEdit(row.id)}>
        <Iconify icon={'eva:edit-fill'} />
        Update
      </MenuItem>
    </MenuAction>
  }));

  useEffect(() => {
    dispatch(getMfiTokenRequest({
      page,
      rowsPerPage,
      search: debouncedSearchTerm,
      ordering: filter
    }))
  }, [dispatch, debouncedSearchTerm, filter, page, rowsPerPage])

  return (
    <Page title="MFI Token List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="MFI Token List"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'MFI Token' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={path.newMfiToken}
            >
              New MFI Token
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

export default MfiContainer