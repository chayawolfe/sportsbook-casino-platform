import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import { Card, Stack, Button, Divider, Typography } from '@mui/material';
// api
import { affiliateApi } from 'api/affiliate.api';
// hooks
import { useAuth } from 'hooks/use-auth-context';
// utils
import { formatMoney } from 'utils/format-balance';
// icons
import { WithdrawalIcon } from 'icons';
// components
import RewardCommission from './reward-commission';
import RewardReferral from './reward-referral';
import { SwapModal } from './swap-modal';

const RewardView = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('commission');
    const [data, setData] = useState({
        commissionAvailable: 0,
        referralAvailable: 0,
        referralReward: 0,
        commissionReward: 0,
        TotalPendingRewards: 0
    });

    const loadStatus = async () => {
        try {
            const res = await affiliateApi.getRewardStatus();
            setData(res);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(typeof error === 'string' ? error : error.message);
        }
    };

    useEffect(() => {
        loadStatus();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Card
                sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.card'
                }}
            >
                <Stack direction={{ md: 'row', xs: 'column' }}>
                    <Stack
                        direction={{ md: 'row', xs: 'column' }}
                        justifyContent="space-between"
                        spacing={3}
                        sx={{ width: { md: '66%', xs: 1 }, px: { md: 0, xs: 2 } }}
                    >
                        <Stack spacing={1}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    textAlign: { md: 'start', xs: 'center' }
                                }}
                            >
                                {t('reward.commission.title')}
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    color: 'success.light',
                                    textAlign: { md: 'start', xs: 'center' }
                                }}
                            >
                                {formatMoney(user?.currency as string, data.commissionAvailable)}
                            </Typography>
                            <Stack>
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        py: 0,
                                        textAlign: { md: 'left', xs: 'center' }
                                    }}
                                >
                                    {t('reward.commission.totalReceived', {
                                        amount: formatMoney(user?.currency as string, data.commissionReward)
                                    })}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    textAlign: { md: 'start', xs: 'center' }
                                }}
                            >
                                {t('reward.referral.title')}
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    color: 'success.light',
                                    textAlign: { md: 'start', xs: 'center' }
                                }}
                            >
                                {formatMoney(user?.currency as string, data.referralAvailable)}
                            </Typography>
                            <Stack direction={{ md: 'row', xs: 'column' }} spacing={1}>
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        py: 0,
                                        textAlign: { md: 'left', xs: 'center' }
                                    }}
                                >
                                    {t('reward.referral.totalReceived', {
                                        amount: formatMoney(user?.currency as string, data.referralReward)
                                    })}
                                </Typography>
                                {data.TotalPendingRewards > 0 && (
                                    <Typography
                                        noWrap
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            bgcolor: 'background.default',
                                            px: 0.5,
                                            borderRadius: 0.5,
                                            textAlign: { md: 'start', xs: 'center' }
                                        }}
                                    >
                                        {t('reward.referral.lockedRewards', {
                                            amount: formatMoney(user?.currency as string, data.TotalPendingRewards)
                                        })}
                                    </Typography>
                                )}
                            </Stack>
                        </Stack>
                        <Divider orientation="vertical" />
                    </Stack>

                    <Stack sx={{ flex: 1, mt: { md: 0, xs: 2 } }}>
                        <Stack sx={{ my: 'auto', ml: { md: 4, xs: 0 }, position: 'relative' }}>
                            <Stack spacing={{ md: 1, xs: 2 }} sx={{ mx: { md: 4, xs: 0 } }}>
                                <Button
                                    variant="contained"
                                    startIcon={<WithdrawalIcon />}
                                    onClick={() => setOpen(true)}
                                >
                                    {t('reward.actions.withdraw')}
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>

            <Card
                sx={{
                    borderRadius: 2,
                    backgroundColor: 'background.card'
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, pt: 2 }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={3}
                        sx={{ width: { md: 'auto', xs: 1 } }}
                    >
                        <Typography
                            sx={{
                                pb: 1,
                                fontSize: 14,
                                cursor: 'pointer',
                                ...(type === 'commission' && {
                                    fontWeight: 700,
                                    borderBottom: '2px solid',
                                    borderColor: 'primary.main'
                                })
                            }}
                            onClick={() => setType('commission')}
                        >
                            {t('reward.tabs.commission')}
                        </Typography>
                        <Typography
                            sx={{
                                pb: 1,
                                fontSize: 14,
                                cursor: 'pointer',
                                ...(type === 'referral' && {
                                    fontWeight: 700,
                                    borderBottom: '2px solid',
                                    borderColor: 'primary.main'
                                })
                            }}
                            onClick={() => setType('referral')}
                        >
                            {t('reward.tabs.referral')}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={3} sx={{ display: { md: 'flex', xs: 'none' } }}>
                        {/* <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ pb: 1 }}
                        // onClick={() => updateSettings({ referralRulesModal: true })}
                        >
                            <LogIcon sx={{ fill: 'white', fontSize: 14 }} />
                            <Typography
                                sx={{
                                    cursor: 'pointer',

                                    fontSize: 16,
                                    borderColor: 'primary.main',
                                    color: 'text.primary'
                                }}
                            >
                                {t('reward.tabs.rules')}
                            </Typography>
                        </Stack> */}
                    </Stack>
                </Stack>
                <Divider />
                {type === 'commission' ? <RewardCommission /> : <RewardReferral />}
            </Card>

            <SwapModal
                open={open}
                onclose={() => setOpen(false)}
                loadData={loadStatus}
                commision={data.commissionAvailable}
                referral={data.referralAvailable}
            />
        </>
    );
};

export default RewardView;
