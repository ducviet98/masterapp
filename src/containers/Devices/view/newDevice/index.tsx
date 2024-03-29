
import { Container } from '@mui/material';

import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import FormDevices from '../../components/FormDevices';


const NewDevice = () => <Page title="User: Create a new user">
  <Container maxWidth='lg'>
    <HeaderBreadcrumbs
      heading='Create a new device'
      links={[
        { name: 'Dashboard', href: '/' },
        { name: 'devices', href: '/devices' },
        { name: 'new device' },
      ]}
    />
    <FormDevices isEdit={false} />
  </Container>
</Page>

export default NewDevice