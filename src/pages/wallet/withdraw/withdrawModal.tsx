import { useTranslate } from 'locales';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useMemo, useState } from 'react';
// @mui
import {
    Tab,
    Tabs,
    Stack,
    Button,
    Dialog,
    MenuItem,
    TextField,
    Typography,
    IconButton,
    DialogTitle,
    DialogContent
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
// store
import { useSelector } from 'store/store';
// api
import { paymentApi } from 'api/payment.api';
// components
import { SelectNetwork } from 'components/select-currency';
// hooks
import { useBoolean } from 'hooks/use-boolean';

interface IWithdraw {
    open: boolean;
    setOpen: (value: boolean) => void;
    reload: VoidFunction;
}

export const WithdrawModal = ({ open, setOpen, reload }: IWithdraw) => {
    const { t } = useTranslate();
    const { enqueueSnackbar } = useSnackbar();
    const balance = useSelector((state) => state.balance);

    const agSubmited = useBoolean();
    const agSubmiting = useBoolean();
    const availableLoading = useBoolean();
    const getCurrencyState = useBoolean();

    const [amount, setAmount] = useState<number | ''>('');
    const [error, setError] = useState(false);
    const [currencyList, setCurrencyList] = useState<any>({});
    const [selectedValue, setSelectedValue] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [pendingDeposit, setPendingDeposit] = useState<any>(null);
    const [tabValue, setTabValue] = useState(0);
    const [agpayValues, setAgpayValues] = useState({
        amount: 0,
        userAccountNum: '',
        userAccountType: 'EMAIL',
        userCert: '',
        userName: ''
    });

    const onAgpayValueChange = (data: { [key: string]: string | number }) => {
        setAgpayValues((pre) => ({ ...pre, ...data }));
    };

    const networks = useMemo(() => {
        if (Object.keys(currencyList).length > 0) {
            return Object.keys(currencyList);
        }
        return [];
    }, [currencyList]);

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberValue = Number(value);

        if (value === '' || isNaN(numberValue) || numberValue <= 0 || balance.amount - Number(amount) < 0) {
            setError(true);
            setAmount(value === '' ? '' : numberValue);
        } else {
            setError(false);
            setAmount(numberValue);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const getAvailableCurrencies = async () => {
        try {
            if (Number(amount) < 0 || balance.amount - Number(amount) < 0) return;
            availableLoading.onTrue();
            const response = await paymentApi.getWithdrawCurrency(Number(amount), balance.currency);
            setCurrencyList(response);
            getCurrencyState.onTrue();
        } catch (error) {
            console.log(error);
        } finally {
            availableLoading.onFalse();
        }
    };

    const handleWalletAddressChange = (addr: string) => {
        setWalletAddress(addr);
    };

    const handleSubmit = async () => {
        try {
            if (Number(amount) > 0 && selectedValue !== '' && walletAddress !== '') {
                availableLoading.onTrue();
                await paymentApi.withdraw({
                    amount: agpayValues.amount,
                    payoutType: 'nowpayment',
                    currency: balance.currency,
                    data: {
                        fromCurrency: balance.currency,
                        toCurrency: selectedValue,
                        fromAmount: Number(amount),
                        address: walletAddress
                    }
                });
                enqueueSnackbar('Successfully sent request!', { variant: 'success' });
                reload();
                handleClose();
            }
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: 'error' });
        } finally {
            availableLoading.onFalse();
        }
    };

    const agpaySubmit = async () => {
        try {
            agSubmited.onTrue();
            agSubmiting.onTrue();
            if (agpayValues.amount <= 0) return;
            if (!agpayValues.userAccountNum) return;
            if (!agpayValues.userName) return;
            if (!agpayValues.userCert) return;
            await paymentApi.withdraw({
                amount: Number(agpayValues.amount),
                payoutType: 'agpayment',
                currency: balance.currency,
                data: agpayValues
            });
            enqueueSnackbar('Successfully sent request!', { variant: 'success' });
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            agSubmiting.onFalse();
        }
    };

    const handleClose = () => {
        setAmount('');
        getCurrencyState.onFalse();
        setOpen(false);
    };

    const renderNowpayment = (
        <DialogContent sx={{ mb: 5 }}>
            <Stack flexDirection="row" gap={1} sx={{ py: 2 }}>
                <Typography variant="h6" color="primary">
                    Available balance:
                </Typography>
                <Typography variant="h6">{balance.amount.toFixed(2)}</Typography>
                <Typography variant="h6">{balance.currency}</Typography>
            </Stack>
            <Stack gap={2}>
                <TextField
                    label={t('amount')}
                    type="number"
                    disabled={getCurrencyState.value}
                    value={amount}
                    onChange={handleAmountChange}
                    error={error}
                    helperText={error ? t('please_enter_a_valid_positive_number') : ''}
                    autoFocus
                    inputProps={{ min: 0, step: 0.01 }}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'text.secondary'
                        }
                    }}
                />
                {!getCurrencyState.value ? (
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={error || amount === '' || amount <= 0}
                        loading={availableLoading.value}
                        onClick={getAvailableCurrencies}
                    >
                        Next
                    </Button>
                ) : (
                    <Stack gap={2}>
                        <SelectNetwork
                            cryptoCurrencies={currencyList}
                            networks={networks}
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                        />
                        <TextField
                            label={t('wallet_address')}
                            type="text"
                            value={walletAddress}
                            onChange={(e) => handleWalletAddressChange(e.target.value)}
                            error={error}
                            helperText={error ? t('please_enter_a_valid_wallet_address') : ''}
                            autoFocus
                            inputProps={{ min: 0, step: 0.01 }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: 'text.secondary'
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={selectedValue === '' || walletAddress === ''}
                            loading={availableLoading.value}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Stack>
                )}
            </Stack>
        </DialogContent>
    );

    const renderAgpayment = (
        <DialogContent sx={{ mb: 5 }}>
            <Stack flexDirection="row" gap={1} sx={{ py: 2 }}>
                <Typography variant="h6" color="primary">
                    Available balance:
                </Typography>
                <Typography variant="h6">{balance.amount.toFixed(2)}</Typography>
                <Typography variant="h6">{balance.currency}</Typography>
            </Stack>
            <Stack spacing={2} sx={{ my: 1 }}>
                <TextField
                    type="number"
                    label="Amount"
                    value={agpayValues.amount}
                    inputProps={{ min: 0, step: 1 }}
                    error={agSubmited.value && !agpayValues.amount}
                    onChange={(e: any) => onAgpayValueChange({ amount: Number(e.target.value) })}
                />
                <TextField
                    label="Account Number"
                    value={agpayValues.userAccountNum}
                    error={agSubmited.value && !agpayValues.userAccountNum}
                    onChange={(e: any) => onAgpayValueChange({ userAccountNum: e.target.value })}
                />
                <TextField
                    label="Account Type"
                    value={agpayValues.userAccountType}
                    select
                    onChange={(e: any) => onAgpayValueChange({ userAccountType: e.target.value })}
                >
                    {['EMAIL', 'PHONE', 'CPF', 'CNPJ'].map((item) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Certificate"
                    value={agpayValues.userCert}
                    error={agSubmited.value && !agpayValues.userCert}
                    onChange={(e: any) => onAgpayValueChange({ userCert: e.target.value })}
                />
                <TextField
                    label="User Name"
                    value={agpayValues.userName}
                    error={agSubmited.value && !agpayValues.userName}
                    onChange={(e: any) => onAgpayValueChange({ userName: e.target.value })}
                />
                <LoadingButton
                    loading={agSubmiting.value}
                    variant="contained"
                    color="primary"
                    onClick={() => agpaySubmit()}
                >
                    Submit
                </LoadingButton>
            </Stack>
        </DialogContent>
    );
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <Typography variant="h6" component="div" textAlign="center">
                    {t('withdraw')}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                    size="large"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {balance.currency === 'BRL' && !pendingDeposit && (
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                    sx={{
                        width: '100%',
                        '& .MuiTabs-list': {
                            justifyContent: 'center'
                        }
                    }}
                >
                    <Tab sx={{ width: '40%' }} label={t('crypto')} />
                    <Tab sx={{ width: '40%' }} label={t('fiat')} />
                </Tabs>
            )}
            {tabValue === 0 ? renderNowpayment : renderAgpayment}
        </Dialog>
    );
};
