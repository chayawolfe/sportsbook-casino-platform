import moment from 'moment';
import { useEffect, useState } from 'react';
// @mui
import EditIcon from '@mui/icons-material/Edit';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Avatar, Box, Divider, IconButton, MenuItem, Paper, Select, Skeleton, Stack, Typography } from '@mui/material';
// api
import { playerApi } from 'api/player.api';
// components
import EmptyData from 'components/empty-data';
// hooks
import { useAuth } from 'hooks/use-auth-context';
import { useBoolean } from 'hooks/use-boolean';
// store
import { useSelector } from 'store/store';
// utils
import { ASSETS } from 'utils/axios';

const commonPaperStyles = {
    p: 1.5,
    bgcolor: 'background.card',
    borderRadius: 3
};

const commonHeaderStyles = {
    mb: 1.5,
    fontSize: 14
};

const Profile = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    const { user } = useAuth();

    return (
        <Stack direction="column" gap={0.5} sx={{ position: 'relative' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                    src={ASSETS(user.avatar)}
                    sx={{
                        width: 64,
                        height: 64,
                        border: '2px solid',
                        borderColor: 'secondary.main',
                        cursor: { sm: 'pointer' }
                    }}
                />
                <Typography variant="h5" sx={{ mt: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
                    {user.username}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 14,
                        color: 'text.secondary',
                        cursor: 'pointer'
                    }}
                >
                    <Typography variant="inherit">User ID:</Typography>
                    <Typography variant="inherit" sx={{ ml: 0.5 }}>
                        {user._id}
                    </Typography>
                </Box>
            </Box>

            {/* <IconButton
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bgcolor: 'background.layer1',
                    borderRadius: 2,
                    height: 32,
                    px: 1
                }}
            >
                <FavoriteIcon sx={{ color: 'error.main', width: 20, height: 20 }} />
                <Typography sx={{ ml: 0.5, fontSize: '1.125rem', fontWeight: 600 }}>0</Typography>
            </IconButton> */}

            <IconButton
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bgcolor: 'background.layer1',
                    borderRadius: 2,
                    width: 32,
                    height: 32
                }}
                onClick={() => setOpen('edit-profile')}
            >
                <EditIcon sx={{ width: 20, height: 20 }} />
            </IconButton>
        </Stack>
    );
};

const Medals = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    const medals = [
        '/assets/images/medals/achieve_1-c87ad7ad.webp',
        '/assets/images/medals/achieve_2-f40a41f6.webp',
        '/assets/images/medals/achieve_3-bf42dfa3.webp',
        '/assets/images/medals/achieve_4-c845bc7e.webp',
        '/assets/images/medals/achieve_5-7e08d516.webp',
        '/assets/images/medals/achieve_6-f98836e4.webp',
        '/assets/images/medals/achieve_7-6bbaf20d.webp',
        '/assets/images/medals/achieve_8-65991297.webp',
        '/assets/images/medals/achieve_9-110f9066.webp',
        '/assets/images/medals/achieve_10-19cd9ddc.webp',
        '/assets/images/medals/achieve_11-f2a32412.webp',
        '/assets/images/medals/achieve_12-7f2dc23f.webp',
        '/assets/images/medals/achieve_13-25b97703.webp',
        '/assets/images/medals/achieve_14-c072f644.webp',
        '/assets/images/medals/achieve_15-53c0901a.webp',
        '/assets/images/medals/achieve_16-2fceb546.webp',
        '/assets/images/medals/achieve_17_ETH-4684f7c4.webp',
        '/assets/images/medals/achieve_17_BTC-a5992a94.webp',
        '/assets/images/medals/achieve_17_DOGE-894cb117.webp',
        '/assets/images/medals/achieve_17_EOS-902b23db.webp'
    ];

    return (
        <Paper sx={commonPaperStyles}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={commonHeaderStyles}>
                <Stack direction="row" alignItems="center" gap={0.5}>
                    <WorkspacePremiumIcon sx={{ fontSize: 20 }} />
                    <Typography variant="inherit" fontWeight="bold" ml={0.5}>
                        Medals{' '}
                        <Box component="span" ml={0.5}>
                            0
                        </Box>
                    </Typography>
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setOpen('master-medals')}
                >
                    <Typography variant="inherit" color="primary" fontWeight="bold">
                        Details
                    </Typography>
                    <ArrowForwardIosIcon sx={{ fontSize: 13, color: 'primary.main' }} />
                </Stack>
            </Stack>
            <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', opacity: 0.2 }} />
            <Stack
                direction="row"
                spacing={1.5}
                sx={{
                    mt: 1.5,
                    overflowX: 'auto',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none'
                }}
            >
                {medals.map((medal, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 44,
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            flexShrink: 0
                        }}
                    >
                        <Box
                            component="img"
                            src={medal}
                            sx={{ width: '100%', height: '100%', position: 'relative', zIndex: 1, opacity: 0.5 }}
                        />
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
};

const Statistics = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    const balance = useSelector((state) => state.balance);

    const loading = useBoolean();
    const [data, setData] = useState({ totalWin: 0, totalBetCount: 0, totalWager: 0 });
    const [category, setCategory] = useState('all');

    const loadData = async () => {
        try {
            loading.onTrue();
            const response = await playerApi.getPlayerStatistics(category);
            setData(response);
        } catch (error) {
            console.log(error);
        } finally {
            loading.onFalse();
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disdable-next-line
    }, [category]);

    return (
        <Paper sx={commonPaperStyles}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={commonHeaderStyles}>
                <Stack direction="row" alignItems="center" gap={0.5}>
                    <AutoGraphIcon sx={{ fontSize: 20 }} />
                    <Typography variant="inherit" fontWeight="bold" ml={0.5}>
                        Statistics
                    </Typography>
                </Stack>

                {/* <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setOpen('statistics-details')}
                >
                    <Typography variant="inherit" color="primary" fontWeight="bold">
                        Details
                    </Typography>
                    <ArrowForwardIosIcon sx={{ fontSize: 13, color: 'primary.main' }} />
                </Stack> */}
            </Stack>
            <Divider />

            <Select
                size="small"
                sx={{
                    mt: 1,
                    width: 1
                }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                {[
                    { label: 'All', value: 'all' },
                    { label: 'Sports', value: 'sports' },
                    { label: 'Casino', value: 'casino' }
                ].map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            <Stack spacing={1} sx={{ mt: 1.5 }}>
                <Stack direction="row" flexWrap="wrap" spacing={1}>
                    <Box sx={{ bgcolor: 'background.layer5', flex: 1, borderRadius: 2, py: 2 }}>
                        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                            <Box
                                component="img"
                                src="/assets/icons/wins.svg"
                                sx={{ width: 21, height: 21, mr: 0.5, flexShrink: 0 }}
                            />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                                Total Win
                            </Typography>
                        </Stack>
                        {loading.value ? (
                            <Skeleton sx={{ maxWidth: 100, mx: 'auto', bgcolor: 'background.card', mt: 0.5 }} />
                        ) : (
                            <Typography sx={{ textAlign: 'center', fontWeight: 600, fontSize: '1.125rem' }}>
                                {data.totalWin}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ bgcolor: 'background.layer5', flex: 1, borderRadius: 2, py: 2 }}>
                        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                            <Box
                                component="img"
                                src="/assets/icons/bet.svg"
                                sx={{ width: 21, height: 21, mr: 0.5, flexShrink: 0 }}
                            />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                                Total Bet Count
                            </Typography>
                        </Stack>
                        {loading.value ? (
                            <Skeleton sx={{ maxWidth: 100, mx: 'auto', bgcolor: 'background.card', mt: 0.5 }} />
                        ) : (
                            <Typography sx={{ textAlign: 'center', fontWeight: 600, fontSize: '1.125rem' }}>
                                {data.totalBetCount}
                            </Typography>
                        )}
                    </Box>
                </Stack>
                <Box sx={{ bgcolor: 'background.layer5', flex: 1, borderRadius: 2, py: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                        <Box
                            component="img"
                            src="/assets/icons/wagered.svg"
                            sx={{ width: 21, height: 21, mr: 0.5, flexShrink: 0 }}
                        />
                        <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                            Total Wagered
                        </Typography>
                    </Stack>
                    {loading.value ? (
                        <Skeleton sx={{ maxWidth: 100, height: 25, mx: 'auto', bgcolor: 'background.card', mt: 0.5 }} />
                    ) : (
                        <Typography
                            sx={{ textAlign: 'center', fontWeight: 600, fontSize: '1.125rem' }}
                        >{`${balance.currency} ${data.totalWager}`}</Typography>
                    )}
                </Box>
            </Stack>
        </Paper>
    );
};

const FavoriteGames = () => (
    <Paper sx={commonPaperStyles}>
        <Typography variant="inherit" fontWeight="bold" ml={0.5} sx={{ mb: 1.5 }}>
            Favorite Games
        </Typography>
        <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', opacity: 0.2 }} />
        <EmptyData />
    </Paper>
);

const MyProfile = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    const { user } = useAuth();
    return (
        <Stack direction="column" gap={1}>
            <Profile setOpen={setOpen} />
            {/* <Medals setOpen={setOpen} /> */}
            <Statistics setOpen={setOpen} />
            {/* <FavoriteGames /> */}
            <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                Joind on {moment(user.createdAt).format('M/D/yy')}
            </Typography>
        </Stack>
    );
};

export default MyProfile;
