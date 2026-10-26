import { Box, Typography, Grid, Stack, Divider, useTheme } from '@mui/material';

const About = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                fontWeight: 600,
                color: 'text.secondary',
                pt: 4,
                fontSize: '0.75rem',
                borderTop: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Grid container spacing={2} sx={{ px: 2, gridTemplateRows: '1fr' }}>
                <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="img" src="logo.svg" alt="Bet-Throb" sx={{ objectFit: 'contain', height: '2rem' }} />
                </Grid>
                <Grid size={6}>
                    <Box
                        component="img"
                        src="/d4a3376ffe23d3348e6f6205498609fa-bc.png"
                        alt="Bet-Throb"
                        sx={{ objectFit: 'contain', width: '48px' }}
                    />
                </Grid>
                <Grid size={6}>
                    <Stack spacing={2} sx={{ fontSize: '12px' }}>
                        <Typography variant="inherit">
                            The ultimate crypto gaming destination, trusted by millions worldwide. We bring bold
                            entertainment, cutting-edge experiences, and a thriving community together for non-stop
                            thrills. Play, win, and stay untamed.
                        </Typography>
                        <Typography variant="inherit">
                            Your use of and access to Bet-Throb signifies that you fully understand and agree to be
                            legally bound by the contents of our Terms of Service and Responsible Gaming Policy
                        </Typography>
                        <Typography variant="inherit">
                            Crypto trading is not gambling by definition, therefore it is not covered by our gaming
                            license.
                        </Typography>
                    </Stack>
                </Grid>
                <Grid size={6}>
                    <Stack spacing={2} sx={{ fontSize: '12px' }}>
                        <Typography variant="inherit">
                            Bet-Throb is operated by Twocent Technology Limited, a limited liability company registered
                            in Belize with company registration number 000041939, with registered address at Sea Urchin
                            Street, San Pedro, Ambergris Caye, Belize. Bet-Throb is licensed and regulated by the
                            Government of the Autonomous Island of Anjouan, Union of Comoros and operates under License
                            No. ALSI-202410011-FI1. Bet-Throb has passed all regulatory compliance and is legally
                            authorized to conduct gaming operations for any and all games of chance and wagering.
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Divider sx={{ borderColor: 'divider' }} />
                <Typography variant="inherit" sx={{ py: 1, mt: 3 }}>
                    Copyright ©2025 BLOCKDANCE B.V. ALL RIGHTS RESERVED. 1BTC=$83,435.64
                </Typography>
            </Box>
        </Box>
    );
};

export default About;
