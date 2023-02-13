import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  listItem: {
    color: 'rgb(99, 115, 129)',
    fontSize: 14,
  },
  itemSelected: {
    color: 'rgb(33, 43, 54)',
    fontWeight: 'bold',
    backgroundColor: 'rgba(145, 158, 171, 0.16)',
    borderRadius: 6,
  },
  list: {
    padding: '0px 8px !important',
    marginTop: '40px !important',
  },
}));

export { useStyles };
