// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Autocomplete, TextField } from '@mui/material';


export default function RHFAutocomplete({ name, valueSearch, onChangeSearch, label, setSearch, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          fullWidth
          onChange={(_, newValue) => {
            field.onChange(newValue);
            setSearch && setSearch('');
          }}

          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              error={!!error}
              helperText={error?.message}
              value={valueSearch || ''}
              onChange={onChangeSearch}
              fullWidth
              label={label}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
