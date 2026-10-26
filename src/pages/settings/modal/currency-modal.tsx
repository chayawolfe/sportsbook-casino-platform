import { useTranslate } from 'locales';
import React, { useState } from 'react';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Button, Dialog, DialogContent, DialogTitle, Radio, styled, TextField, Typography } from '@mui/material';
// types
import { ICurrency } from 'types/user';
//
import { useSelector } from 'store/store';

const StyledRadioButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    marginTop: '4px',
    borderRadius: '8px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    }
}));

interface CurrencyModalProps {
    open: boolean;
    onClose: () => void;
    selectedCurrency: ICurrency | null;
}

const CurrencyModal: React.FC<CurrencyModalProps> = ({ open, onClose, selectedCurrency }) => {
    const { t } = useTranslate();
    const { currencies } = useSelector((state) => state.setting);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCurrencies = currencies.filter((currency: ICurrency) =>
        currency.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectNewCurrency = async (currencyId: string) => {
        console.log(currencyId);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    height: { sm: '75vh' },
                    backgroundColor: 'background.default'
                }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                {t('view_in_currency')}
                <Button sx={{ minWidth: 'auto', p: 0.5, bgcolor: 'background.layer5' }} onClick={onClose}>
                    <CloseIcon />
                </Button>
            </DialogTitle>

            <DialogContent>
                <Typography color="textSecondary" sx={{ mb: 1.5 }}>
                    {t('the_currencies_will_be_shown_in_approximated_values')}
                </Typography>

                <TextField
                    fullWidth
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ mb: 1.5, borderRadius: 200 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        )
                    }}
                />

                {/* <StyledRadioButton >
                    <Radio checked={selectedCurrency === null} sx={{ padding: 0.5 }} />
                    <Box sx={{ ml: 1 }}>None</Box>
                </StyledRadioButton>

                <Alert severity="info" icon={<InfoIcon />} sx={{ my: 1 }}>
                    When none is selected, some amounts are still displayed in the last selected fiat currency.(RUB)
                </Alert> */}

                {filteredCurrencies.map((currency: ICurrency) => (
                    <StyledRadioButton key={currency._id} onClick={() => selectNewCurrency(currency._id)}>
                        <Radio checked={selectedCurrency?.name === currency.name} sx={{ padding: 0.5 }} />
                        <Box
                            component="img"
                            src={currency.icon}
                            alt={currency.name}
                            sx={{ width: 24, height: 24, ml: 1 }}
                        />
                        <Typography sx={{ ml: 1 }}>{currency.name}</Typography>
                    </StyledRadioButton>
                ))}
            </DialogContent>
        </Dialog>
    );
};

export default CurrencyModal;
