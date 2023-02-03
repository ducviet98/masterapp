import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  viewHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listSubHeader: {
    fontWeight: 'bold',
    borderBottom: '1px solid rgba(145, 158, 171, 0.24)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  mr4: {
    marginRight: 4
  }
}));

export { useStyles };
