import QRCode from 'react-qr-code';
import { useTranslate } from 'locales';
import { useSnackbar } from 'notistack';
// @mui
import { Box, Stack, Button, Typography, DialogContent, useTheme } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
// hooks
import { useCopyToClipboard } from 'hooks/use-copy-to-clipboard';
// types
import { IDeposit } from 'types/deposit';

const PendingDeposit = ({
    pendingDeposit,
    cancelDeposit
}: {
    pendingDeposit: IDeposit;
    cancelDeposit: (id: string) => void;
}) => {
    const { t } = useTranslate();
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const { copy } = useCopyToClipboard();

    const copyAddress = (address: string) => {
        copy(address);
        enqueueSnackbar('Copy successful!', { variant: 'success' });
    };

    if (pendingDeposit.payinType === 'nowpayment') {
        return (
            <DialogContent dividers sx={{ mt: 2 }}>
                <Stack width={1} gap={2}>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                        <Typography variant="subtitle1" sx={{ fontSize: 20 }}>
                            {pendingDeposit.data.pay_amount}
                        </Typography>
                        <Stack direction="row" alignItems="center" gap={1} maxWidth={0.9}>
                            <Box
                                component="img"
                                src={`http://nowpayments.io${pendingDeposit.data.logo_url}`}
                                alt={pendingDeposit.data.pay_currency}
                                sx={{ width: 20, height: 20 }}
                            />
                            <Typography noWrap fontWeight={800} variant="caption">
                                {pendingDeposit.data.pay_currency}
                            </Typography>
                        </Stack>
                        <Typography
                            variant="body2"
                            sx={{
                                ml: 0.5,
                                textTransform: 'uppercase',
                                fontSize: 12,
                                lineHeight: 1,
                                fontWeight: 600
                            }}
                        >
                            ({pendingDeposit.data.network})
                        </Typography>
                    </Stack>
                    <Stack alignItems="center" justifyContent="center" sx={{ py: 2 }}>
                        <Box
                            sx={{
                                p: 1,
                                lineHeight: 1,
                                borderWidth: 1,
                                borderRadius: 2,
                                borderColor: 'divider',
                                borderStyle: 'solid'
                            }}
                        >
                            <QRCode style={{ width: 150, height: 150 }} value={pendingDeposit.data.pay_address} />
                        </Box>
                    </Stack>
                    <Stack
                        sx={{
                            p: 1,
                            borderRadius: 2,
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: 'divider'
                        }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography
                            sx={{
                                width: 1,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {pendingDeposit.data.pay_address}
                        </Typography>
                    </Stack>
                    <Stack width={1} flexDirection={{ md: 'row', xs: 'column' }} alignItems="center" spacing={2}>
                        <Button
                            onClick={() => copyAddress(pendingDeposit.data.pay_address)}
                            size="small"
                            color="primary"
                            variant="contained"
                            sx={{ p: 2, width: 1 }}
                            startIcon={<ContentCopyIcon fontSize="small" />}
                        >
                            {t('payment.copyAddress')}
                        </Button>
                        <Button
                            onClick={() => cancelDeposit(pendingDeposit._id)}
                            size="small"
                            color="error"
                            variant="outlined"
                            sx={{ p: 2, width: 1 }}
                            startIcon={<NotInterestedIcon fontSize="small" />}
                        >
                            Cancel Request
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        );
    }

    if (pendingDeposit.payinType === 'agpayment') {
        return (
            <DialogContent dividers sx={{ mt: 2 }}>
                <Stack width={1} gap={2}>
                    <Box sx={{ height: 80, mx: 'auto', mb: 1 }}>
                        <Box component="img" src="/assets/pix-logo.png" sx={{ height: 1 }} />
                    </Box>

                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                        <Typography variant="subtitle1" sx={{ fontSize: 20 }}>
                            {pendingDeposit.amount}
                        </Typography>
                        <Stack direction="row" alignItems="center" gap={1} maxWidth={0.9}>
                            <Typography noWrap fontWeight={800} variant="caption">
                                BRL
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack alignItems="center" justifyContent="center" sx={{ py: 2 }}>
                        <Box
                            sx={{
                                p: 1,
                                lineHeight: 1,
                                borderWidth: 1,
                                borderRadius: 2,
                                borderColor: 'divider',
                                borderStyle: 'solid'
                            }}
                        >
                            <QRCode style={{ width: 150, height: 150 }} value={pendingDeposit.data.agpayQR} />
                        </Box>
                    </Stack>
                    <Stack
                        sx={{
                            p: 1,
                            borderRadius: 2,
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: 'divider'
                        }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography
                            sx={{
                                width: 1,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {pendingDeposit.data.agpayQR}
                        </Typography>
                    </Stack>
                    <Stack width={1} flexDirection={{ md: 'row', xs: 'column' }} alignItems="center" spacing={2}>
                        <Button
                            onClick={() => copyAddress(pendingDeposit.data.agpayUrl)}
                            size="small"
                            color="primary"
                            variant="contained"
                            sx={{ p: 2, width: 1 }}
                            startIcon={<ContentCopyIcon fontSize="small" />}
                        >
                            {t('payment.copyAddress')}
                        </Button>
                        <Button
                            onClick={() => cancelDeposit(pendingDeposit._id)}
                            size="small"
                            color="error"
                            variant="outlined"
                            sx={{ p: 2, width: 1 }}
                            startIcon={<NotInterestedIcon fontSize="small" />}
                        >
                            Cancel Request
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        );
    }

    if (pendingDeposit.payinType === 'gspayment') {
        return (
            <DialogContent dividers sx={{ mt: 2 }}>
                <Stack width={1} gap={2}>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                        sx={{ position: 'relative', mb: 2 }}
                    >
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                height: 40,
                                width: 64
                            }}
                        >
                            <Box component="img" src={`/assets/images/payment/visa-${theme.palette.mode}.webp`} />
                        </Stack>
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                height: 40,
                                width: 64
                            }}
                        >
                            <Box component="img" src="/assets/images/payment/mastercard.webp" />
                        </Stack>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                        <Typography variant="subtitle1" sx={{ fontSize: 20 }}>
                            {pendingDeposit.amount}
                        </Typography>
                        <Stack direction="row" alignItems="center" gap={1} maxWidth={0.9}>
                            <Typography noWrap fontWeight={800} variant="caption">
                                {pendingDeposit.currency}
                            </Typography>
                            {/* <Typography
                                variant="body2"
                                sx={{
                                    ml: 0.5,
                                    textTransform: 'uppercase',
                                    fontSize: 12,
                                    lineHeight: 1,
                                    fontWeight: 600
                                }}
                            >
                                Fee ({Number(pendingDeposit.data.fee).toFixed(2)})
                            </Typography> */}
                        </Stack>
                    </Stack>
                    <Stack
                        sx={{
                            p: 1,
                            borderRadius: 2,
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: 'divider'
                        }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography
                            sx={{
                                width: 1,
                                wordWrap: 'break-word'
                            }}
                        >
                            {pendingDeposit.data.payurl}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'info.main', textAlign: 'center' }}>
                        Please copy link and open in browser.
                    </Typography>
                    <Stack width={1} flexDirection={{ md: 'row', xs: 'column' }} alignItems="center" spacing={2}>
                        <Button
                            onClick={() => copyAddress(pendingDeposit.data.payurl)}
                            size="small"
                            color="primary"
                            variant="contained"
                            sx={{ p: 2, width: 1 }}
                            startIcon={<ContentCopyIcon fontSize="small" />}
                        >
                            {t('payment.copyAddress')}
                        </Button>
                        <Button
                            onClick={() => cancelDeposit(pendingDeposit._id)}
                            size="small"
                            color="error"
                            variant="outlined"
                            sx={{ p: 2, width: 1 }}
                            startIcon={<NotInterestedIcon fontSize="small" />}
                        >
                            Cancel Request
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        );
    }

    return null;
};

export default PendingDeposit;
