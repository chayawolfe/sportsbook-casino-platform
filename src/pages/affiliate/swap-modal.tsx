import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import { LoadingButton } from '@mui/lab';
import { Dialog, FormControl, MenuItem, Select, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
// components
import { useSnackbar } from 'components/snackbar';
import { CloseButton } from 'components/close-button';
// api
import { affiliateApi } from 'api/affiliate.api';
// utils
import { fBalance } from 'utils/format-balance';

type Props = {
    open: boolean;
    onclose: () => void;
    loadData: () => void;
    commision: number;
    referral: number;
};

export const SwapModal = ({ open, onclose, commision, referral, loadData }: Props) => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [type, setType] = useState(1);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(commision);

    const swap = async () => {
        try {
            setLoading(true);
            const res = await affiliateApi.convert({ walletType: type });
            if (res.status) {
                enqueueSnackbar('Converted successfully!', { variant: 'success' });
                loadData();
                onclose();
            } else {
                enqueueSnackbar('Failed!', { variant: 'error' });
            }
        } catch (error: any) {
            enqueueSnackbar(typeof error === 'string' ? error : error.message, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onclose}
            fullWidth
            maxWidth="xs"
            fullScreen={isMobile}
            sx={{
                '& .MuiDialog-paperFullWidth': {
                    backgroundColor: 'background.default'
                }
            }}
        >
            <Stack sx={{ bgcolor: 'background.card', py: 3 }} />
            <Stack sx={{ height: 1, p: 4 }}>
                <Stack spacing={2.5} sx={{ height: '100%' }}>
                    <Stack alignItems="center" justifyContent="center" spacing={2}>
                        <Typography variant="h6" fontWeight={700}>
                            {t('swapModal.title')}
                        </Typography>
                    </Stack>
                    <Stack spacing={3}>
                        <FormControl>
                            <Select
                                value={String(type)}
                                onChange={(e) => {
                                    setType(Number(e.target.value));
                                    setAmount(Number(e.target.value) === 1 ? commision : referral);
                                }}
                            >
                                <MenuItem value={1}>{t('swapModal.walletTypes.commission')}</MenuItem>
                                <MenuItem value={2}>{t('swapModal.walletTypes.referral')}</MenuItem>
                            </Select>
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography>{t('swapModal.amount')}</Typography>
                            <Typography>{fBalance(amount)}</Typography>
                        </Stack>
                        {amount < 1 && amount > 0 && (
                            <Typography variant="body2" color="info">
                                Available greater than 1.00 balance
                            </Typography>
                        )}
                        <LoadingButton
                            variant="contained"
                            color="primary"
                            disabled={amount < 1}
                            onClick={swap}
                            loading={loading}
                        >
                            {t('swapModal.submit')}
                        </LoadingButton>
                    </Stack>
                </Stack>
            </Stack>
            <CloseButton
                onClick={onclose}
                sx={{
                    position: 'absolute',
                    top: 4,
                    right: 8
                }}
            />
        </Dialog>
    );
};
