import { Paper } from '@mui/material';
import ThemeProvider from 'src/utils/theme';


interface Props {
  children: React.ReactNode
}

function Layout(props: Props) {
  const { children } = props;

  return (
    <ThemeProvider>
      <Paper square>{children}</Paper>
    </ThemeProvider>

  );
}

export default Layout;
