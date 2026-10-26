import { Box, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';

const vipBenefits = [
    {
        title: ['No-Fee', 'Withdrawal'],
        description: 'Reach VIP 38 for no-fee cryptocurrency withdrawals.',
        image: '/assets/images/vip/card-img-withdraw-e0fd952c.webp'
    },
    {
        title: ['Rewarding', 'Lucky Spin'],
        description: 'Spin the wheel & receive bigger prizes as you level up.',
        image: '/assets/images/vip/card-img-spin-3bf7b727.webp'
    },
    {
        title: ['Dedicated', 'VIP Host'],
        description: 'Selected VIPs get personalized attention from a dedicated host.',
        image: '/assets/images/vip/card-img-host-7b693157.webp'
    },
    {
        title: ['Amazing', 'Level Up Bonus'],
        description: 'Unlock multiple surprise rewards as you level up.',
        image: '/assets/images/vip/card-img-chat-c94f7946.webp'
    },
    {
        title: ['Fun Tips & Raining'],
        description: 'Tip to show appreciation or try Coin Drops to win rewards.',
        image: '/assets/images/vip/card-img-bonus-d2edb713.webp'
    },
    {
        title: ['Exclusive Cashback'],
        description: 'Earn incredible cashback rewards every week & month.',
        image: '/assets/images/vip/card-img-cashback-8b9b4dcd.webp'
    }
];

const VipType = () => {
    const theme = useTheme();

    return (
        <Grid container spacing={{ xs: 1.5, sm: 3 }}>
            {vipBenefits.map((benefit, index) => (
                <Grid key={index} size={{ xs: 6, md: 4 }}>
                    <Card
                        sx={{
                            height: '14rem',
                            position: 'relative',
                            mt: { xs: 4, sm: 5 },
                            bgcolor: 'background.card',
                            borderRadius: 2,
                            overflow: 'visible'
                        }}
                    >
                        <CardContent
                            sx={{
                                transform: 'translateY(-70px)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '100%',
                                p: { xs: 0.5, sm: 2 }
                            }}
                        >
                            <Box
                                sx={{
                                    height: '8.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box
                                    component="img"
                                    src={benefit.image}
                                    alt={benefit.title.join(' ')}
                                    sx={{ height: '100%' }}
                                />
                            </Box>
                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: 16, sm: 18 }
                                    }}
                                >
                                    {benefit.title.map((line, i) => (
                                        <Box key={i} component="div">
                                            {line}
                                        </Box>
                                    ))}
                                </Typography>
                                <Typography
                                    sx={{
                                        mt: 1,
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        fontSize: { xs: 12, sm: 14 }
                                    }}
                                >
                                    {benefit.description}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default VipType;
