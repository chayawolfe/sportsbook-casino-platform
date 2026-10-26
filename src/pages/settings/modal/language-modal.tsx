import { useState } from 'react';
import { allLangs, useTranslate } from 'locales';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Button, Dialog, DialogContent, DialogTitle, Radio, styled, TextField, Typography } from '@mui/material';
// api
import { updatePreference } from 'api';
// components
import { useSettingsContext } from 'components/settings';
// hooks
import { useAuth } from 'hooks/use-auth-context';

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

const LanguageModal = () => {
    const { language, setLanguage } = useAuth();
    const { t, onChangeLang } = useTranslate();
    const { modal, onToggleModal } = useSettingsContext();

    const [searchQuery, setSearchQuery] = useState('');

    const filteredLanguages = allLangs.filter((language) =>
        language.value.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const updateLanguage = async (value: string) => {
        try {
            updatePreference({ language: value });
        } catch (error) {
            console.log(error);
        }
        onChangeLang(value);
        setLanguage(value);
    };

    return (
        <Dialog
            open={modal === 'LANGUAGE'}
            onClose={() => onToggleModal('')}
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
                {t('language')}
                <Button
                    sx={{ minWidth: 'auto', p: 0.5, bgcolor: 'background.layer5' }}
                    onClick={() => onToggleModal('')}
                >
                    <CloseIcon />
                </Button>
            </DialogTitle>

            <DialogContent>
                <TextField
                    fullWidth
                    placeholder={t('search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        mb: 1.5,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3
                        },
                        '& .MuiOutlinedInput-input': {
                            color: 'text.primary'
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        )
                    }}
                />

                {filteredLanguages.map((item) => (
                    <StyledRadioButton key={item.value} onClick={() => updateLanguage(item.value)}>
                        <Radio checked={language === item.value} sx={{ padding: 0.5 }} />
                        <Typography sx={{ ml: 1 }}>{item.label}</Typography>
                    </StyledRadioButton>
                ))}
            </DialogContent>
        </Dialog>
    );
};

export default LanguageModal;
