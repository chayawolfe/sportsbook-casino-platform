import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// iconify
import { Icon } from '@iconify/react';
// @mui
import { Button, Dialog, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
// components
import { CloseButton } from 'components/close-button';
import FormProvider, { RHFTextField } from 'components/hook-form';
// api
import { affiliateApi } from 'api/affiliate.api';

type Props = {
    open: boolean;
    onclose: (reload: boolean) => void;
};

type FormValuesProps = {
    codeName: string;
};

export const CreateReferralModal = ({ open, onclose }: Props) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { enqueueSnackbar } = useSnackbar();

    const LoginSchema = Yup.object().shape({
        codeName: Yup.string().required('Code Name required')
    });

    const defaultValues = {
        codeName: ''
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(LoginSchema),
        defaultValues
    });

    const {
        handleSubmit,
        formState: { isSubmitting }
    } = methods;

    const onSubmit = async (data: { codeName: string }) => {
        try {
            const res = await affiliateApi.generateReferralCode(data.codeName);
            enqueueSnackbar('Created Successfully');
            onclose(true);
        } catch (error: any) {
            enqueueSnackbar(typeof error === 'string' ? error : error.message, { variant: 'error' });
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => onclose(false)}
            fullWidth
            maxWidth="xs"
            fullScreen={isMobile}
            sx={{
                '& .MuiDialog-paperFullWidth': {
                    backgroundColor: 'background.paper'
                }
            }}
        >
            <Stack sx={{ bgcolor: 'background.card', py: 3 }} />
            <Stack sx={{ height: 1, p: 4 }}>
                <Stack spacing={2.5} sx={{ height: '100%' }}>
                    <Stack alignItems="center" justifyContent="center" spacing={2}>
                        <Icon icon="mingcute:invite-fill" width={40} height={40} />
                        <Typography variant="h6" fontWeight={700}>
                            Create Code
                        </Typography>
                    </Stack>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={1.5}>
                            <RHFTextField size="small" name="codeName" label="Code Name" type="text" />
                            <Button
                                color="primary"
                                variant="contained"
                                disabled={isSubmitting}
                                fullWidth
                                sx={{ mt: 1, color: 'common.black' }}
                                type="submit"
                            >
                                Create
                            </Button>
                        </Stack>
                    </FormProvider>
                </Stack>
            </Stack>
            <CloseButton
                onClick={() => onclose(false)}
                sx={{
                    position: 'absolute',
                    top: 4,
                    right: 8
                }}
            />
        </Dialog>
    );
};
