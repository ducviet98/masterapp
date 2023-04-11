import { Container } from "@mui/material"

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"
import Page from "src/components/Page"
import reducer from 'src/containers/AccessoryInfo/store/reducer'
import saga from 'src/containers/AccessoryInfo/store/sagas'
import { useInjectReducer } from "src/utils/injectReducer"
import { useInjectSaga } from "src/utils/injectSaga"
import FormMfiToken from "../../components/FormAccessoryInfo"

const NewAccessoryInfo = () => {

  useInjectReducer({ key: 'accessoryInfo', reducer });
  useInjectSaga({ key: 'accessoryInfo', saga });

  return (
    <Page title="Accessory Info: Create new Accessory Info">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading='Create Accessory Info'
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Accessory Info', href: '/accessory-info' },
            { name: 'New Accessory Info' },
          ]}
        />
        <FormMfiToken />
      </Container>
    </Page>
  )
}

export default NewAccessoryInfo
