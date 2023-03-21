import {
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import {
  alpha,
  IconButton,
  Menu, MenuProps,
  styled
} from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

type MenuActionType = {
  children: React.ReactNode;
};

export const MenuAction = (props: MenuActionType) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [anchorRef, open, handleOpen, handleClose] = usePopover();

  const {
    children,
  } = props;

  return (
    <>
      <IconButton onClick={handleOpen} ref={anchorRef} {...props}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <StyledMenu
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20 },
          },
        }}
        open={open}
        onClose={handleClose}
      >
        {children}
      </StyledMenu>
    </>
  );
};
