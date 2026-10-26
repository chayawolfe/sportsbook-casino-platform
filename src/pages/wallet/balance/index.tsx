import { useTranslate } from 'locales';
// @mui
import { Box, Divider, Stack, Typography } from '@mui/material';
// store
import { useSelector } from 'store/store';

interface BalanceBoxProps {
    label: string;
    value: string;
    isPrimary?: boolean;
}

const BalancePage = () => {
    const { t } = useTranslate();
    const balanceStore = useSelector((state: any) => state.balance);
    const balanceBoxStyle = { px: { xs: 1, sm: 2 }, fontSize: { xs: 12, sm: 14 }, fontWeight: 600 };
    const balanceLabelStyle = { color: 'text.secondary' };
    const balanceValueStyle = { fontWeight: 'extrabold' };

    const BalanceBox = ({ label, value, isPrimary = false }: BalanceBoxProps) => (
        <Box sx={balanceBoxStyle}>
            <Typography variant="inherit" sx={balanceLabelStyle}>
                {label}
            </Typography>
            <Stack direction="row" alignItems="center">
                <Typography sx={{ ...balanceValueStyle, fontSize: { xs: 18, sm: 20 }, fontWeight: 800, color: 'gold' }}>
                    {balanceStore.currency}&nbsp;{value}
                </Typography>
            </Stack>
        </Box>
    );

    return (
        <Stack
            direction="column"
            gap={2}
            sx={{ py: { xs: 1, sm: 2 }, px: { xs: 2, sm: 4 }, bgcolor: 'background.layer4', borderRadius: 3 }}
        >
            <Stack direction="row" alignItems="center" sx={{ borderRadius: 3, bgcolor: 'background.layer3', p: 2 }}>
                <Box
                    component="img"
                    src="/assets/images/coins/coin-5fa2fe4d.webp"
                    sx={{ width: 24, height: 24, mr: { xs: 1, sm: 2 } }}
                />
                <BalanceBox label={t('balance')} value={balanceStore.amount.toFixed(2)} isPrimary />
                <Divider orientation="vertical" flexItem />
                <BalanceBox label={t('pending')} value={balanceStore.pending.toFixed(2)} />
                <Divider orientation="vertical" flexItem />
                <BalanceBox label={t('bonus.title')} value={balanceStore.bonus.toFixed(2)} />
            </Stack>
        </Stack>
    );
};

export default BalancePage;
