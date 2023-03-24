import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { DialogAnimate } from 'src/components/animate';
import { FormProvider } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/RHFAutocomplete';
import { MFiTokenType } from 'src/containers/MfiToken/interfaces';
import { getMfiTokenRequest } from 'src/containers/MfiToken/store/actions';
import { makeSelectMfiToken } from 'src/containers/MfiToken/store/selectors';
import { usePagination } from 'src/hooks/usePagination';
import reducer from 'src/containers/MfiToken/store/reducer';
import saga from 'src/containers/MfiToken/store/sagas';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { requestMfiApiRequest } from '../../store/actions';
import { makeSelectIsLoadingAction } from '../../store/selectors';
import { MFiAPIType } from '../../interfaces';

type DialogRequestApiMfiType = {
  onClose: () => void;
  open: boolean;
  apiDetail: MFiAPIType | null;
  requestApi: any;
};

const DialogRequestApiMfi = ({ onClose, open, apiDetail, requestApi }: DialogRequestApiMfiType) => {
  useInjectReducer({ key: 'mfiToken', reducer });
  useInjectSaga({ key: 'mfiToken', saga });

  const dispatch = useDispatch();

  const mfiTokens: MFiTokenType[] = useSelector(makeSelectMfiToken());

  const isLoadingAction = useSelector(makeSelectIsLoadingAction())

  const { debouncedSearchTerm, page, rowsPerPage, filter } = usePagination();

  useEffect(() => {
    dispatch(
      getMfiTokenRequest({
        page,
        rowsPerPage,
        search: debouncedSearchTerm,
        ordering: '',
      })
    );
  }, [dispatch, debouncedSearchTerm, filter, page, rowsPerPage]);

  const methods = useForm<any>({
    // resolver: yupResolver(schema),
    defaultValues: {},
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = (values: any) => {
    if (!values.mfi_token_id?.id) {
      return setError('mfi_token_id', {
        type: 'custom',
        message: 'MFI token is required',
      })
    }
    dispatch(
      requestMfiApiRequest({
        ...values,
        api_id: apiDetail?.id,
        mfi_token_id: values.mfi_token_id?.id,
        ...apiDetail,
      })
    );
  };

  return (
    <DialogAnimate
      sx={{
        width: 1000,
      }}
      open={open}
      onClose={onClose}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Request API MFI</DialogTitle>
        <>
          <DialogContent
            sx={{
              '&.MuiDialogContent-root': {
                overflowX: 'scroll',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              },
            }}
          >
            <DialogContentText id="alert-dialog-description">
              {
                requestApi ? <pre>{JSON.stringify(requestApi, null, 2)}</pre> : <Box
                  sx={{
                    marginTop: 2,
                  }}
                >
                  <RHFAutocomplete
                    options={mfiTokens}
                    get
                    name="mfi_token_id"
                    label="Select MF"
                    getOptionLabel={(option: any) => option?.name || ''}
                  />
                </Box>
              }

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="inherit" onClick={onClose}>
              Cancel
            </Button>
            {
              !requestApi && <LoadingButton loading={isLoadingAction} disabled={isLoadingAction} type="submit" variant="contained" >
                Call
              </LoadingButton>
            }

          </DialogActions>
        </>
      </FormProvider>
    </DialogAnimate>
  );
};

export default DialogRequestApiMfi;
