import { Container } from "@mui/material"

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"
import Page from "src/components/Page"
import reducer from 'src/containers/MfiToken/store/reducer'
import saga from 'src/containers/MfiToken/store/sagas'
import { useInjectReducer } from "src/utils/injectReducer"
import { useInjectSaga } from "src/utils/injectSaga"
import FormMfiToken from "../../components/FormMfiToken"

const NewCertificate = () => {

  useInjectReducer({ key: 'mfiToken', reducer });
  useInjectSaga({ key: 'mfiToken', saga });

  return (
    <Page title="MFIToken: Create new MFI Token">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading='Create MFI Token'
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'MFI Token', href: '/mfi-token' },
            { name: 'New MFI Token' },
          ]}
        />
        <FormMfiToken isEdit={false} />
      </Container>
    </Page>
  )
}

export default NewCertificate
