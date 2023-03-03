import { ReactNode } from 'react';

export type Order = 'asc' | 'desc';

export interface ITableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  textAlign?: 'left' | 'right' | 'center';
  renderCell?: (cellData?: any) => ReactNode;
  selectItems?: string[];
  selectAllTable?: () => void;
}

export interface ITable {
  columns: ITableColumn[];
  rows: { [key: string]: any }[];
  count: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  itemLoading?: string[];
  isSelect?: boolean;
  selectedItems?: number[];
  selectAllTable?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectItemTable?: (value: number) => void;
  onClickItem?: (value: any) => void;
  onChangePage?: (id: string) => void;
  actionSelect?: React.ReactNode
}
