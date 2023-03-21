import { Container } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs"
import Page from "src/components/Page"
import { path } from "src/constants/path"
import reducer from 'src/containers/Certificates/store/reducer'
import saga from 'src/containers/Certificates/store/sagas'
import { useInjectReducer } from "src/utils/injectReducer"
import { useInjectSaga } from "src/utils/injectSaga"
import FormCertificate from "../../components/FormCertificate"
import PopUpCertificate from "../../components/PopupCertificate"
import { closeDialogNotification } from "../../store/actions"
import { makeSelectNewCertificate } from "../../store/selectors"

const NewCertificate = () => {

  useInjectReducer({ key: 'certificate', reducer });
  useInjectSaga({ key: 'certificate', saga });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newCertificate = useSelector(makeSelectNewCertificate())

  const handleEdit = () => {
    navigate(`${path.certificates}/${newCertificate.id}`)
    dispatch(closeDialogNotification())
  }

  const handleClose = () => {
    dispatch(closeDialogNotification())
  }

  return (
    <Page title="Certificate: Create new certificate">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading='Create Certificate'
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Certificates', href: '/certificates' },
            { name: 'New Certificate' },
          ]}
        />
        <FormCertificate />
      </Container>

      <PopUpCertificate csr={newCertificate.csr} handleEdit={handleEdit} open={!!newCertificate.id} onClose={handleClose} />
    </Page>
  )
}

export default NewCertificate
