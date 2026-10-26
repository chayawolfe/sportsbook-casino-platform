import { useTranslate } from 'locales';
import { useEffect, useState } from 'react';
// @mui
import EditIcon from '@mui/icons-material/Edit';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, Button, Paper, Stack, styled, Switch, Typography } from '@mui/material';
// components
import { useSettingsContext } from 'components/settings';
// hooks
import { useAuth } from 'hooks/use-auth-context';
// api
import { updatePreference } from 'api';
//
import CurrencyModal from '../modal/currency-modal';

const languages: any = {
    en: 'English',
    ru: 'Russian'
};

const PreferenceItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: '48px',
    width: '100%',
    '& > span': {
        fontWeight: 600
    }
}));

const SettingButton = styled(Button)(({ theme }) => ({
    height: '32px',
    padding: '0 8px',
    paddingBottom: '2px',
    textTransform: 'none',
    backgroundColor: theme.palette.background.layer5,
    borderRadius: theme.shape.borderRadius
}));

const PreferenceSection = styled(Paper)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    backgroundColor: theme.palette.background.layer4,
    borderRadius: theme.shape.borderRadius * 2,
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2, 3),
        marginBottom: theme.spacing(2)
    }
}));

const SectionHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: '44px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(1.5),
    '& > span': {
        fontWeight: 800
    }
}));

const DisplayModeToggle = styled(Box)(({ theme }) => ({
    height: '44px',
    padding: '4px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.layer5,
    display: 'flex',
    position: 'relative',
    '& > div': {
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const PreferencesPage = () => {
    const { t } = useTranslate();
    const settings = useSettingsContext();
    const { onToggleModal } = useSettingsContext();
    const { preference, language, updatePreferenceData } = useAuth();

    const [openCurrency, setOpenCurrency] = useState(false);
    const [displayMode, setDisplayMode] = useState<'dark' | 'light'>(settings.themeMode);

    const handlePreferenceChange = async (key: string, value: any) => {
        await updatePreference({ [key]: value });
        await updatePreferenceData(key, value);
    };

    useEffect(() => {
        settings.onUpdate('themeMode', displayMode);
    }, [displayMode]);

    return (
        <Box>
            <PreferenceSection>
                <SectionHeader>
                    <Typography fontWeight="bold" sx={{ fontSize: 16 }}>
                        {t('account_preferences')}
                    </Typography>
                </SectionHeader>

                <Stack spacing={1.5}>
                    {/* <PreferenceItem>
                        <Typography>{t('view_in_currency')}</Typography>
                        <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                            <SettingButton onClick={() => setOpenCurrency(true)}>
                                <Box
                                    component="img"
                                    src={preference?.currency?.icon}
                                    alt="coin"
                                    style={{ width: 16, height: 16, marginRight: 4 }}
                                />
                                <Typography variant="body2" fontWeight="600">
                                    {preference?.currency.name}
                                </Typography>
                            </SettingButton>
                            <EditIcon
                                sx={{ ml: 1, color: 'text.secondary', cursor: 'pointer' }}
                                onClick={() => setOpenCurrency(true)}
                            />
                        </Box>
                    </PreferenceItem> */}

                    <PreferenceItem>
                        <Typography>{t('change_language')}</Typography>
                        <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                            <SettingButton onClick={() => onToggleModal('LANGUAGE')}>
                                <Typography variant="body2" fontWeight="600">
                                    {languages[language]}
                                </Typography>
                            </SettingButton>
                            <EditIcon
                                sx={{ ml: 1, color: 'text.secondary', cursor: 'pointer' }}
                                onClick={() => onToggleModal('LANGUAGE')}
                            />
                        </Box>
                    </PreferenceItem>

                    <PreferenceItem>
                        <Typography>{t('display_mode')}</Typography>
                        <DisplayModeToggle sx={{ ml: 'auto', cursor: 'pointer' }}>
                            <Box onClick={() => setDisplayMode('dark')}>
                                <DarkModeIcon
                                    color={displayMode === 'dark' ? 'primary' : 'disabled'}
                                    sx={{ zIndex: 999 }}
                                />
                            </Box>
                            <Box onClick={() => setDisplayMode('light')}>
                                <LightModeIcon
                                    color={displayMode === 'light' ? 'primary' : 'disabled'}
                                    sx={{ zIndex: 999 }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: '36px',
                                    height: '36px',
                                    backgroundColor: 'background.layer2',
                                    borderRadius: 1,
                                    zIndex: 0,
                                    transition: 'all 0.3s ease-out',
                                    left: displayMode === 'dark' ? '4px' : '40px'
                                }}
                            />
                        </DisplayModeToggle>
                    </PreferenceItem>
                </Stack>
            </PreferenceSection>

            <PreferenceSection>
                <SectionHeader>
                    <Typography fontWeight="bold" sx={{ fontSize: 16 }}>
                        {t('privacy_preferences')}
                    </Typography>
                </SectionHeader>

                <Stack spacing={1.5}>
                    {/* <PreferenceItem>
                        <Typography>Hide my gaming data on profile</Typography>
                        <Switch
                            size="medium"
                            checked={preferences.hideGamingData}
                            onChange={() => handlePreferenceChange('hideGamingData')}
                            sx={{ ml: 'auto' }}
                        />
                    </PreferenceItem> */}

                    <PreferenceItem>
                        <Typography>{t('hide_my_username_from_public_lists')}</Typography>
                        <Switch
                            size="medium"
                            checked={preference?.hideUsername}
                            onChange={(_, value) => handlePreferenceChange('hideUsername', value)}
                            sx={{ ml: 'auto' }}
                        />
                    </PreferenceItem>

                    <PreferenceItem>
                        <Typography>{t('max_bet_alert')}</Typography>
                        <Switch
                            size="medium"
                            checked={preference?.maxBetAlert}
                            onChange={(_, value) => handlePreferenceChange('maxBetAlert', value)}
                            sx={{ ml: 'auto' }}
                        />
                    </PreferenceItem>
                </Stack>
            </PreferenceSection>

            <PreferenceSection>
                <SectionHeader>
                    <Typography fontWeight="bold" sx={{ fontSize: 16 }}>
                        {t('email_notifications')}
                    </Typography>
                </SectionHeader>

                <Stack spacing={1.5}>
                    <PreferenceItem>
                        <Typography>{t('receive_deposit_successful_email')}</Typography>
                        <Switch
                            size="medium"
                            checked={preference?.depositEmailNotify}
                            onChange={(e) => handlePreferenceChange('depositEmailNotify', e.target.value)}
                            sx={{ ml: 'auto' }}
                        />
                    </PreferenceItem>

                    <PreferenceItem>
                        <Typography>{t('receive_withdraw_successful_email')}</Typography>
                        <Switch
                            size="medium"
                            checked={preference?.withdrawEmailNotify}
                            onChange={(_, value) => handlePreferenceChange('withdrawEmailNotify', value)}
                            sx={{ ml: 'auto' }}
                        />
                    </PreferenceItem>
                </Stack>
            </PreferenceSection>

            <PreferenceSection>
                <SectionHeader>
                    <Typography fontWeight="bold" sx={{ fontSize: 16 }}>
                        {t('marketing')}
                    </Typography>
                </SectionHeader>

                <Stack spacing={1.5}>
                    <PreferenceItem>
                        <Typography>{t('receive_marketing_promotions_by_email')}</Typography>
                        <Switch
                            size="medium"
                            checked={preference?.marketingEmailNotify}
                            onChange={(_, value) => handlePreferenceChange('marketingEmailNotify', value)}
                            sx={{ ml: 'auto' }}
                        />
                    </PreferenceItem>
                </Stack>
            </PreferenceSection>

            <CurrencyModal
                open={openCurrency}
                onClose={() => setOpenCurrency(false)}
                selectedCurrency={preference?.currency}
            />
        </Box>
    );
};

export default PreferencesPage;
