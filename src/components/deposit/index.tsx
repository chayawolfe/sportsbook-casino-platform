import { useSnackbar } from 'notistack';
import { useTranslate } from 'locales';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
// @mui
import {
    Tab,
    Box,
    Tabs,
    Menu,
    Stack,
    Button,
    Select,
    Dialog,
    MenuItem,
    useTheme,
    InputBase,
    TextField,
    InputLabel,
    Typography,
    IconButton,
    FormControl,
    ListItemText,
    DialogTitle,
    DialogContent,
    DialogActions,
    useMediaQuery,
    Avatar,
    ButtonBase,
    InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// api
import { nowpayDeposit } from 'api';
import { paymentApi } from 'api/payment.api';
// types
import { IDeposit } from 'types/deposit';
import { ICryptoCurrency } from 'types/user';
// components
import { useSettingsContext } from 'components/settings';
// store
import { useSelector } from 'store/store';
//
import PendingDeposit from './pending';

interface ICurrency {
    id: number;
    code: string;
    name: string;
    logo_url: string;
}

const ITEM_HEIGHT = 48;
const VISIBLE_COUNT = 6;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP
        }
    }
};

export const DepositDialog = () => {
    const theme = useTheme();
    const { t } = useTranslate();
    const balance = useSelector((state) => state.balance);
    const { cryptoCurrencies } = useSelector((state) => state.setting);
    const { enqueueSnackbar } = useSnackbar();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { modal, onToggleModal } = useSettingsContext();

    const networks = useMemo(() => {
        if (Object.keys(cryptoCurrencies).length > 0) {
            return Object.keys(cryptoCurrencies);
        }
        return [];
    }, [cryptoCurrencies]);

    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [amount, setAmount] = useState<number | ''>('');
    const [currencies, setCurrencies] = useState<ICurrency[]>([]);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [providerSearch, setProviderSearch] = useState<string>('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedNetwork, setSelectedNetwork] = useState<string>(networks[0] || '');
    const [pendingDeposit, setPendingDeposit] = useState<IDeposit | null>(null);

    const commonCurrencies = useMemo(() => {
        const cryptoCurrency: any = Object.values(cryptoCurrencies);
        const merged: ICryptoCurrency[] = [].concat(...cryptoCurrency);
        return merged.filter((item: ICryptoCurrency) => item.common);
    }, [cryptoCurrencies]);

    const filteredCurrencies = useMemo(() => {
        return currencies.filter((item: any) => item?.name?.toLowerCase().includes(providerSearch.toLowerCase()));
    }, [currencies, providerSearch]);

    const selectedItem = useMemo(() => {
        return currencies.find((item: any) => item.code === selectedValue) || currencies[0];
    }, [currencies, selectedValue]);

    const resetAll = () => {
        onToggleModal('');
    };

    const selectToken = (crypto: ICryptoCurrency) => {
        setSelectedNetwork(crypto.network);
        setSelectedValue(crypto.code);
    };

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberValue = Number(value);

        if (value === '' || isNaN(numberValue) || numberValue <= 0) {
            setError(true);
            setAmount(value === '' ? '' : numberValue);
        } else {
            setError(false);
            setAmount(numberValue);
        }
    };

    const getPendingDeposit = async () => {
        try {
            const response = await paymentApi.getPendingDeposit();
            setPendingDeposit(response);
        } catch (error: any) {
            enqueueSnackbar(typeof error === 'string' ? error : error.message, { variant: 'error' });
        }
    };

    const cancelDeposit = async (depositId: string) => {
        try {
            await paymentApi.cancelDeposit({ depositId });
            setPendingDeposit(null);
            enqueueSnackbar('Your request canceled successfully!');
        } catch (error: any) {
            enqueueSnackbar(typeof error === 'string' ? error : error.message, { variant: 'error' });
        }
    };

    const handleSubmit = async () => {
        if (!error && typeof amount === 'number' && amount > 0) {
            try {
                setLoading(true);
                if (tabValue === 0) {
                    if (!selectedItem) return;
                    const response = await nowpayDeposit(amount, selectedItem.code);
                    if (response.status) {
                        setPendingDeposit(response.pendingDeposit);
                    } else {
                        enqueueSnackbar(response.message, { variant: 'error' });
                    }
                } else if (tabValue === 1) {
                    if (amount < 100) {
                        enqueueSnackbar(t('payment.minBRL'), { variant: 'info' });
                        return;
                    }
                    const response = await paymentApi.agpaymentDeposit({ amount });
                    if (response.status) {
                        setPendingDeposit(response.pendingDeposit);
                    } else {
                        enqueueSnackbar(response.message, { variant: 'error' });
                    }
                } else if (tabValue === 2) {
                    const response = await paymentApi.gspaymentDeposit({ amount });
                    if (response.status) {
                        setPendingDeposit(response.pendingDeposit);
                        window.open(response.pendingDeposit.data.payurl);
                    } else {
                        enqueueSnackbar(response.message, { variant: 'error' });
                    }
                }
            } catch (error: any) {
                enqueueSnackbar(error.message, { variant: 'error' });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setIsOpen((prev) => !prev);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsOpen((prev) => !prev);
        setProviderSearch('');
    };

    const handleSelect = (code: string) => {
        setSelectedValue(code);
        handleClose();
    };

    useEffect(() => {
        if (modal === 'DEPOSIT') {
            getPendingDeposit();
        }
    }, [modal]);

    useEffect(() => {
        if (selectedNetwork !== '' && Object.keys(cryptoCurrencies).length > 0) {
            setCurrencies(cryptoCurrencies[selectedNetwork] || []);
        }
    }, [selectedNetwork]);

    const Row = ({ index, style }: ListChildComponentProps) => {
        const item = filteredCurrencies[index];
        return (
            <MenuItem
                key={item.id}
                selected={item.code === selectedValue}
                onClick={() => handleSelect(item.code)}
                style={style}
            >
                <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Box
                        component="img"
                        src={`http://nowpayments.io${item.logo_url}`}
                        alt={item.code}
                        sx={{ width: 20, height: 20 }}
                    />
                    <ListItemText primary={item.name} />
                </Stack>
            </MenuItem>
        );
    };

    const renderNowpayment = !pendingDeposit && (
        <DialogContent dividers sx={{ mt: 2 }}>
            <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', pb: 1, mb: 1 }}>
                <Stack direction="row" spacing={1}>
                    {commonCurrencies.map((token, index) => (
                        <ButtonBase
                            onClick={() => selectToken(token)}
                            key={index}
                            sx={{ borderRadius: 1, px: 1, py: 0.5 }}
                        >
                            <Stack spacing={1} direction="row" alignItems="center">
                                <Avatar
                                    src={`http://nowpayments.io${token.logo_url}`}
                                    alt={token.name}
                                    sx={{ width: 30, height: 30 }}
                                />
                                <Typography variant="body2">{token.name}</Typography>
                            </Stack>
                        </ButtonBase>
                    ))}
                </Stack>
            </Box>
            <Stack direction={{ md: 'row', sx: 'column' }} alignItems="center" gap={1}>
                <Stack width={1}>
                    <InputLabel>{t('payment.selectNetwork')}</InputLabel>
                    <Select
                        size="small"
                        sx={{ textTransform: 'uppercase' }}
                        MenuProps={MenuProps}
                        value={selectedNetwork}
                        onChange={(e) => setSelectedNetwork(e.target.value)}
                    >
                        {networks.map((item, i) => (
                            <MenuItem key={i} value={item} sx={{ textTransform: 'uppercase' }}>
                                {item === 'null' ? 'No network' : item}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
                <Stack width={1}>
                    <InputLabel>{t('payment.selectCurrency')}</InputLabel>
                    <FormControl sx={{ width: 1 }}>
                        <Box
                            onClick={handleOpen}
                            sx={{
                                border: '1px solid',
                                borderColor: 'background.border',
                                borderRadius: 2,
                                px: 2,
                                py: 1,
                                bgcolor: 'background.default',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                outline: 'none',
                                '&:hover': {
                                    borderColor: 'text.primary'
                                },
                                ...(isOpen && {
                                    border: '2px solid',
                                    borderColor: 'primary.main'
                                })
                            }}
                        >
                            {selectedItem ? (
                                <Stack direction="row" alignItems="center" gap={1} maxWidth={0.9}>
                                    <Box
                                        component="img"
                                        src={`http://nowpayments.io${selectedItem.logo_url}`}
                                        alt={selectedItem.code}
                                        sx={{ width: 20, height: 20 }}
                                    />
                                    <Typography noWrap fontWeight={800} variant="caption">
                                        {selectedItem.name}
                                    </Typography>
                                </Stack>
                            ) : (
                                <Typography color="text.secondary">{t('common.currency')}</Typography>
                            )}

                            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * (VISIBLE_COUNT + 2) + ITEM_PADDING_TOP,
                                    width: anchorEl ? anchorEl.clientWidth : 200
                                }
                            }}
                        >
                            <Box sx={{ px: 1, pt: 1, pb: 1 }}>
                                <InputBase
                                    placeholder={t('payment.searchToken')}
                                    fullWidth
                                    value={providerSearch}
                                    onChange={(e) => setProviderSearch(e.target.value)}
                                    sx={{
                                        bgcolor: 'background.layer4',
                                        borderRadius: 1,
                                        px: 1,
                                        fontSize: 14,
                                        height: 36,
                                        mb: 1
                                    }}
                                />
                            </Box>
                            {filteredCurrencies.length > 0 ? (
                                <FixedSizeList
                                    height={Math.min(VISIBLE_COUNT, filteredCurrencies.length) * ITEM_HEIGHT}
                                    width="100%"
                                    style={{ overflowX: 'hidden' }}
                                    itemSize={ITEM_HEIGHT}
                                    itemCount={filteredCurrencies.length}
                                    overscanCount={6}
                                >
                                    {Row}
                                </FixedSizeList>
                            ) : (
                                <MenuItem disabled>{t('no_results_found')}</MenuItem>
                            )}
                        </Menu>
                    </FormControl>
                </Stack>
            </Stack>

            <Stack sx={{ pt: 1, mt: 1 }}>
                <InputLabel>{t('common.amount')}</InputLabel>
                <TextField
                    size="small"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    error={error}
                    helperText={error ? t('payment.enterValidNumber') : ''}
                    fullWidth
                    autoFocus
                    inputProps={{ min: 0, step: 0.01 }}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'text.secondary'
                        }
                    }}
                />
            </Stack>
        </DialogContent>
    );

    const renderAgpayment = !pendingDeposit && (
        <DialogContent dividers sx={{ mt: 2 }}>
            <Stack sx={{ pt: 1 }}>
                <Box sx={{ height: 80, mx: 'auto', mb: 1 }}>
                    <Box component="img" src="/assets/pix-logo.png" sx={{ height: 1 }} />
                </Box>
                <InputLabel>{t('common.amount')}</InputLabel>
                <TextField
                    size="small"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    error={error}
                    helperText={error ? t('payment.enterValidNumber') : t('payment.minBRL')}
                    fullWidth
                    autoFocus
                    inputProps={{ min: 100, step: 5 }}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'text.secondary'
                        }
                    }}
                />
            </Stack>
        </DialogContent>
    );

    const renderGspayment = !pendingDeposit && (
        <DialogContent dividers sx={{ mt: 2 }}>
            <Stack sx={{ pt: 1 }}>
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
                <InputLabel>{t('common.amount')}</InputLabel>
                <TextField
                    size="small"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    error={error}
                    fullWidth
                    autoFocus
                    inputProps={{ min: 50, step: 5 }}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'text.secondary'
                        }
                    }}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">USD</InputAdornment>
                        }
                    }}
                />
            </Stack>
        </DialogContent>
    );

    return (
        <Dialog open={modal === 'DEPOSIT'} onClose={resetAll} maxWidth="xs" fullScreen={isMobile} fullWidth>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <Typography variant="h6" component="div" textAlign="center">
                    {t('payment.deposit')}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={resetAll}
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
            {!pendingDeposit && (
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        variant="fullWidth"
                        value={tabValue}
                        sx={{ button: { margin: '0px !important' } }}
                        onChange={handleTabChange}
                    >
                        <Tab value={0} label={t('crypto')} />
                        {balance.currency === 'BRL' && <Tab value={1} label="Pix payment" />}
                        <Tab value={2} label=" Visa / MasterCard" />
                    </Tabs>
                </Box>
            )}

            {pendingDeposit && <PendingDeposit pendingDeposit={pendingDeposit} cancelDeposit={cancelDeposit} />}

            {tabValue === 0 && renderNowpayment}
            {tabValue === 1 && renderAgpayment}
            {tabValue === 2 && renderGspayment}

            {!pendingDeposit && (
                <DialogActions sx={{ px: 3, pb: { md: 2, xs: 10 } }}>
                    <Button onClick={() => onToggleModal('')} color="error" variant="outlined">
                        {t('common.cancel')}
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={error || amount === '' || amount <= 0}
                        color="primary"
                        loading={loading}
                    >
                        {t('common.submit')}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};
