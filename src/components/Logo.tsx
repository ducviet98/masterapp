import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


export default function Logo({ disabledLink = false, sx, src }: any) {

  const logo = (
    <Box
      component="img"
      src={src}
    />
  );

  return <RouterLink to="/">{logo}</RouterLink>;
}
