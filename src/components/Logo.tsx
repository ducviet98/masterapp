import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


export default function Logo({ src }: any) {

  const logo = (
    <Box
      component="img"
      src={src}
    />
  );

  return <RouterLink to="/">{logo}</RouterLink>;
}
