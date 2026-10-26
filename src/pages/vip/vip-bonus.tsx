import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';

type VipLevel = {
    name: string;
    badge: string;
    color: string;
};

type BonusType = {
    name: string;
    icon: string;
};

type BonusAvailability = {
    [key: string]: boolean[];
};

const VipBonus = () => {
    const theme = useTheme();

    const vipLevels: VipLevel[] = [
        { name: 'Bronze', badge: '/assets/images/vip/badge-bronze.webp', color: '#E2AE8D' },
        { name: 'Silver', badge: '/assets/images/vip/badge-silver.webp', color: '#EDEDED' },
        { name: 'Gold', badge: '/assets/images/vip/badge-gold.webp', color: '#F4CB79' },
        { name: 'Platinum I-II', badge: '/assets/images/vip/badge-platinum.webp', color: '#AE88E2' },
        { name: 'Diamond I-III', badge: '/assets/images/vip/badge-diamond.webp', color: '#DC8ABB' }
    ];

    const bonusTypes: BonusType[] = [
        { name: 'Raining', icon: '/assets/images/vip/icon-raining-a0d0dd60.png' },
        { name: 'Daily Bonus', icon: '/assets/images/vip/icon-daily-1d7dc7ab.webp' },
        { name: 'Coin Drops', icon: '/assets/images/vip/icon-coin-drop-b10627bc.webp' },
        { name: 'Private Chat', icon: '/assets/images/vip/icon-host-fa844470.webp' },
        { name: 'Tips', icon: '/assets/images/vip/icon-tips-5ab8d55e.webp' },
        { name: 'VIP Spin', icon: '/assets/images/vip/icon-spin-ee9cd82d.webp' },
        { name: 'Level-up Bonus', icon: '/assets/images/vip/icon-bonus-cc0489df.png' },
        { name: 'Recharge', icon: '/assets/images/vip/icon-recharge-f3cb082e.webp' },
        { name: 'Weekly Cashback', icon: '/assets/images/vip/icon-cashback-weekly-a31e4d3e.png' },
        { name: 'Monthly Cashback', icon: '/assets/images/vip/icon-cashback-monthly-421a525b.png' },
        { name: 'Sports Weekly Cashback', icon: '/assets/images/vip/icon-sport-5d637a17.webp' },
        { name: 'No-fee Withdrawal', icon: '/assets/images/vip/icon-withdraw-3cb67dc5.webp' },
        { name: 'Exclusive SVIP Perks', icon: '/assets/images/vip/icon-svip-cd31e607.webp' },
        { name: 'Luxury Giveaway', icon: '/assets/images/vip/icon-giveaway-69ff76c2.webp' }
    ];

    const bonusAvailability: BonusAvailability = {
        Bronze: [true, true, true, false, false, false, false, false, false, false, false, false, false, false],
        Silver: [true, true, true, true, true, true, true, true, false, false, false, false, false, false],
        Gold: [true, true, true, true, true, true, true, true, true, true, true, true, true, true],
        'Platinum I-II': [true, true, true, true, true, true, true, true, true, true, true, true, true, true],
        'Diamond I-III': [true, true, true, true, true, true, true, true, true, true, true, true, true, true]
    };

    const StarIcon = ({ color }: { color: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
            <path
                d="M9.04894 0.927052C9.3483 0.00574112 10.6517 0.00573993 10.9511 0.927051L12.4697 5.60081C12.6035 6.01284 12.9875 6.2918 13.4207 6.2918H18.335C19.3037 6.2918 19.7065 7.53141 18.9228 8.10081L14.947 10.9894C14.5966 11.244 14.4499 11.6954 14.5838 12.1074L16.1024 16.7812C16.4017 17.7025 15.3472 18.4686 14.5635 17.8992L10.5878 15.0106C10.2373 14.756 9.7627 14.756 9.41221 15.0106L5.43648 17.8992C4.65276 18.4686 3.59828 17.7025 3.89763 16.7812L5.41623 12.1074C5.55011 11.6954 5.40345 11.244 5.05296 10.9894L1.07722 8.10081C0.293507 7.53141 0.696283 6.2918 1.66501 6.2918H6.57929C7.01252 6.2918 7.39647 6.01284 7.53035 5.60081L9.04894 0.927052Z"
                fill={color}
            />
        </svg>
    );

    return (
        <Stack direction="column" gap={2}>
            <Stack direction="column" gap={0.5}>
                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Exclusive VIP Bonus</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'text.secondary' }}>
                    Discover the ultimate gaming experience
                </Typography>
            </Stack>

            <Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: 2, bgcolor: 'background.card' }}>
                <Box sx={{ display: 'flex', overflow: 'auto', borderRadius: 2 }}>
                    <Box sx={{ width: { xs: 160, sm: 220 }, flexShrink: 0 }}>
                        <Box
                            sx={{
                                height: 48,
                                display: 'flex',
                                alignItems: 'center',
                                px: 2,
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'text.tertiary',
                                bgcolor: 'background.layer3',
                                borderBottom: 1,
                                borderRight: 1,
                                borderColor: 'background.layer3'
                            }}
                        >
                            Bonus Type
                        </Box>
                        {bonusTypes.map((bonus, index) => (
                            <Box
                                key={index}
                                sx={{
                                    height: { xs: 50, sm: 60 },
                                    display: 'flex',
                                    alignItems: 'center',
                                    px: { xs: 1, sm: 2 },
                                    borderRight: 1,
                                    borderBottom: 1,
                                    borderColor: 'background.layer3'
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}
                                    >
                                        <Box component="img" src={bonus.icon} sx={{ width: 'auto', height: 40 }} />
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: 12, sm: 14 },
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {bonus.name}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', overflow: 'auto', flexGrow: 1 }}>
                        {vipLevels.map((level, levelIndex) => (
                            <Box key={levelIndex} sx={{ width: '20%', flexShrink: 0, minWidth: 'fit-content' }}>
                                <Box
                                    sx={{
                                        height: 48,
                                        px: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRight: 1,
                                        borderBottom: 1,
                                        borderColor: 'background.layer3',
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                        color: 'text.primary',
                                        bgcolor: 'background.layer3'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box component="img" src={level.badge} sx={{ width: 24, height: 24 }} />
                                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, whiteSpace: 'nowrap' }}>
                                            {level.name}
                                        </Typography>
                                    </Box>
                                </Box>
                                {bonusTypes.map((bonus, bonusIndex) => (
                                    <Box
                                        key={bonusIndex}
                                        sx={{
                                            height: { xs: 50, sm: 60 },
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            px: 2,
                                            borderRight: 1,
                                            borderBottom: 1,
                                            borderColor: 'background.layer3'
                                        }}
                                    >
                                        {bonusAvailability[level.name][bonusIndex] ? (
                                            <StarIcon color={level.color} />
                                        ) : (
                                            <Typography sx={{ color: 'text.secondary' }}>--</Typography>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Paper>
        </Stack>
    );
};

export default VipBonus;
