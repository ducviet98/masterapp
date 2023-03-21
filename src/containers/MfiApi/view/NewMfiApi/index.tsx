import { Container } from "@mui/material"

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"
import Page from "src/components/Page"
import reducer from 'src/containers/MfiApi/store/reducer'
import saga from 'src/containers/MfiApi/store/sagas'
import { useInjectReducer } from "src/utils/injectReducer"
import { useInjectSaga } from "src/utils/injectSaga"
import FormMfiApi from "../../components/FormMfiApi"

const NewMfiApi = () => {
  useInjectReducer({ key: 'mfiApi', reducer });
  useInjectSaga({ key: 'mfiApi', saga });
  return (<Page title="MFIToken: Create new MFI API">
    <Container maxWidth='lg'>
      <HeaderBreadcrumbs
        heading='Create MFI API'
        links={[
          { name: 'Dashboard', href: '/' },
          { name: 'MFI API', href: '/mfi-api' },
          { name: 'New MFI API' },
        ]}
      />
      <FormMfiApi isEdit={false} />
    </Container>
  </Page>)
}

export default NewMfiApi
