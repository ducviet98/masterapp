import { Button, Card, Container, IconButton, MenuItem, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// component
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { TableComp } from 'src/components/table';
import { path } from 'src/constants/path';
import Toolbar from "src/containers/Brand/components/Toolbar";
import { FILTER_OPTIONS, headerTable } from 'src/containers/Brand/constants/index';
import reducer from 'src/containers/Brand/store/reducer';
import saga from 'src/containers/Brand/store/sagas';
import { makeSelectBrand, makeSelectIsLoading, makeSelectTotal } from "src/containers/Brand/store/selectors";
import { usePagination } from "src/hooks/usePagination";
import useSettings from "src/hooks/useSettings";
import { useInjectReducer } from "src/utils/injectReducer";
import { useInjectSaga } from "src/utils/injectSaga";
import { MenuAction } from "./components/MenuAction";
import { BrandType } from "./interfaces";
import { deleteBrandRequest, getBrandRequest } from "./store/actions";

const BrandsContainer = () => {
  useInjectReducer({ key: 'brand', reducer });
  useInjectSaga({ key: 'brand', saga });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { themeStretch } = useSettings();

  const brands: BrandType[] = useSelector(makeSelectBrand())
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
    if (brands.length === selectedItems.length) {
      setSelectedItems([])
    }
    else {
      const all = brands.map((item: BrandType) => item.id)
      setSelectedItems(all)
    }
  }

  const selectItemTable = (value: number) => {
    if (selectedItems.includes(value)) return setSelectedItems(selectedItems.filter((item: any) => item !== value))
    setSelectedItems([...selectedItems, value])
  }

  const handleEdit = (value: number) => {
    navigate(`${path.brand}/${value}`)
  }

  const handleDelete = (id: number) => {
    dispatch(deleteBrandRequest({
      ids: [id],
      callback: () => {
        dispatch(getBrandRequest({
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
    dispatch(deleteBrandRequest({
      ids: selectedItems,
      callback: () => {
        dispatch(getBrandRequest({
          page: 0,
          rowsPerPage: 10,
          search: '',
          ordering: filter
        }))
        setSelectedItems([])
      }
    }))
  }

  const renderBodyTable = () => brands?.map((row: BrandType) => ({
    id: row.id,
    name: row.name,
    created_at: dayjs(row?.created_at).format('MM-DD-YY h:mm A'),
    updated_at: dayjs(row?.updated_at).format('MM-DD-YY h:mm A'),
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
    dispatch(getBrandRequest({
      page,
      rowsPerPage,
      search: debouncedSearchTerm,
      ordering: filter
    }))
  }, [dispatch, debouncedSearchTerm, filter, page, rowsPerPage])

  return (
    <Page title="Brand List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Brand List"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Brand' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={path.newBrand}
            >
              New Brand
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

export default BrandsContainer