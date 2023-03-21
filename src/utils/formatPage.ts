
// ----------------------------------------------------------------------

export function formatPage(rowsPerPage: number, page: number) {
  return (rowsPerPage * (page + 1)) - rowsPerPage
}
