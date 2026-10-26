import { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Avatar, Box, Button, Divider, Paper, Stack, styled, TextField, Typography } from '@mui/material';
import ColorButton from 'components/ColorButton';
import ProfileModal from 'pages/profile';
import { ASSETS } from 'utils/axios';
import { useAuth } from 'hooks/use-auth-context';
import SettingModal from '../modal/verification';
import { useTranslate } from 'locales';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.background.layer4
}));

const SectionHeader = styled(Box)(({ theme }) => ({
    height: 44,
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(1.5),
    borderBottom: `1px solid ${theme.palette.divider}`
}));

const AccountInfoPage = () => {
    const { t } = useTranslate();
    const { user } = useAuth();
    const [openProfile, setOpenProfile] = useState<string | null>(null);
    const [openSetting, setOpenSetting] = useState<string | null>(null);

    return (
        <Box sx={{ mx: 'auto' }}>
            <StyledPaper>
                <SectionHeader>
                    <Typography fontWeight="bold" sx={{ fontSize: 16 }}>
                        {t('profile_info')}
                    </Typography>
                </SectionHeader>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1.5 }}>
                    <Avatar src={ASSETS(user?.avatar)} sx={{ width: 60, height: 60 }} />
                    <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight="bold">
                            {t('username')}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {user?.username}
                        </Typography>
                        {/* <Typography variant="body2" fontWeight="bold" color="text.secondary" sx={{ mt: 0.5 }}>
                            User ID: {user?._id.slice(0, 4)}...{user?._id.slice(-4)}
                        </Typography> */}
                    </Box>
                    <ColorButton sx={{ ml: 'auto' }} onClick={() => setOpenProfile('edit-profile')}>
                        {t('edit')}
                    </ColorButton>
                </Stack>
            </StyledPaper>

            <StyledPaper>
                <SectionHeader>
                    <Typography fontWeight="bold" sx={{ fontSize: 16 }}>
                        {t('contact_info')}
                    </Typography>
                </SectionHeader>
                <Stack spacing={1.5} sx={{ mt: 1.5 }}>
                    <Box>
                        <Typography variant="body2" fontWeight="bold" color="text.secondary">
                            {t('e-mail_verification')}
                        </Typography>
                        {user.email ? (
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                alignItems={{ sm: 'center' }}
                                spacing={2}
                                sx={{ mt: 0.5 }}
                            >
                                <TextField
                                    size="small"
                                    fullWidth
                                    value={user.email}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                                <ColorButton
                                    disabled={user.emailVerified}
                                    sx={{ width: { xs: 1, sm: 'auto' } }}
                                    onClick={() => setOpenSetting('email-verification')}
                                >
                                    {t('verify')}
                                </ColorButton>
                            </Stack>
                        ) : (
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                alignItems={{ sm: 'center' }}
                                spacing={2}
                                sx={{ mt: 0.5 }}
                            >
                                <Typography variant="body2" fontWeight="bold" color="text.secondary" sx={{ flex: 1 }}>
                                    {t('verify_your_email_address_is_valid_and_accessible_by_you.')}
                                </Typography>
                                <ColorButton
                                    sx={{ width: { xs: 1, sm: 'auto' } }}
                                    onClick={() => setOpenSetting('email-verification')}
                                >
                                    {t('add')}
                                </ColorButton>
                            </Stack>
                        )}
                    </Box>
                    <Box>
                        <Typography variant="body2" fontWeight="bold" color="text.secondary">
                            {t('phone_number')}
                        </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            alignItems={{ sm: 'center' }}
                            spacing={2}
                            sx={{ mt: 0.5 }}
                        >
                            <Typography variant="body2" fontWeight="bold" color="text.secondary" sx={{ flex: 1 }}>
                                {t('verify_your_phone_number_and_you_can_use_the_phone_as_your_second_login_method')}
                            </Typography>
                            <ColorButton
                                sx={{ width: { xs: 1, sm: 'auto' } }}
                                onClick={() => setOpenSetting('phone-verification')}
                            >
                                {t('add')}
                            </ColorButton>
                        </Stack>
                    </Box>
                </Stack>
            </StyledPaper>

            {/* <StyledPaper>
                <SectionHeader>
                    <Typography fontWeight="bold" sx={{ fontSize: 16 }}>
                        {t('account_connections')}
                    </Typography>
                </SectionHeader>
                <Stack divider={<Divider />}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={2}
                        sx={{ py: 2 }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <GoogleIcon color="action" />
                            <Box>
                                <Typography variant="body1" fontWeight="medium">
                                    Google
                                </Typography>
                                <Typography variant="body2" fontWeight="bold" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {t('connected')}
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                            >
                                <Avatar
                                    src="/modules/account2/assets/tips-0155c3da.png"
                                    sx={{ width: 28, height: 28 }}
                                />
                                <Typography variant="body2" fontWeight="bold" color="text.secondary">
                                    it15***@gmail.com
                                </Typography>
                            </Stack>
                            <Button variant="outlined" color="inherit">
                                {t('disconnect')}
                            </Button>
                        </Stack>
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={2}
                        sx={{ py: 2 }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <TelegramIcon color="action" />
                            <Box>
                                <Typography variant="body1" fontWeight="medium">
                                    Telegram
                                </Typography>
                                <Typography variant="body2" fontWeight="bold" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {t('not_connected')}
                                </Typography>
                            </Box>
                        </Stack>
                        <ColorButton>{t('connect')}</ColorButton>
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={2}
                        sx={{ py: 2 }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <TwitterIcon color="action" />
                            <Box>
                                <Typography variant="body1" fontWeight="medium">
                                    Twitter
                                </Typography>
                                <Typography variant="body2" fontWeight="bold" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {t('not_connected')}
                                </Typography>
                            </Box>
                        </Stack>
                        <ColorButton>{t('connected')}</ColorButton>
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={2}
                        sx={{ py: 2 }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <SportsEsportsIcon color="action" />
                            <Box>
                                <Typography variant="body1" fontWeight="medium">
                                    Steam
                                </Typography>
                                <Typography variant="body2" fontWeight="bold" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {t('not_connected')}
                                </Typography>
                            </Box>
                        </Stack>
                        <ColorButton>{t('connected')}</ColorButton>
                    </Stack>
                </Stack>
            </StyledPaper> */}

            <ProfileModal open={openProfile} setOpen={setOpenProfile} />
            <SettingModal open={openSetting} setOpen={setOpenSetting} />
        </Box>
    );
};

export default AccountInfoPage;
