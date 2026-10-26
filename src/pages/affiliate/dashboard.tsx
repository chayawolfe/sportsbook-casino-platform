import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
// @mui
import {
    Box,
    Card,
    Grid,
    Stack,
    Table,
    Divider,
    TableRow,
    Collapse,
    TableHead,
    TableBody,
    TableCell,
    Typography,
    IconButton,
    TableContainer
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// api
import { affiliateApi } from 'api/affiliate.api';
// hooks
import { useAuth } from 'hooks/use-auth-context';
import { useCopyToClipboard } from 'hooks/use-copy-to-clipboard';
import {
    XIcon,
    OkIcon,
    VKIcon,
    CupIcon,
    CopyIcon,
    StarIcon,
    SkypeIcon,
    PeopleIcon,
    FacebookIcon,
    MoneyLogIcon,
    TelegramIcon,
    WhatsAppIcon
} from 'icons';
// utils
import { fBalance, formatMoney } from 'utils/format-balance';
// components
import LoadTable from 'components/load-table';
import EmptyTable from 'components/empty-table';
import { fDateTime } from 'utils/format-time';

const DashboardView = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { copy } = useCopyToClipboard();

    const [index, setIndex] = useState(-1);
    const [referralCodes, setReferralCodes] = useState<any[]>([]);
    const [referralFaq, setReferralFaq] = useState<{ title: string; content: string }[]>([]);
    const [referralLearnMore, setReferralLearnMore] = useState<{
        title: string;
        highlightTitle: string;
        content: string;
    }>();

    const [isLoading, setIsLoading] = useState(false);
    const [dashboard, setDashboard] = useState({
        referralReward: 1000,
        comissionReward: 25
    });

    const [reward, setReward] = useState({
        totalBetAmount: 0,
        totalCommissionAmount: 0,
        totalCommissionWager: 0,
        totalReferralAmount: 0,
        totalAvailableReferral: 0,
        totalReferralWager: 0,
        friends: 0,
        code: ''
    });

    const shareLink = useMemo(() => `https://betthrob.com/?r=p-${reward.code}`, [reward.code]);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await affiliateApi.getRewardDashboard();
            setReward((pre) => ({ ...pre, ...res }));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(typeof error === 'string' ? error : error.message || error.error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getReferralCode = async () => {
        try {
            const res = await affiliateApi.getReferralActivity();
            setReferralCodes(res);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(typeof error === 'string' ? error : error.message || error.error);
        }
    };

    useEffect(() => {
        loadData();
        getReferralCode();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Stack>
                <Grid container spacing={2}>
                    <Grid size={{ md: 8, xs: 12 }}>
                        <Card
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: 'background.card'
                            }}
                        >
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700, textAlign: { md: 'start', xs: 'center' } }}
                                    >
                                        {t('dashboard.invite.title')}
                                    </Typography>

                                    {/* <Typography
                                        component={Link}
                                        to={'/info?tab=Referral%20Terms%20%26%20Conditions'}
                                        sx={{ textDecoration: 'none' }}
                                        variant="button"
                                        color="primary"
                                    >
                                        {t('dashboard.invite.terms.title')}
                                    </Typography> */}
                                </Stack>

                                <Stack spacing={4}>
                                    <Stack direction={{ md: 'row', xs: 'column' }}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    color: 'primary.main',
                                                    fontWeight: 700,
                                                    textAlign: { md: 'start', xs: 'center' }
                                                }}
                                            >
                                                {formatMoney(user?.currency as string, dashboard.referralReward)}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ fontWeight: 600, width: { md: 'auto', xs: '100%' } }}
                                            >
                                                {t('dashboard.invite.referral.rewards')}
                                            </Typography>
                                        </Stack>

                                        <Box>
                                            <Divider orientation="vertical" sx={{ mx: 3 }} />
                                        </Box>

                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    color: 'primary.main',
                                                    fontWeight: 700,
                                                    textAlign: { md: 'start', xs: 'center' }
                                                }}
                                            >
                                                {`${dashboard.comissionReward}%`}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ fontWeight: 600, width: { md: 'auto', xs: '100%' } }}
                                            >
                                                Commission Rewards
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>

                                <Stack spacing={4}>
                                    <Stack sx={{ pl: 1 }}>
                                        <Typography sx={{ color: 'text.secondary', fontSize: 14, fontWeight: 600 }}>
                                            {t('dashboard.invite.terms.description')}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack
                                flexDirection={{ md: 'row', xs: 'column' }}
                                alignItems="flex-end"
                                sx={{ wdith: 1, gap: { md: 4, xs: 2 }, my: 4 }}
                            >
                                <Stack spacing={1} sx={{ flex: 1, width: { md: 'auto', xs: 1 } }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                        Referral Link
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{ borderRadius: 1, pl: 1, bgcolor: 'background.default' }}
                                    >
                                        <Typography variant="body2" sx={{ textWrap: 'wrap' }}>
                                            {reward.code ? shareLink : ''}
                                        </Typography>
                                        <IconButton
                                            color="primary"
                                            sx={{ bgcolor: 'primary.main', borderRadius: 1 }}
                                            onClick={() => copy(reward.code ? shareLink : '')}
                                        >
                                            <ContentCopyIcon
                                                sx={{
                                                    color: (theme) =>
                                                        theme.palette.mode === 'dark'
                                                            ? 'background.paper'
                                                            : 'common.white'
                                                }}
                                            />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                                <Stack spacing={1} sx={{ flex: 1, width: { md: 'auto', xs: 1 } }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                        Referral Code
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{ borderRadius: 1, pl: 1, bgcolor: 'background.default' }}
                                    >
                                        <Typography variant="body2">{reward.code ? reward.code : ''}</Typography>
                                        <IconButton
                                            color="primary"
                                            sx={{ bgcolor: 'primary.main', borderRadius: 1 }}
                                            onClick={() => copy(reward.code ? reward.code : '')}
                                        >
                                            <ContentCopyIcon
                                                sx={{
                                                    color: (theme) =>
                                                        theme.palette.mode === 'dark'
                                                            ? 'background.paper'
                                                            : 'common.white'
                                                }}
                                            />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack spacing={1} sx={{ mb: 2, display: { md: 'none', xs: 'flex' } }}>
                                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    {t('dashboard.referral.terms.description')}
                                </Typography>
                            </Stack>

                            <Stack direction={{ md: 'row', xs: 'column' }} alignItems="center" justifyContent="center">
                                <Typography>{t('dashboard.referral.share')}</Typography> &nbsp;
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <IconButton
                                        target="_blank"
                                        component={Link}
                                        to={`https://www.facebook.com/sharer.php?u=${shareLink}`}
                                        sx={{
                                            p: 0.8,
                                            borderRadius: 0.5,
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                            borderColor: 'text.secondary',
                                            svg: { fontSize: 16 }
                                        }}
                                    >
                                        <FacebookIcon sx={{ color: 'text.secondary' }} />
                                    </IconButton>
                                    <IconButton
                                        target="_blank"
                                        component={Link}
                                        to={`https://twitter.com/share?url=${shareLink}`}
                                        sx={{
                                            p: 0.8,
                                            borderRadius: 0.5,
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                            borderColor: 'text.secondary',
                                            svg: { fontSize: 16 }
                                        }}
                                    >
                                        <XIcon sx={{ color: 'text.secondary' }} />
                                    </IconButton>
                                    <IconButton
                                        target="_blank"
                                        component={Link}
                                        to={`https://t.me/share?url=${shareLink}`}
                                        sx={{
                                            p: 0.8,
                                            borderRadius: 0.5,
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                            borderColor: 'text.secondary',
                                            svg: { fontSize: 16 }
                                        }}
                                    >
                                        <TelegramIcon sx={{ color: 'text.secondary' }} />
                                    </IconButton>
                                    <IconButton
                                        target="_blank"
                                        component={Link}
                                        to={`http://vk.com/share.php?url=${shareLink}&title=My%20Referral&text=`}
                                        sx={{
                                            p: 0.8,
                                            borderRadius: 0.5,
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                            borderColor: 'text.secondary',
                                            svg: { fontSize: 16 }
                                        }}
                                    >
                                        <VKIcon sx={{ color: 'text.secondary' }} />
                                    </IconButton>
                                    <IconButton
                                        target="_blank"
                                        component={Link}
                                        to={`https://web.skype.com/share?url=${shareLink}&title=My%20Referral&text=`}
                                        sx={{
                                            p: 0.8,
                                            borderRadius: 0.5,
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                            borderColor: 'text.secondary',
                                            svg: { fontSize: 16 }
                                        }}
                                    >
                                        <SkypeIcon sx={{ color: 'text.secondary' }} />
                                    </IconButton>
                                    <IconButton
                                        target="_blank"
                                        component={Link}
                                        to={`https://connect.ok.ru/offer?url=url=${shareLink}%2Fi-260lb5qik-n%2F&title=My%20Referral&imageUrl=`}
                                        sx={{
                                            p: 0.8,
                                            borderRadius: 0.5,
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                            borderColor: 'text.secondary',
                                            svg: { fontSize: 16 }
                                        }}
                                    >
                                        <OkIcon sx={{ color: 'text.secondary' }} />
                                    </IconButton>
                                    <IconButton
                                        target="_blank"
                                        component={Link}
                                        to={`https://api.whatsapp.com/send?url=${shareLink}&text=`}
                                        sx={{
                                            p: 0.8,
                                            borderRadius: 0.5,
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                            borderColor: 'text.secondary',
                                            svg: { fontSize: 16 }
                                        }}
                                    >
                                        <WhatsAppIcon sx={{ color: 'text.secondary' }} />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Card>
                    </Grid>
                    <Grid size={{ md: 4, xs: 12 }}>
                        <Card
                            sx={{
                                p: 2,
                                height: 1,
                                display: 'flex',
                                borderRadius: 2,
                                backgroundColor: 'background.card'
                            }}
                        >
                            <Stack justifyContent="center" spacing={5} sx={{ width: 1 }}>
                                <Stack flexDirection="row" sx={{ width: 1 }}>
                                    <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }} spacing={1}>
                                        <CupIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{ textAlign: 'center', color: 'text.secondary' }}
                                            >
                                                Total Reward
                                            </Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 800, textAlign: 'center' }}>
                                                {formatMoney(
                                                    user?.currency as string,
                                                    Number(reward.totalCommissionAmount + reward.totalReferralAmount)
                                                )}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Divider orientation="vertical" sx={{ mx: 2 }} />
                                    <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }} spacing={1}>
                                        <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{ textAlign: 'center', color: 'text.secondary' }}
                                            >
                                                Total Friends
                                            </Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 800, textAlign: 'center' }}>
                                                {reward.friends}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                                <Stack flexDirection="row">
                                    <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }} spacing={1}>
                                        <StarIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{ textAlign: 'center', color: 'text.secondary' }}
                                            >
                                                Referral Rewards
                                            </Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 800, textAlign: 'center' }}>
                                                {formatMoney(
                                                    user?.currency as string,
                                                    Number(reward.totalReferralAmount)
                                                )}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Divider orientation="vertical" sx={{ mx: 2, height: 'auto' }} />
                                    <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }} spacing={1}>
                                        <MoneyLogIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{ textAlign: 'center', color: 'text.secondary' }}
                                            >
                                                Commission Rewards
                                            </Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 800, textAlign: 'center' }}>
                                                {formatMoney(
                                                    user?.currency as string,
                                                    Number(reward.totalCommissionAmount)
                                                )}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Stack>

            <Card
                sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.card'
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {t('dashboard.activities.title')}
                </Typography>
                <TableContainer sx={{ mt: 2 }}>
                    <Table sx={{ th: { py: 1, whiteSpace: 'nowrap' }, td: { borderColor: 'divider' } }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('dashboard.activities.table.name')}</TableCell>
                                <TableCell>{t('dashboard.activities.table.code')}</TableCell>
                                <TableCell align="right">{t('dashboard.activities.table.totalReferrals')}</TableCell>
                                <TableCell align="right">{t('dashboard.activities.table.totalCommission')}</TableCell>
                                <TableCell align="right">{t('dashboard.activities.table.totalRewards')}</TableCell>
                                <TableCell align="right">{t('dashboard.activities.table.createdAt')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(() => {
                                if (isLoading) {
                                    return <LoadTable colSpan={6} />;
                                }
                                if (!referralCodes.length) {
                                    return <EmptyTable noData={!referralCodes.length && !isLoading} colSpan={6} />;
                                }
                                return referralCodes.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{item.name || '--'}</TableCell>
                                        <TableCell>
                                            <Typography component="span">{item.code}</Typography>
                                            <IconButton
                                                sx={{ borderRadius: 1, ml: 1, p: 0.5 }}
                                                onClick={() => copy(`p-${item.code}`)}
                                            >
                                                <ContentCopyIcon sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">{fBalance(item.totalReferralAmount)}</TableCell>
                                        <TableCell align="right">{fBalance(item.totalCommissionAmount)}</TableCell>
                                        <TableCell align="right">
                                            {fBalance(item.totalReferralAmount + item.totalCommissionAmount)}
                                        </TableCell>
                                        <TableCell align="right">{fDateTime(item.createdAt)}</TableCell>
                                    </TableRow>
                                ));
                            })()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            {/* <Card
                sx={{
                    py: 4,
                    px: { md: 4, xs: 2 },
                    borderRadius: 2,
                    backgroundColor: 'background.card'
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={{ md: 'flex-start', xs: 'center' }}
                    spacing={2}
                    sx={{ mb: 4 }}
                >
                    <LiveIcon />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {t('dashboard.liveRewards.title')}
                    </Typography>
                </Stack>
                <Stack
                    spacing={2}
                    direction={{ md: 'row', xs: 'column' }}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: 1 }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            bgcolor: 'background.default',
                            borderRadius: 2,
                            px: 2,
                            py: 1.5,
                            width: { md: '40%', xs: 1 }
                        }}
                    >
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {t('dashboard.liveRewards.totalToDate')}
                        </Typography>
                        <Typography sx={{ fontWeight: 700 }}>
                            {formatMoney(user?.currency as string, totalRewards)}
                        </Typography>
                    </Stack>
                    <Stack sx={{ overflow: 'hidden', height: '48px !important', width: { md: '60%', xs: 1 } }}>
                        <Box
                            sx={{
                                gap: 4,
                                display: 'grid',
                                gridTemplateColumns: { md: 'repeat(3,minmax(0,1fr))', xs: 'repeat(3,minmax(0,1fr))' },
                                animationTimeline: 'auto',
                                animationRangeStart: 'normal',
                                animationRangeEnd: 'normal',
                                animation: '18s linear 0s infinite normal none running scroll'
                            }}
                        >
                            {lastRewards.map((rewards, i) => (
                                <Stack direction="row" spacing={1} key={i}>
                                    <Typography>{rewards.referralUsername}</Typography>
                                    <Typography
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'common.white',
                                            px: 1,
                                            borderRadius: 1,
                                            fontWeight: 700
                                        }}
                                    >{`+${rewards.prizeAmount}`}</Typography>
                                    <CircleDollarIcon />
                                </Stack>
                            ))}
                        </Box>
                    </Stack>
                </Stack>
            </Card> */}

            {/* <Card
                sx={{
                    p: 4,
                    pb: { md: 4, xs: 0 },
                    position: 'relative',
                    borderRadius: 2,
                    backgroundColor: 'background.card'
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, textAlign: { md: 'start', xs: 'center' } }}>
                    {referralLearnMore?.title}
                    <Typography variant="h6" component="span" sx={{ ml: 1, fontWeight: 700, color: 'primary.main' }}>
                        {referralLearnMore?.highlightTitle}
                    </Typography>
                </Typography>
                <Stack spacing={2} sx={{ mt: 4, maxWidth: { md: '50%', xs: 1 } }}>
                    <Typography sx={{ textAlign: { md: 'start', xs: 'center' } }}>
                        {referralLearnMore?.content}
                    </Typography>
                    <Box sx={{ width: { md: '50%', xs: 1 } }}>
                        <Stack spacing={1}>
                            <Button variant="contained" size="small" onClick={loadZendesk}>
                                <Box
                                    component="span"
                                    sx={{
                                        alignItems: 'center',
                                        color: 'var(--nav-item-color)',
                                        display: 'inline-flex',
                                        justifyContent: 'center',
                                        marginRight: '16px'
                                    }}
                                >
                                    <Icon icon="hugeicons:customer-support" fontSize={16} />
                                </Box>
                                <Box
                                    component="span"
                                    sx={{
                                        flexGrow: 1,
                                        fontSize: 14,
                                        lineHeight: '24px',
                                        whiteSpace: 'nowrap',
                                        fontWeight: 500
                                    }}
                                >
                                    {t('sideNav.liveSupport')}
                                </Box>
                            </Button>
                        </Stack>
                    </Box>
                    <Box
                        component="img"
                        src={'/images/promotion/affiliate.svg'}
                        sx={{ position: { md: 'absolute', xs: 'relative' }, bottom: 0, right: { md: 16, xs: 0 } }}
                    />
                </Stack>
            </Card> */}

            <Card
                sx={{
                    py: 4,
                    px: { md: 4, xs: 2 },
                    position: 'relative',
                    borderRadius: 2,
                    backgroundColor: 'background.card'
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 4 }}>
                    {t('dashboard.faq.title')}
                </Typography>

                {referralFaq.map((item, i) => (
                    <Stack key={i} sx={{ ...(i !== 0 && { borderTop: '2px solid #d9d9d945' }) }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 0.5 }}>
                            <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
                            <IconButton onClick={() => setIndex(index === i ? -1 : i)}>
                                {index === i ? <RemoveIcon /> : <AddIcon />}
                            </IconButton>
                        </Stack>
                        <Collapse in={index === i}>
                            <Typography sx={{ mb: 2 }}>{item.content}</Typography>
                        </Collapse>
                    </Stack>
                ))}
            </Card>
        </>
    );
};

export default DashboardView;
