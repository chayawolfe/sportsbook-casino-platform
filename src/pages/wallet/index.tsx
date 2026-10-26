import { Box, Grid, Stack, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useTranslate } from 'locales';
import { Outlet } from 'react-router-dom';
import { usePathname, useRouter } from 'routes/hook';
import { paths } from 'routes/paths';

const WalletPage = () => {
    const { t } = useTranslate();
    const router = useRouter();
    const pathname = usePathname();

    const walletOptions = [
        {
            label: t('balance'),
            linkTo: paths.wallet.balance,
            icon: '/assets/icons/wallet-1.svg'
        },
        {
            label: t('deposit'),
            linkTo: paths.wallet.deposit,
            icon: '/assets/icons/deposit.svg'
        },
        {
            label: t('withdraw'),
            linkTo: paths.wallet.withdraw,
            icon: '/assets/icons/withdraw-1.svg'
        },
        {
            label: t('bonus.title'),
            linkTo: paths.wallet.bonus,
            icon: '/assets/icons/bonus.svg'
        },
        {
            label: t('transaction'),
            linkTo: paths.wallet.transaction,
            icon: '/assets/icons/transaction-1.svg'
        },
        {
            label: t('bet_history'),
            linkTo: paths.wallet.betHistory,
            icon: '/assets/icons/history-1.svg'
        }
    ];

    return (
        <Stack direction="column" gap={2}>
            <Typography sx={{ fontSize: 18, fontWeight: 800, lineHeight: '2rem', textTransform: 'uppercase' }}>
                {t('wallet')}
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Stack
                        direction={{ xs: 'row', sm: 'column' }}
                        sx={{
                            p: { xs: 0.5, sm: 1 },
                            bgcolor: 'background.layer4',
                            borderRadius: 3,
                            overflow: 'auto'
                        }}
                    >
                        {walletOptions.map((item, index) => (
                            <MenuItem
                                key={index}
                                sx={{
                                    minHeight: { xs: 15, sm: 'auto' },
                                    width: '100%',
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
                                        sx={{ width: 16, height: 16 }}
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

export default WalletPage;
