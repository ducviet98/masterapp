import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  wrapperPage: {
    backgroundColor: `${theme.palette.background.default}`,
    boxShadow: `0px 9px 28px 8px ${alpha(
      theme.palette.divider,
      0.05
    )}, 0px 3px 6px -4px ${alpha(theme.palette.divider, 0.12)}`,
    filter: `drop-shadow(0px 6px 16px ${alpha(theme.palette.divider, 0.08)})`,
    '& .MuiTableContainer-root': {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  wrapperPaper: {
    width: '100%',
    boxShadow: 'none',
    backgroundColor: '#fff',
  },
  wrapperNoData: {
    height: 100,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '22px',
    // color: colors.neutral[600],
  },
  headerTable: {
    // backgroundColor: theme.palette.neutral[200],
  },
  wrapperIconHeaderTable: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconHeaderTable: {
    width: 12,
    height: 12,
  },
  iconHeaderSelectTable: {
    width: 8,
    height: 8,
  },
  contentTable: {
    zIndex: 10,
  },
  wrapperSelectHeader: {
    width: 42,
  },
  tableContainer: {
    overflowX: 'scroll',
    maxHeight: 'calc(100vh - 300px)',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
  },
}));
