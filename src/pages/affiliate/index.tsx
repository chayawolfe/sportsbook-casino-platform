import { useMemo } from 'react';
import { Link as ReactLink } from 'react-router-dom';
// @mui
import { DashboardIcon, DownloadIcon, RateIcon, ReferralIcon, RewardIcon } from 'icons';
import { Box, Button, Card, Container, Stack, SxProps, Theme } from '@mui/material';
import { useParams } from 'routes/hook';
import DashboardView from './dashboard';
import RewardView from './reward';
import ReferralCodeFriendView from './referral-codes-friends';
import RateRuleView from './rate-rule';
// sections
// import DashboardView from '@/sections/dashboard/dashboard';
// import DownloadView from '@/sections/dashboard/download';
// import RateRuleView from '@/sections/dashboard/rate-rule';
// import ReferralCodeFriendView from '@/sections/dashboard/referral-codes-friends';
// import RewardView from '@/sections/dashboard/reward';

interface TabItem {
    icon: (sx?: SxProps<Theme>) => React.ReactNode;
    link: string;
    title: string;
}
const TAB: TabItem[] = [
    {
        icon: (sx) => <DashboardIcon sx={sx} />,
        link: 'dashboard',
        title: 'Dashboard'
    },
    {
        icon: (sx) => <RewardIcon sx={sx} />,
        link: 'reward',
        title: 'My Rewards'
    },
    {
        icon: (sx) => <ReferralIcon sx={sx} />,
        link: 'referral-codes-friends',
        title: 'Referral Codes & Friends'
    },
    {
        icon: (sx) => <RateIcon sx={sx} />,
        link: 'rate-rule',
        title: 'Rate & Rules'
    }
    // {
    //     icon: (sx) => <DownloadIcon sx={sx} />,
    //     link: 'download',
    //     title: 'Download Banners'
    // }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TITLE: any = {
    dashboard: 'Dashboard',
    reward: 'My Rewards',
    'referral-codes-friends': 'Referral Codes & Friends',
    'rate-rule': 'Rate & Rules',
    download: 'Download Banners'
};

const DashboardPage = () => {
    const { tab } = useParams();
    const activeIndex = useMemo(() => TAB.findIndex((item) => item.link === tab), [tab]);

    return (
        <Stack spacing={2} sx={{ pt: 4 }}>
            <Stack
                sx={{
                    p: 0.5,
                    overflowX: 'auto',
                    width: 1,
                    borderRadius: 2,
                    backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#e4e6e7' : 'background.card')
                }}
            >
                <Stack direction="row">
                    {TAB.map((tab, i) => (
                        <Button
                            size="small"
                            key={i}
                            component={ReactLink}
                            to={`/affiliate/${tab.link}`}
                            sx={{
                                px: { md: 3, xs: 1 },
                                minWidth: 'auto',
                                borderRadius: 2,
                                whiteSpace: 'nowrap',
                                color: activeIndex === i ? 'text.primary' : 'text.secondary',
                                bgcolor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? activeIndex === i
                                            ? '#ffffff'
                                            : 'transparent'
                                        : activeIndex === i
                                          ? '#ffffff1c'
                                          : 'transparent'
                            }}
                            startIcon={tab.icon({ color: activeIndex === i ? 'success.light' : 'text.secondary' })}
                        >
                            {tab.title}
                        </Button>
                    ))}
                </Stack>
            </Stack>
            {tab === 'dashboard' && <DashboardView />}
            {tab === 'reward' && <RewardView />}
            {tab === 'referral-codes-friends' && <ReferralCodeFriendView />}
            {tab === 'rate-rule' && <RateRuleView />}
            {/* 
                    {tab === 'download' && <DownloadView />} */}
        </Stack>
    );
};

export default DashboardPage;
