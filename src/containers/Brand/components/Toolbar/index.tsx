import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
import Iconify from 'src/components/Iconify';
// components

// ----------------------------------------------------------------------

type Props = {
  optionsRole: string[];
  search: string;
  filter: string;
  onSearch: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Toolbar({
  search,
  filter,
  onSearch,
  onFilter,
  optionsRole,
}: Props) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        select
        label="Order by"
        value={filter}
        onChange={onFilter}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsRole.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={search}
        onChange={onSearch}
        placeholder="Search ..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
