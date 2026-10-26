import { Link as ReactLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTranslate } from 'locales';

const GameLink = () => {
    const { t } = useTranslate();
    return (
        <Box
            sx={{
                mb: { md: 7, xs: 2 },
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(2, 1fr)' },
                gap: { md: 2.5, xs: 1 },
                flex: { xs: 1, sm: 2 }
            }}
        >
            <Box
                sx={{
                    p: { md: 3, xs: 0.6 },
                    px: { md: 3, xs: 1.25 },
                    height: { md: 260, xs: 120 },
                    borderRadius: 2,
                    overflow: 'visible',
                    position: 'relative',
                    textDecoration: 'none',
                    backgroundImage: 'linear-gradient(114.63deg, #3C3AC3 1.56%, #8D67F0 52.25%, #65A5FD 102.93%);'
                }}
                component={ReactLink}
                to={'/casino'}
            >
                <Box
                    component="img"
                    src="/assets/casino.png"
                    alt="casino"
                    sx={{
                        top: { md: -24, xs: 0 },
                        right: { md: -50, xs: -30 },
                        width: { md: 350, xs: 150 },
                        position: 'absolute'
                    }}
                />
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { md: 64, xs: 24 },
                        fontWeight: 700,
                        color: 'common.white',
                        textTransform: 'uppercase'
                    }}
                >
                    {t('casino')}
                </Typography>
            </Box>
            <Box
                sx={{
                    p: { md: 3, xs: 0.6 },
                    px: { md: 3, xs: 1.25 },
                    height: { md: 260, xs: 120 },
                    borderRadius: 2,
                    overflow: 'visible',
                    position: 'relative',
                    textDecoration: 'none',
                    backgroundImage: 'linear-gradient(114.63deg, #65A5FD 1.56%, #7BE9F1 52.25%, #22E9A7 102.93%);'
                }}
                component={ReactLink}
                to={'/sports'}
            >
                <Box
                    component="img"
                    src="/assets/sports.png"
                    alt="sports"
                    sx={{
                        top: { md: 0, xs: -10 },
                        right: { md: -50, xs: -30 },
                        width: { md: 290, xs: 140 },
                        position: 'absolute'
                    }}
                />
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { md: 64, xs: 24 },
                        fontWeight: 700,
                        color: 'common.white',
                        textTransform: 'uppercase'
                    }}
                >
                    {t('sports')}
                </Typography>
            </Box>
        </Box>
    );
};

export default GameLink;
