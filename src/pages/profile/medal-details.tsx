import { Box, LinearProgress, Paper, Typography } from '@mui/material';

const MedalDetails = ({ id }: { id: string }) => {
    return (
        <Paper sx={{ width: '100%', p: 2, bgcolor: 'background.layer2', borderRadius: 2 }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', px: 1 }}>
                <Box
                    component="img"
                    src="/assets/images/medals/achieve_1-c87ad7ad.webp"
                    sx={{
                        width: 'auto',
                        height: 120,
                        mb: 1.5
                    }}
                    alt="Talkative"
                />

                <Box sx={{ width: '50%', mb: 1 }}>
                    <LinearProgress
                        variant="determinate"
                        value={(0 / 200) * 100}
                        sx={{
                            height: 8,
                            borderRadius: 1,
                            backgroundColor: 'background.default',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: 'warning.main',
                                borderRadius: 1
                            }
                        }}
                    />
                </Box>

                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                    {0}/{200}
                </Typography>

                <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 1 }}>Talkative</Typography>

                <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: 'text.secondary', textAlign: 'center', mb: 2 }}
                >
                    Win this precious medal by chatting in any room for a total of 200 days. (Does not need to be
                    continuous 200 days!)
                </Typography>
            </Box>

            <Box sx={{ width: '100%', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: 32 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Quantity
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, ml: 'auto' }}>
                        Unlimited
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', height: 32 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Duration
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, ml: 'auto' }}>
                        Unlimited
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', height: 32 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Numbers of Achievements
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, ml: 'auto' }}>
                        11356
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default MedalDetails;
