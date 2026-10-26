import { Box, Grid, Stack, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useTranslate } from 'locales';
import { Outlet } from 'react-router-dom';
import { usePathname, useRouter } from 'routes/hook';
import { paths } from 'routes/paths';

const SettingPage = () => {
    const { t } = useTranslate();
    const router = useRouter();
    const pathname = usePathname();

    const settingOptions = [
        {
            label: t('account_info'),
            linkTo: paths.settings.accountInfo,
            icon: '/assets/icons/account-2.svg'
        },
        {
            label: t('security'),
            linkTo: paths.settings.security,
            icon: '/assets/icons/security-2.svg'
        },
        {
            label: t('preferences'),
            linkTo: paths.settings.preferences,
            icon: '/assets/icons/preference-2.svg'
        },
        {
            label: t('personal_verification'),
            linkTo: paths.settings.verification,
            icon: '/assets/icons/verification-2.svg'
        }
    ];

    return (
        <Stack direction="column" gap={2}>
            <Typography sx={{ fontSize: 18, fontWeight: 800, lineHeight: '2rem' }}>GLOBAL SETTINGS</Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Stack
                        direction={{ xs: 'row', sm: 'column' }}
                        sx={{ p: { xs: 0.5, sm: 1 }, bgcolor: 'background.layer4', borderRadius: 3, overflow: 'auto' }}
                    >
                        {settingOptions.map((item, index) => (
                            <MenuItem
                                key={index}
                                sx={{
                                    minHeight: { xs: 15, sm: 'auto' },
                                    minWidth: 'fit-content',
                                    bgcolor: pathname === item.linkTo ? 'background.layer3' : 'transparent'
                                }}
                                onClick={() => router.push(item.linkTo)}
                            >
                                <Stack direction="row" alignItems="center" gap={0.5} p={0.3}>
                                    <Box
                                        component="img"
                                        src={item.icon}
                                        alt={item.label}
                                        sx={{ width: 20, height: 20 }}
                                    />
                                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                        {item.label}
                                    </Typography>
                                </Stack>
                            </MenuItem>
                        ))}
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Outlet />
                </Grid>
            </Grid>
        </Stack>
    );
};

export default SettingPage;
