import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import { Box, Card, Divider, Grid, MenuItem, Select, Stack, Typography } from '@mui/material';
// icons
import { NumberTwoIcon, NumberOneIcon, CalculatorIcon, NumberThreeIcon, CircleDollarIcon } from 'icons';
import { fBalance } from 'utils/format-balance';

const RateRuleView = () => {
    const { t } = useTranslation();

    const [percent, setPercent] = useState(1);

    const result = useMemo(() => {
        return 1000 * 0.1 * 0.25 * percent;
    }, [percent]);

    const steps = useMemo(
        () => [
            {
                icon: <NumberOneIcon sx={{ fontSize: 71 }} />,
                title: t('rateRule.referral.steps.share.title'),
                content: t('rateRule.referral.steps.share.content')
            },
            {
                icon: <NumberTwoIcon sx={{ fontSize: 71 }} />,
                title: t('rateRule.referral.steps.get.title', { amount: 1000 }),
                content: t('rateRule.referral.steps.get.content')
            },
            {
                icon: <NumberThreeIcon sx={{ fontSize: 71 }} />,
                title: t('rateRule.referral.steps.level.title'),
                content: t('rateRule.referral.steps.level.content')
            }
        ],
        [t]
    );

    const WAGER_LIST = [
        {
            icon: '/assets/level-icons/bronze.png',
            level: 'VIP 04',
            wager: 1000,
            unlockAmount: '+0.50'
        },
        {
            icon: '/assets/level-icons/bronze.png',
            level: 'VIP 08',
            wager: 5000,
            unlockAmount: '+2.50'
        },
        {
            icon: '/assets/level-icons/bronze.png',
            level: 'VIP 14',
            wager: 17000,
            unlockAmount: '+5.00'
        },
        {
            icon: '/assets/level-icons/bronze.png',
            level: 'VIP 22',
            wager: 49000,
            unlockAmount: '+12.00'
        },
        {
            icon: '/assets/level-icons/bronze.png',
            level: 'VIP 30',
            wager: 129000,
            unlockAmount: '+25.00'
        },
        {
            icon: '/assets/level-icons/silver.png',
            level: 'VIP 38',
            wager: 321000,
            unlockAmount: '+50.00'
        },
        {
            icon: '/assets/level-icons/silver.png',
            level: 'VIP 46',
            wager: 769000,
            unlockAmount: '+80.00'
        },
        {
            icon: '/assets/level-icons/silver.png',
            level: 'VIP 54',
            wager: 1793000,
            unlockAmount: '+120.00'
        },
        {
            icon: '/assets/level-icons/silver.png',
            level: 'VIP 62',
            wager: 4097000,
            unlockAmount: '+205.00'
        },
        {
            icon: '/assets/level-icons/gold.png',
            level: 'VIP 70',
            wager: 9217000,
            unlockAmount: '+500.00'
        }
    ];

    return (
        <>
            <Stack>
                <Grid container spacing={2}>
                    <Grid size={{ md: 7, xs: 12 }}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: 1,
                                borderRadius: 2,
                                backgroundColor: 'background.card'
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent={{ md: 'flex-start', xs: 'center' }}
                                sx={{ p: 2, py: 1 }}
                                spacing={1}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                    {t('rateRule.commission.title')}
                                </Typography>
                            </Stack>
                            <Divider />
                            <Stack justifyContent="space-around" sx={{ p: 2, flex: 1, flexGrow: 1 }}>
                                <Stack flexDirection={{ md: 'row', xs: 'column' }} sx={{ wdith: 1, gap: 4 }}>
                                    {/* <Stack spacing={1} flex={1}>
                                        <Typography sx={{ fontWeight: 700, fontSize: 14, color: 'text.secondary' }}>
                                            {t('rateRule.commission.casino.title')}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                bgcolor: 'background.default',
                                                borderRadius: 2,
                                                px: 2,
                                                py: 1.5,
                                                fontSize: 12,
                                                textAlign: 'center'
                                            }}
                                        >
                                            {t('rateRule.commission.casino.formula')}
                                        </Typography>
                                    </Stack> */}
                                    <Stack spacing={1} flex={1}>
                                        <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                                            {t('rateRule.commission.thirdParty.title')}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                bgcolor: 'background.default',
                                                borderRadius: 2,
                                                px: 2,
                                                py: 1.5,
                                                fontSize: 12,
                                                textAlign: 'center'
                                            }}
                                        >
                                            {t('rateRule.commission.thirdParty.formula')}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack spacing={1}>
                                    <Typography sx={{ fontWeight: 700 }}>
                                        {t('rateRule.commission.sports.title')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            bgcolor: 'background.default',
                                            borderRadius: 2,
                                            px: 2,
                                            py: 1.5,
                                            fontSize: 12,
                                            textAlign: 'center'
                                        }}
                                    >
                                        {t('rateRule.commission.sports.formula')}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Card>
                    </Grid>
                    <Grid size={{ md: 5, xs: 12 }}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                backgroundColor: 'background.card'
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ p: 2, py: 1 }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <CalculatorIcon sx={{ color: 'text.secondary' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                        {t('rateRule.calculator.title')}
                                    </Typography>
                                </Stack>
                                {/* <Stack direction="row" alignItems="center" spacing={1}>
                                    <CircleDollarIcon />
                                    <Typography>{t('rateRule.calculator.currency')}</Typography>
                                </Stack> */}
                            </Stack>
                            <Divider />
                            <Stack sx={{ p: 2 }}>
                                <Stack
                                    direction={{ md: 'row', xs: 'column' }}
                                    alignItems={{ md: 'flex-end', xs: 'flex-start' }}
                                    sx={{ wdith: 1, gap: { md: 4, xs: 0 } }}
                                >
                                    <Stack spacing={1} flex={1} sx={{ width: { md: 'auto', xs: 1 } }}>
                                        <Typography sx={{ color: 'text.secondary' }}>Casino</Typography>
                                        <Typography
                                            sx={{
                                                bgcolor: 'background.default',
                                                borderRadius: 2,
                                                px: 2,
                                                py: 1.5,
                                                fontSize: 12,
                                                textAlign: 'center'
                                            }}
                                        >
                                            1,000
                                        </Typography>
                                    </Stack>
                                    <Typography sx={{ py: 1.5, textAlign: 'center', width: { md: 'auto', xs: 1 } }}>
                                        <Typography component="span" sx={{ color: 'primary.main' }}>
                                            x
                                        </Typography>{' '}
                                        1%{' '}
                                        <Typography component="span" sx={{ color: 'primary.main' }}>
                                            x
                                        </Typography>
                                    </Typography>
                                    <Stack spacing={1} flex={1} sx={{ width: { md: 'auto', xs: 1 } }}>
                                        <Typography sx={{ color: 'text.secondary' }}>Commission Rate</Typography>
                                        <Typography
                                            sx={{
                                                bgcolor: 'background.default',
                                                borderRadius: 2,
                                                px: 2,
                                                py: 1.5,
                                                fontSize: 12,
                                                textAlign: 'center'
                                            }}
                                        >
                                            25
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack sx={{ wdith: 1, gap: 1 }}>
                                    <Stack>
                                        <Typography sx={{ color: 'text.secondary' }}>Game</Typography>
                                        <Select
                                            size="small"
                                            value={percent}
                                            onChange={(e) => setPercent(Number(e.target.value))}
                                        >
                                            <MenuItem value={1}>Sport Game (100%)</MenuItem>
                                            <MenuItem value={0.6}>Casino (60%)</MenuItem>
                                        </Select>
                                    </Stack>
                                    <Stack spacing={1} flex={1}>
                                        <Typography
                                            variant="h4"
                                            sx={{ fontWeight: 700, pb: 0.5, display: 'flex', alignItems: 'center' }}
                                        >
                                            <Typography sx={{ fontWeight: 700, color: 'text.secondary', mr: 1 }}>
                                                =
                                            </Typography>
                                            {fBalance(result)}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Stack>

            <Card
                sx={{
                    borderRadius: 2,
                    backgroundColor: 'background.card'
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={{ md: 'flex-start', xs: 'center' }}
                    sx={{ px: 2 }}
                >
                    <Stack direction="row" spacing={1} sx={{ py: 2 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 16, color: 'text.secondary' }}>
                            {t('rateRule.referral.title')}
                        </Typography>
                    </Stack>
                </Stack>
                <Divider />
                <Stack direction={{ md: 'row', xs: 'column' }} spacing={2} sx={{ p: { md: 2, xs: 2 } }}>
                    {steps.map((step, i) => (
                        <Stack key={i} flex={1} sx={{ borderRadius: 2, bgcolor: 'background.layer3' }}>
                            <Stack sx={{ pt: 2, flex: 1 }}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{ px: 2, pb: 2, flexGrow: 1, flex: 1 }}
                                >
                                    <Typography variant="h2" color="success">
                                        {i + 1}
                                    </Typography>
                                    <Stack spacing={1}>
                                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                            {step.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {step.content}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
                <Stack sx={{ px: 2, pb: 2 }}>
                    <Stack
                        sx={{
                            borderRadius: 2,
                            bgcolor: 'background.default'
                        }}
                    >
                        <Stack sx={{ px: 4, pt: 2 }}>
                            <Stack direction="row">
                                <Stack flex={1}>
                                    <Typography
                                        sx={{ fontWeight: 700, color: 'text.secondary', fontSize: { md: 14, xs: 12 } }}
                                    >
                                        {t('rateRule.referral.table.level')}
                                    </Typography>
                                </Stack>
                                <Stack flex={1}>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            color: 'text.secondary',
                                            fontSize: { md: 14, xs: 12 },
                                            textAlign: 'center'
                                        }}
                                    >
                                        {t('rateRule.referral.table.wager')}
                                    </Typography>
                                </Stack>
                                <Stack flex={1}>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            color: 'text.secondary',
                                            fontSize: { md: 14, xs: 12 },
                                            textAlign: 'right'
                                        }}
                                    >
                                        {t('rateRule.referral.table.unlock')}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack sx={{ px: 4, py: 2 }}>
                            {WAGER_LIST.map((item, i) => (
                                <Stack direction="row" key={i} sx={{ py: 1 }}>
                                    <Stack flex={1}>
                                        <Stack flex={1} direction="row" alignItems="center" spacing={1}>
                                            <Box component="img" src={item.icon} sx={{ width: 16 }} />
                                            <Typography variant="body1">{item.level}</Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack flex={1} justifyContent="center">
                                        <Typography textAlign="center">{item.wager}</Typography>
                                    </Stack>
                                    <Stack
                                        flex={1}
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="flex-end"
                                        spacing={1}
                                    >
                                        <CircleDollarIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                                        <Typography
                                            sx={{
                                                color: 'success.main',
                                                fontWeight: 700,
                                                fontSize: { md: 16, xs: 12 }
                                            }}
                                        >
                                            {item.unlockAmount}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Card>
        </>
    );
};

export default RateRuleView;
