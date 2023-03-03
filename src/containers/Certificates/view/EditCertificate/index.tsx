import { Container } from "@mui/material"
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"
import Page from "src/components/Page"
import FormCertificate from "../../components/FormCertificate"

import { useInjectReducer } from "src/utils/injectReducer"
import { useInjectSaga } from "src/utils/injectSaga"
import reducer from 'src/containers/Certificates/store/reducer'
import saga from 'src/containers/Certificates/store/sagas'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCertificateDetailRequest } from "../../store/actions"
import { useParams } from "react-router-dom"
import { makeSelectCertificateDetail } from "../../store/selectors"

const EditCertificate = () => {

  useInjectReducer({ key: 'certificate', reducer });
  useInjectSaga({ key: 'certificate', saga });

  const certificateDetail = useSelector(makeSelectCertificateDetail())

  const { id } = useParams<{
    id: string;
  }>();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCertificateDetailRequest(id))
  }, [dispatch, id])

  return (
    <Page title="Certificate: Edit Certificate">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading='Edit Certificate'
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Certificates', href: '/certificates' },
            { name: certificateDetail.name },
          ]}
        />
        <FormCertificate isEdit certificateDetail={certificateDetail} />
      </Container>
    </Page>
  )
}

export default EditCertificate
