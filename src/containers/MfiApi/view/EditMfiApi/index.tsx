import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Container } from "@mui/material"

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"
import Page from "src/components/Page"
import reducer from 'src/containers/MfiApi/store/reducer'
import saga from 'src/containers/MfiApi/store/sagas'
import { useInjectReducer } from "src/utils/injectReducer"
import { useInjectSaga } from "src/utils/injectSaga"
import FormMfiApi from "../../components/FormMfiApi"
import { getMfiApiDetailRequest } from "../../store/actions"
import { makeSelectMfiApiDetail } from "../../store/selectors"
const EditMfiApi = () => {

  useInjectReducer({ key: 'mfiApi', reducer });
  useInjectSaga({ key: 'mfiApi', saga });

  const mfiApiDetail = useSelector(makeSelectMfiApiDetail())

  const { id } = useParams<{
    id: string;
  }>();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMfiApiDetailRequest(id))
  }, [dispatch, id])

  return (
    <Page title="MFI API: Edit MFI API">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading='Edit MFI API'
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'MFI APIs', href: '/mfi-api' },
            { name: mfiApiDetail.name },
          ]}
        />
        <FormMfiApi isEdit={true} oldData={mfiApiDetail} />
      </Container>
    </Page>
  )
}

export default EditMfiApi
