import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import {
  alpha,
  IconButton,
  Menu,
  MenuItem,
  MenuProps,
  styled,
} from '@mui/material';
import { usePopover } from './use-popover';

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

type MenuActionPlantSpeciesType = {
  onEditAction?: (data: any) => void;
  onDeleteAction?: (data: any) => void;
  onViewDetail?: (data: any) => void;
  row: any;
  titleAction1?: string;
  titleAction2?: string;
};

export const MenuUserAction = (props: MenuActionPlantSpeciesType) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [anchorRef, open, handleOpen, handleClose] = usePopover();

  const {
    onEditAction,
    onDeleteAction,
    row,
    titleAction1,
    titleAction2,
  } = props;

  const handleEditAction = () => {
    onEditAction && onEditAction(row);
    handleClose();
  };

  const handleDeleteAction = () => {
    onDeleteAction && onDeleteAction(row?.id);
    handleClose();
  };

  const onClickOpen = (event: any) => {
    event.stopPropagation();
    handleOpen();
  };

  const onClickClose = (event: any) => {
    event.stopPropagation();
    handleClose();
  };

  const onClickEditAction = (event: any) => {
    event.stopPropagation();
    handleEditAction();
  };

  const onClickDeleteAction = (event: any) => {
    event.stopPropagation();
    handleDeleteAction();
  };

  return (
    <>
      <IconButton onClick={onClickOpen} ref={anchorRef} {...props}>
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
        open={open}
        onClose={onClickClose}
      >
        {titleAction1 && (
          <MenuItem onClick={onClickEditAction} disableRipple>
            <EditIcon />
            <span>{titleAction1}</span>
          </MenuItem>
        )}
        {titleAction2 && (
          <MenuItem onClick={onClickDeleteAction} disableRipple>
            <DeleteIcon color="secondary" />
            <span
              style={{
                color: 'red',
              }}
            >
              {titleAction2}
            </span>
          </MenuItem>
        )}
      </StyledMenu>
    </>
  );
};
