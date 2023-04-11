// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Autocomplete, TextField } from '@mui/material';


export default function RHFAutocomplete({ name, valueSearch, onChangeSearch, label, setSearch, handleScroll, error, helperText, ...other }: any) {
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
              name={name}
              variant="outlined"
              error={!!error}
              helperText={helperText}
              value={valueSearch || ''}
              onChange={onChangeSearch}
              fullWidth
              label={label}
            />
          )}
          ListboxProps={{
            onScroll: handleScroll,
          }}
          {...other}
        />
      )}
    />
  );
}
