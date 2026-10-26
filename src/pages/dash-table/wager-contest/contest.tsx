import { Box, Typography, Stack, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatNumber } from 'utils/formatNumber';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface ContestProps {
    prizePool: number;
    timeRemaining: {
        hours: number;
        minutes: number;
        seconds: number;
    };
    lastChampion: {
        avatar: string;
        name: string;
        profit: number;
        profitPercentage: number;
    };
}

const GradientPaper = styled(Paper)(({ theme }) => ({
    background: `linear-gradient(90deg, rgba(76, 175, 80, 0.2) 0%, ${theme.palette.background.layer2} 60%)`,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius * 2,
    overflow: 'hidden'
}));

const TimeBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.layer3,
    borderRadius: 10,
    padding: theme.spacing(1),
    width: '48px',
    height: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}));

const Contest = ({ prizePool, timeRemaining, lastChampion }: ContestProps) => {
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <GradientPaper sx={{ flex: { sm: 2 } }}>
                <Box component="img" src="/assets/trophy-B3u8sNrg.webp" sx={{ width: 112 }} />
                <Box sx={{ ml: 3, textAlign: 'center' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Box component="img" src="/assets/grass-CpiRLZv-.webp" sx={{ width: 24 }} />
                        <Typography variant="subtitle1" fontWeight="bold" color="primary">
                            Daily Contest
                        </Typography>
                        <Box
                            component="img"
                            src="/assets/grass-CpiRLZv-.webp"
                            sx={{ width: 24, transform: 'scaleX(-1)' }}
                        />
                    </Stack>
                    <Typography variant="body2" sx={{ my: 1 }}>
                        Contest prize pool
                    </Typography>
                    <Paper
                        sx={{
                            px: 1.5,
                            py: 1,
                            width: '192px',
                            textAlign: 'center',
                            bgcolor: 'background.layer3',
                            borderRadius: 3
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold" color="primary" noWrap>
                            {formatNumber(prizePool)} BCD
                        </Typography>
                    </Paper>
                </Box>
            </GradientPaper>

            <Paper sx={{ flex: 1, p: 3, borderRadius: 4, textAlign: 'center', bgcolor: 'background.layer2' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="primary" gutterBottom>
                    Time Remaining
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                    <TimeBox>
                        <Typography variant="h6" fontWeight="bold">
                            {String(timeRemaining.hours).padStart(2, '0')}
                        </Typography>
                        <Typography variant="caption">Hour</Typography>
                    </TimeBox>
                    <Typography variant="h4" color="text.secondary" fontWeight="bold">
                        :
                    </Typography>
                    <TimeBox>
                        <Typography variant="h6" fontWeight="bold">
                            {String(timeRemaining.minutes).padStart(2, '0')}
                        </Typography>
                        <Typography variant="caption">Minute</Typography>
                    </TimeBox>
                    <Typography variant="h4" color="text.secondary" fontWeight="bold">
                        :
                    </Typography>
                    <TimeBox>
                        <Typography variant="h6" fontWeight="bold">
                            {String(timeRemaining.seconds).padStart(2, '0')}
                        </Typography>
                        <Typography variant="caption">Second</Typography>
                    </TimeBox>
                </Stack>
            </Paper>

            <Paper sx={{ flex: 1, p: 3, borderRadius: 4, position: 'relative', bgcolor: 'background.layer2' }}>
                <Box
                    component="img"
                    src="/assets/winner-2Gw-m0Lk.webp"
                    sx={{ width: 64, position: 'absolute', top: '-0.125rem', left: '-0.125rem' }}
                />

                <Typography
                    sx={{
                        position: 'absolute',
                        top: '0.6rem',
                        left: '-0.05rem',
                        fontSize: 14,
                        color: '#000',
                        transform: 'rotate(-42deg)',
                        fontWeight: 'bold'
                    }}
                >
                    Winner
                </Typography>

                <IconButton size="small" sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <HelpOutlineIcon sx={{ fontSize: 18 }} />
                </IconButton>

                <Typography variant="subtitle1" fontWeight="bold" color="primary" align="center" gutterBottom>
                    Last Champion
                </Typography>

                <Stack direction="row" justifyContent="center" spacing={2} alignItems="center" sx={{ ml: 2.5 }}>
                    <Box position="relative">
                        <Box
                            component="img"
                            src="/assets/crown-B_dBh7X7.webp"
                            sx={{
                                position: 'absolute',
                                width: 32,
                                left: 4,
                                top: -12
                            }}
                        />
                        <Box
                            component="img"
                            src={lastChampion.avatar}
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%'
                            }}
                        />
                    </Box>
                    <Box sx={{ fontSize: 12 }}>
                        <Typography variant="inherit">{lastChampion.name}</Typography>
                        <Typography variant="inherit">
                            Profit
                            <Typography variant="inherit" component="span" sx={{ ml: 0.5 }}>
                                ({lastChampion.profitPercentage}%)
                            </Typography>
                        </Typography>
                        <Typography variant="inherit" color="primary">
                            {lastChampion.profit.toFixed(5)} BCD
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default Contest;
