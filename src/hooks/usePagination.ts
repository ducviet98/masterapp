import { useState, ChangeEvent } from 'react';
import useDebounce from './useDebounce';

export const usePagination = () => {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [search, setSearch] = useState('');

  const [filter, setFilter] = useState('');

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(e.target.value);
  };
  const debouncedSearchTerm = useDebounce(search, 500);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return {
    filter,
    page,
    rowsPerPage,
    search,
    debouncedSearchTerm,
    handleSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    handleFilter
  };
};
