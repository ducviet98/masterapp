import { Container } from "@mui/material"

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"
import Page from "src/components/Page"
import reducer from 'src/containers/Brand/store/reducer'
import saga from 'src/containers/Brand/store/sagas'
import { useInjectReducer } from "src/utils/injectReducer"
import { useInjectSaga } from "src/utils/injectSaga"
import FormBrand from "../../components/FormBrand/index"

const NewBrand = () => {

  useInjectReducer({ key: 'brand', reducer });
  useInjectSaga({ key: 'brand', saga });

  return (
    <Page title="Brand: Create new Brand">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading='Create Brand'
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Brand', href: '/brand' },
            { name: 'New Brand' },
          ]}
        />
        <FormBrand isEdit={false} />
      </Container>
    </Page>
  )
}

export default NewBrand
