import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  layoutContainer: {
    height: "calc(100vh - 46px)",
    overflowY: "auto",
    borderRadius: 0,
  },
  layoutContent: {
    height: 'calc(100% - 46px)',
    margin: '15px 7%'
  }
}));

export { useStyles };
