import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

const commonPaperStyles = {
    p: 1.5,
    bgcolor: 'background.layer2',
    borderRadius: 3
};

const Rewards = () => {
    const rewardLevels = [
        { value: '0', image: '/assets/images/rewards/start-8a2b06ab.webp', isStart: true },
        { value: '5', image: '/assets/images/rewards/box-24e5e087.webp' },
        { value: '10', image: '/assets/images/rewards/box-24e5e087.webp' },
        { value: '15', image: '/assets/images/rewards/box-24e5e087.webp' },
        { value: 'max', image: '/assets/images/rewards/box-24e5e087.webp' }
    ];

    const progress = 10;

    return (
        <Paper sx={commonPaperStyles}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Stack direction="row" alignItems="center">
                    <WorkspacePremiumIcon sx={{ fontSize: 20 }} />
                    <Typography variant="inherit" fontWeight="bold" ml={1}>
                        Rewards
                    </Typography>
                    <HelpOutlineIcon
                        sx={{
                            ml: 1,
                            fontSize: 18,
                            color: 'text.secondary',
                            cursor: 'pointer'
                        }}
                    />
                </Stack>
            </Stack>

            <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', opacity: 0.2 }} />

            <Box sx={{ mt: 1.5 }}>
                <Stack direction="row" spacing={1.5}>
                    {rewardLevels.map((level, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: 1,
                                height: 80,
                                bgcolor: 'background.layer5',
                                borderRadius: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                pt: 1,
                                cursor: level.isStart ? 'default' : 'pointer'
                            }}
                        >
                            <Box
                                component="img"
                                src={level.image}
                                alt={level.isStart ? 'start' : 'box'}
                                sx={{ width: 32, height: 36 }}
                            />
                            <Typography
                                sx={{
                                    mt: 1,
                                    color: 'text.secondary',
                                    fontWeight: 600
                                }}
                            >
                                {level.value}
                            </Typography>
                        </Box>
                    ))}
                </Stack>

                <Box sx={{ mt: 1.5, height: 28, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ position: 'relative', width: '100%' }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 6,
                                bgcolor: 'background.layer5',
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: 'primary.main',
                                    borderRadius: 1
                                }
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                left: `${progress - 2}%`,
                                top: -6,
                                width: 0,
                                height: 0,
                                borderLeft: '6px solid transparent',
                                borderRight: '6px solid transparent',
                                borderBottom: '6px solid',
                                borderBottomColor: 'primary.main'
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

const achievementData = [
    { id: 1, title: 'Talkative', count: 11356, image: '/assets/images/medals/achieve_1-c87ad7ad.webp' },
    { id: 2, title: 'Fearless One', count: 6, image: '/assets/images/medals/achieve_2-f40a41f6.webp' },
    { id: 3, title: 'The Loaded King', count: 1, image: '/assets/images/medals/achieve_3-bf42dfa3.webp' },
    { id: 4, title: 'Highest Contributor', count: 10, image: '/assets/images/medals/achieve_4-c845bc7e.webp' },
    { id: 5, title: 'The Top Gun', count: 26, image: '/assets/images/medals/achieve_5-7e08d516.webp' },
    { id: 6, title: 'The Rain Master', count: 14622, image: '/assets/images/medals/achieve_6-f98836e4.webp' },
    { id: 7, title: 'COCO Lover', count: 10984, image: '/assets/images/medals/achieve_7-6bbaf20d.webp' },
    { id: 8, title: 'Invincible Lucky Dog', count: 8632, image: '/assets/images/medals/achieve_8-65991297.webp' },
    { id: 9, title: 'Contest Master', count: 86, image: '/assets/images/medals/achieve_9-110f9066.webp' },
    { id: 10, title: 'Roll King', count: 1830, image: '/assets/images/medals/achieve_10-19cd9ddc.webp' },
    { id: 11, title: 'The Rain Stormer', count: 2757, image: '/assets/images/medals/achieve_11-f2a32412.webp' },
    { id: 12, title: 'Chicken Dinner', count: 19962, image: '/assets/images/medals/achieve_12-7f2dc23f.webp' },
    { id: 13, title: 'Loyal Player', count: 2595, image: '/assets/images/medals/achieve_13-25b97703.webp' },
    { id: 14, title: "Call Me 'Richman'", count: 10610, image: '/assets/images/medals/achieve_14-c072f644.webp' },
    { id: 15, title: 'The Old-Timer', count: 35419459, image: '/assets/images/medals/achieve_15-53c0901a.webp' },
    { id: 16, title: 'The Boss', count: 5382, image: '/assets/images/medals/achieve_16-2fceb546.webp' },
    { id: 17, title: 'ETHTOP 1', count: 2, image: '/assets/images/medals/achieve_17_ETH-4684f7c4.webp' },
    { id: 18, title: 'BTCTOP 1', count: 9, image: '/assets/images/medals/achieve_17_BTC-a5992a94.webp' },
    { id: 19, title: 'DOGETOP 1', count: 3, image: '/assets/images/medals/achieve_17_DOGE-894cb117.webp' },
    { id: 20, title: 'EOSTOP 1', count: 11, image: '/assets/images/medals/achieve_17_EOS-902b23db.webp' }
];

const AchievementCard = ({
    title,
    count,
    image,
    onClick
}: {
    title: string;
    count: number;
    image: string;
    onClick: () => void;
}) => (
    <Box
        sx={{
            width: 'calc(32%)',
            height: 144,
            bgcolor: 'background.layer5',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            mt: 1
        }}
        onClick={onClick}
    >
        <Box
            component="img"
            src={image}
            alt={title}
            sx={{
                width: 44,
                height: 60,
                opacity: 0.5
            }}
        />
        <Typography
            variant="caption"
            sx={{
                mt: 1,
                textAlign: 'center',
                fontWeight: 600
            }}
        >
            {title}
        </Typography>
        <Box
            sx={{
                height: 20,
                px: 1,
                bgcolor: 'background.layer4',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                mt: 0.75
            }}
        >
            <SvgIcon
                sx={{
                    fontSize: 16,
                    color: 'primary.main'
                }}
                viewBox="0 0 32 32"
            >
                <path d="M24.4538 21.2639C24.998 24.3742 22.8304 26.6322 19.8097 27.1402C16.8925 27.6309 12.1374 27.6309 9.22021 27.1402C6.19946 26.633 4.03192 24.3759 4.57606 21.2647C5.03801 18.6254 7.2746 16.9806 10.0068 17.122C12.0026 17.2255 13.229 17.4853 14.6485 17.4853C16.0845 17.4853 17.0413 17.2255 19.0222 17.122C21.7536 16.9789 23.9927 18.6245 24.4538 21.2639ZM23.5217 16.3789C24.9191 16.6378 26.6008 17.3809 27.2748 19.3881C27.8979 21.2442 27.1639 22.699 26.3279 23.6616C26.0616 23.9682 25.5281 23.7019 25.6605 23.3262C26.0041 22.3546 26.1422 21.1135 25.6046 19.7391C25.0818 18.4018 24.1144 17.5593 23.2365 17.0406C22.8699 16.8244 23.0976 16.3 23.5217 16.3789ZM14.6485 5.2346C17.518 5.2346 19.845 7.56078 19.845 10.4319C19.845 13.3031 17.518 15.6293 14.6485 15.6293C11.7782 15.6293 9.45118 13.3023 9.45118 10.4319C9.45118 7.5616 11.7782 5.2346 14.6485 5.2346ZM19.3001 5.3168C18.8825 5.01924 19.1833 4.38139 19.688 4.5088C20.2198 4.64278 20.7673 4.85156 21.2777 5.17213C22.9619 6.23248 23.7946 8.10822 23.4979 10.1919C23.3598 11.1643 22.9282 11.9205 22.4425 12.4918C22.1227 12.8691 21.4914 12.5551 21.6229 12.0849C21.932 10.9818 22.0233 9.57297 21.429 8.0252C20.9391 6.75032 20.1015 5.88971 19.3001 5.3168Z" />
            </SvgIcon>
            <Typography
                variant="caption"
                sx={{
                    ml: 0.5,
                    color: 'primary.main',
                    fontWeight: 600
                }}
            >
                {count}
            </Typography>
        </Box>
    </Box>
);

const AwaitingUnlocking = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    return (
        <Paper sx={commonPaperStyles}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography fontWeight="bold" fontSize={16}>
                    Awaiting unlocking
                </Typography>
            </Stack>

            <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', opacity: 0.2, my: 1.5 }} />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2%' }}>
                {achievementData.map((achievement) => (
                    <AchievementCard
                        key={achievement.id}
                        title={achievement.title}
                        count={achievement.count}
                        image={achievement.image}
                        onClick={() => setOpen(`medal-details-${achievement.id}`)}
                    />
                ))}
            </Box>
        </Paper>
    );
};

const Achievements = () => (
    <Paper sx={commonPaperStyles}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography fontWeight="bold" fontSize={16}>
                Your achievements
            </Typography>
            <Stack direction="row" alignItems="center" sx={{ fontSize: 14, color: 'text.secondary' }}>
                <Typography variant="inherit">0/20</Typography>
                <Typography variant="inherit" sx={{ ml: 1 }}>
                    Completed
                </Typography>
            </Stack>
        </Stack>

        <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', opacity: 0.2, my: 1.5 }} />

        <Stack direction="row" flexWrap="wrap" gap="2%" />
    </Paper>
);

const MasterMedals = ({ setOpen }: { setOpen: (open: string | null) => void }) => (
    <Stack direction="column" gap={1}>
        <Rewards />
        <Achievements />
        <AwaitingUnlocking setOpen={setOpen} />
    </Stack>
);

export default MasterMedals;
