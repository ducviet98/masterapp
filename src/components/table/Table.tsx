import React, { FC, useState } from 'react';
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  Typography,
  Skeleton,
  CircularProgress,
} from '@mui/material';
import MuiTable from '@mui/material/Table';
import cx from 'clsx';

import { getComparator, stableSort } from './Table.helper';
import { Order, ITable } from './Table.types';
import { useStyles } from './Table.styles';

const TableComp: FC<ITable> = ({
  columns,
  rows,
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  isLoading,
  itemLoading,
  isSelect = false,
  selectedItems = [],
  selectAllTable,
  selectItemTable,
  onClickItem,
  onChangePage,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('');

  const handleSelectItemTable = (value: number) => () => {
    if (selectItemTable) {
      selectItemTable(value);
    }
  };

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleClickItem = (id: string) => () => {
    if (onClickItem) {
      onClickItem({ id, value: 'blocksManagement' });
    }
  };

  const renderHeadTable = () => {
    return (
      <TableHead className={classes.headerTable}>
        <TableRow>
          {isSelect && (
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={
                  selectedItems &&
                  selectedItems?.length > 0 &&
                  rows?.length === selectedItems?.length
                }
                onChange={selectAllTable}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            </TableCell>
          )}
          {columns.map((column) => (
            <TableCell
              key={column.id}
              sortDirection={orderBy === column.id ? order : false}
              align={column.textAlign || 'left'}
            >
              <TableSortLabel
                className={cx({
                  [classes.wrapperSelectHeader]: column.id === 'select',
                })}
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc'}
                disabled={!column.sortable && !column.id.includes('select')}
                onClick={createSortHandler(column.id)}
                style={{ whiteSpace: 'nowrap' }}
              >
                {column.id.includes('select') ? (
                  <>
                    {column.label}
                    <Checkbox
                      color="primary"
                      checked={
                        column?.selectItems &&
                        column?.selectItems?.length > 0 &&
                        rows?.length === column?.selectItems?.length
                      }
                      onChange={column?.selectAllTable}
                      inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                  </>
                ) : (
                  <>
                    {column.label}
                    {orderBy === column.id && (
                      <Box component="span">
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </Box>
                    )}
                  </>
                )}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const renderBodyTable = () => {
    return (
      <TableBody>
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {isSelect && (
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={false} />
                      </TableCell>
                    )}
                    {Array(columns.length)
                      .fill(0)
                      .map((_, index) => {
                        return (
                          <TableCell key={index} align={'left'}>
                            <Typography
                              width="100%"
                              component="div"
                              variant="h6"
                            >
                              <Skeleton />
                            </Typography>
                          </TableCell>
                        );
                      })}
                  </TableRow>
                );
              })
          : stableSort(rows, getComparator(order, orderBy))?.map(
              (row: any, index: number) => {
                const checked = selectedItems?.includes(row.id) || false;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={checked}
                    tabIndex={-1}
                    key={index}
                    selected={checked}
                    onClick={() => onChangePage && onChangePage(row.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {isSelect && (
                      <TableCell
                        padding="checkbox"
                        className={classes.contentTable}
                      >
                        <Checkbox
                          color="primary"
                          checked={checked || false}
                          onChange={handleSelectItemTable(row.id)}
                        />
                      </TableCell>
                    )}
                    {columns.map(({ id, textAlign, renderCell }, index) => (
                      <TableCell
                        key={index}
                        align={textAlign || 'left'}
                        className={classes.contentTable}
                      >
                        {itemLoading?.includes(row.id) &&
                        (id?.includes('actions') || id?.includes('select')) ? (
                          <CircularProgress size="16px" />
                        ) : renderCell ? (
                          renderCell(
                            id === 'errors'
                              ? {
                                  errors: row[id],
                                  disable: itemLoading?.includes(row.id),
                                }
                              : {
                                  ...row[id],
                                  disable: itemLoading?.includes(row.id),
                                }
                          )
                        ) : (
                          <Typography
                            variant="body2"
                            onClick={handleClickItem(row.id)}
                          >
                            {row[id] || '—'}
                          </Typography>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              }
            )}
      </TableBody>
    );
  };

  return (
    <Box width="100%">
      <Paper className={classes.wrapperPaper}>
        <TableContainer>
          <MuiTable sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            {renderHeadTable()}
            {renderBodyTable()}
          </MuiTable>
        </TableContainer>
        {rows?.length === 0 && !isLoading && (
          <Box className={classes.wrapperNoData}>No Data</Box>
        )}
        {count ? (
          <TablePagination
            SelectProps={{
              MenuProps: { classes: { paper: classes.wrapperPage } },
            }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : null}
      </Paper>
    </Box>
  );
};

export { TableComp };
