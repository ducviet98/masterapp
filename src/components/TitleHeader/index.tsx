import AddIcon from '@mui/icons-material/Add';
import { Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface TitleHeaderProps {
  title: string;
  textAction?: string;
  onAction?: any;
}

const TitleHeader = ({ title, textAction, onAction }: TitleHeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.text} variant="h6" gutterBottom>
        {title}
      </Typography>
      {textAction && (
        <Button onClick={onAction} variant="contained" endIcon={<AddIcon />}>
          {textAction}
        </Button>
      )}
    </div>
  );
};

export default TitleHeader;

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
  },
}));
