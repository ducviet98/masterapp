// @mui
import { Checkbox, Typography, Stack, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  dense?: boolean;
  actions?: React.ReactNode;
  rowCount: number;
  numSelected: number;
  onSelectAllRows?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TableSelectedActions({
  dense,
  actions,
  rowCount,
  numSelected,
  onSelectAllRows,
  sx,
  ...other
}: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        width: '100%',
        px: 2,
        top: 100,
        zIndex: 9,
        height: 58,
        borderRadius: 1,
        position: 'absolute',
        bgcolor: 'primary.lighter',
        paddingBottom: 0,
        paddingLeft: 3,
        paddingRight: 3,
        ...(dense && {
          pl: 1,
          height: 38,
        }),
        ...sx,
      }}
      {...other}
    >
      <Checkbox
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={onSelectAllRows}
      />

      <Typography
        variant="subtitle1"
        sx={{
          ml: 2,
          flexGrow: 1,
          color: 'primary.main',
          ...(dense && {
            ml: 1,
          }),
        }}
      >
        {numSelected} selected
      </Typography>

      {actions && actions}
    </Stack>
  );
}
