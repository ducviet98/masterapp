import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  layoutContainer: {
    height: "calc(100vh - 46px)",
    overflowY: "auto",
    borderRadius: 0,
  },
  layoutContent: {
    height: 'calc(100% - 46px)',
    padding: '15px 4%'
  },
  mainContainer: {
    overflowX: 'scroll',
    maxHeight: '100vh',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  }
}));

export { useStyles };
