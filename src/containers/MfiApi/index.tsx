import { Button, Card, Container, IconButton, MenuItem, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// component
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import Page from 'src/components/Page';
import { TableComp } from 'src/components/table';
import { path } from 'src/constants/path';
import Toolbar from 'src/containers/MfiApi/components/Toolbar';
import { FILTER_OPTIONS, headerTable } from 'src/containers/MfiApi/constants/index';
import reducer from 'src/containers/MfiApi/store/reducer';
import saga from 'src/containers/MfiApi/store/sagas';
import {
  makeSelectIsLoading, makeSelectMfiApi, makeSelectTotal
} from 'src/containers/MfiApi/store/selectors';
import useHandleDataTable from 'src/hooks/useHandleTable';
import { usePagination } from 'src/hooks/usePagination';
import useSettings from 'src/hooks/useSettings';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { MenuAction } from './components/MenuAction';
import { MFiAPIType } from './interfaces';
import { deleteMfiApiRequest, getMfiApiRequest } from './store/actions';

const MfiAPI = () => {
  useInjectReducer({ key: 'mfiApi', reducer });
  useInjectSaga({ key: 'mfiApi', saga });

  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const mfiTokens: MFiAPIType[] = useSelector(makeSelectMfiApi());
  const total: number = useSelector(makeSelectTotal());
  const isLoading: boolean = useSelector(makeSelectIsLoading());

  const {
    debouncedSearchTerm,
    page,
    rowsPerPage, 
    search,
    filter,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearch,
    handleFilter,
  } = usePagination();

  const { selectAllTable, selectItemTable, handleEdit, setSelectedItems, selectedItems } =
    useHandleDataTable({
      dataTable: mfiTokens,
    });

  const handleDelete = (id: number) => {
    dispatch(
      deleteMfiApiRequest({
        ids: [id],
        callback: () => {
          dispatch(
            getMfiApiRequest({
              page: 0,
              rowsPerPage: 10,
              search: '',
              ordering: filter,
            })
          );
          setSelectedItems([]);
        },
      })
    );
  };

  const handleDeleteMulti = () => {
    dispatch(
      deleteMfiApiRequest({
        ids: selectedItems,
        callback: () => {
          dispatch(
            getMfiApiRequest({
              page: 0,
              rowsPerPage: 10,
              search: '',
              ordering: filter,
            })
          );
          setSelectedItems([]);
        },
      })
    );
  };

  const renderBodyTable = () =>
    mfiTokens?.map((row: MFiAPIType) => ({
      id: row?.id,
      url: row?.url,
      method: row?.method,
      name: row?.name,
      query: new URLSearchParams(row?.query).toString(),
      param: new URLSearchParams(row?.param).toString(),
      body: Object.keys(row?.body).map(
        (item: any, index: number) => <div key={index}>
          {item} : {row?.body[item]} <br />
        </div>
      ),
      created_at: dayjs(row?.created_at).format('MM-DD-YY h:mm A'),
      updated_at: dayjs(row?.updated_at).format('MM-DD-YY h:mm A'),
      action: (
        <MenuAction>
          <MenuItem onClick={() => handleEdit(path.mfiApi, row?.id)}>
            <Iconify icon={'eva:edit-fill'} />
            Update
          </MenuItem>
          <MenuItem onClick={() => handleDelete(row?.id)} sx={{ color: 'error.main' }}>
            <Iconify icon={'eva:trash-2-outline'} />
            Delete
          </MenuItem>
        </MenuAction>
      ),
    }));

  useEffect(() => {
    dispatch(
      getMfiApiRequest({
        page,
        rowsPerPage,
        search: debouncedSearchTerm,
        ordering: filter,
      })
    );
  }, [dispatch, debouncedSearchTerm, filter, page, rowsPerPage]);

  return (
    <Page title="MFI API List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="MFI API List"
          links={[{ name: 'Dashboard', href: '/' }, { name: 'MFI API' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={path.newMfiApi}
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
            optionsRole={FILTER_OPTIONS}
          />

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
  );
};

export default MfiAPI;
