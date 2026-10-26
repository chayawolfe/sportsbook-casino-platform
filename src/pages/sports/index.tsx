import { useTranslate } from 'locales';
import { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
// @mui
import { Box, Button, Card, Grid, Skeleton, Stack, Typography, useTheme } from '@mui/material';
// api
import { getSports } from 'api';
// hooks
import { useResponsive } from 'hooks/use-responsive';
import { RightIcon } from 'icons';
import DashTable from 'pages/dash-table';
// store
import { dispatch, useSelector } from 'store/store';
import { updateSport } from 'store/slices/setting';
import { useAuth } from 'hooks/use-auth-context';

const SPORT_DATA: any = {
    123: {
        name: 'FB SPORTS',
        logo: '/assets/sports/fb.png',
        logoLight: '/assets/sports/fb-light.png',
        color: '#8b71ff1f',
        mHeight: 40,
        mWidth: 73
    },
    116: {
        name: 'DIGITAIN',
        logo: '/assets/sports/digitain.png',
        logoLight: '/assets/sports/digitain-light.png',
        color: '#05A8C31f',
        mHeight: 23,
        mWidth: 129
    },
    19: {
        name: 'WBET',
        logo: '/assets/sports/wbet.png',
        logoLight: '/assets/sports/wbet-light.png',
        color: '#D99E3F1f',
        mHeight: 25,
        mWidth: 74
    },
    30: {
        name: 'SABA SPORTS',
        logo: '/assets/sports/saba.png',
        logoLight: '/assets/sports/saba-light.png',
        color: '#E13C291f',
        mHeight: 33,
        mWidth: 93
    }
};

const CERTIFICATIONS = [
    '/assets/images/certification/18.png',
    '/assets/images/certification/crypto-gambling.png',
    '/assets/images/certification/itech.png',
    '/assets/images/certification/gcb.png',
    '/assets/images/certification/pci.png'
];

const Sports = () => {
    const theme = useTheme();
    const { t } = useTranslate();
    const { sportList } = useSelector((state) => state.setting);
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const isMobile = useResponsive('down', 'sm');

    const getSportsList = async () => {
        try {
            setLoading(true);
            const response = await getSports();
            dispatch(updateSport(response.sort((a: any, b: any) => a.order - b.order)));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!sportList.length) {
            getSportsList();
        }
        // eslint-disable-next-line
    }, []);

    const desktopRender = (
        <Stack direction="column" spacing={4}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-around"
                sx={{
                    borderRadius: 3,
                    background: 'linear-gradient(343.06deg, #005CE5 12.1%, #053D90 89.12%)'
                }}
            >
                <Typography sx={{ fontSize: 40, fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
                    {t('sports')}
                </Typography>
                <Box>
                    <Box component="img" src="/assets/sports/banner.png" />
                </Box>
            </Stack>

            {loading ? (
                <Grid container spacing={4}>
                    {[1, 2, 3, 4].map((index) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={index}>
                            <Card sx={{ borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? '#1b3335' : '#fff' }}>
                                <Skeleton sx={{ minHeight: 224 }} />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Grid container spacing={4}>
                    {sportList.map((sport: any, index) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={index}>
                            <Card
                                sx={{
                                    width: 1,
                                    bgcolor: theme.palette.mode === 'dark' ? '#1b3335' : '#fff',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 0,
                                    position: 'relative',
                                    borderRadius: 3
                                }}
                            >
                                <Box display="flex" alignItems="center" sx={{ width: 1, zIndex: 10 }}>
                                    <Box
                                        sx={{
                                            width: 224,
                                            height: 224,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: `linear-gradient(270deg, #00000021 29.11%, ${SPORT_DATA[sport.provider_id].color} 99.61%)`
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={
                                                theme.palette.mode === 'dark'
                                                    ? SPORT_DATA[sport.provider_id].logo
                                                    : SPORT_DATA[sport.provider_id].logoLight
                                            }
                                            alt={SPORT_DATA[sport.provider_id].name}
                                        />
                                    </Box>
                                    <Stack
                                        alignItems="center"
                                        justifyContent="center"
                                        spacing={'22px'}
                                        sx={{ flexGrow: 1, flex: 1 }}
                                    >
                                        <Typography fontWeight="bold" sx={{ fontSize: 24 }}>
                                            {SPORT_DATA[sport.provider_id].name}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            endIcon={
                                                <RightIcon
                                                    sx={{
                                                        width: 5,
                                                        height: 8,
                                                        color: sport.state ? '#000' : '#00000082'
                                                    }}
                                                />
                                            }
                                            key={index}
                                            {...(sport.state && user?.currency && {
                                                component: ReactLink,
                                                disabled: !sport.currency.includes(user.currency),
                                                to: `/sports/game/${sport.product_code}/${user.currency}`
                                            })}
                                            sx={{
                                                height: 40,
                                                minWidth: 116,
                                                borderRadius: 50,
                                                px: 2,
                                                background: 'linear-gradient(90deg, #9FEA53 0%, #64E7A3 100%)',
                                                color: sport.state ? '#000' : '#00000082',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    background: 'linear-gradient(90deg, #9FEA53 0%, #64E7A3 100%)'
                                                }
                                            }}
                                        >
                                            {sport.state ? t('start') : t('comingSoon')}
                                        </Button>
                                    </Stack>
                                </Box>
                                <Box
                                    component="img"
                                    src={`/assets/sports/${theme.palette.mode === 'dark' ? 'mask' : 'mask-light'}.png`}
                                    sx={{ position: 'absolute', height: 1, top: 0, right: 0 }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Stack>
    );

    const mobileRender = (
        <Stack>
            <Box
                sx={{
                    mt: -2,
                    ml: -2,
                    mr: -2,
                    position: 'relative'
                }}
            >
                <Box component="img" src="/assets/sports/banner-mobile.png" />
                {theme.palette.mode === 'light' && (
                    <Box
                        sx={{
                            bottom: -1,
                            width: 1,
                            height: 100,
                            position: 'absolute',
                            background: 'linear-gradient(180deg, rgba(229, 229, 229, 0) 1.99%, #f3f3f3 93.22%)'
                        }}
                    />
                )}
            </Box>

            <Stack spacing={'9px'} sx={{ position: 'relative', top: -135, px: 0.5 }}>
                <Typography sx={{ fontSize: 32, fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
                    {t('sports')}
                </Typography>
                <Grid container spacing={'14px'}>
                    {sportList.map((sport: any, index) => (
                        <Grid size={6} key={index}>
                            <Card
                                sx={{
                                    width: 1,
                                    bgcolor: theme.palette.mode === 'dark' ? '#1b3335' : '#fff',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 0,
                                    position: 'relative',
                                    borderRadius: 3
                                }}
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexDirection="column"
                                    sx={{ width: 1, zIndex: 99 }}
                                >
                                    <Box
                                        sx={{
                                            width: 1,
                                            height: 76,
                                            px: '15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: `linear-gradient(0deg, transparent 29.11%, ${SPORT_DATA[sport.provider_id].color} 99.61%)`
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: SPORT_DATA[sport.provider_id].mWidth,
                                                height: SPORT_DATA[sport.provider_id].mHeight
                                            }}
                                            component="img"
                                            src={
                                                theme.palette.mode === 'dark'
                                                    ? SPORT_DATA[sport.provider_id].logo
                                                    : SPORT_DATA[sport.provider_id].logoLight
                                            }
                                            alt={SPORT_DATA[sport.provider_id].name}
                                        />
                                    </Box>
                                    <Stack
                                        alignItems="center"
                                        justifyContent="center"
                                        spacing={'7px'}
                                        sx={{ flexGrow: 1, flex: 1, pb: '14px' }}
                                    >
                                        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: 14 }}>
                                            {SPORT_DATA[sport.provider_id].name}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            endIcon={
                                                <RightIcon
                                                    sx={{
                                                        width: 5,
                                                        height: 6,
                                                        color: sport.state ? '#000' : '#00000082'
                                                    }}
                                                />
                                            }
                                            key={index}
                                            {...(sport.state && user?.currency && {
                                                component: ReactLink,
                                                disabled: !sport.currency.includes(user.currency),
                                                to: `/sports/game/${sport.product_code}/${sport.currency}`
                                            })}
                                            sx={{
                                                height: 28,
                                                with: 82,
                                                minWidth: 0,
                                                borderRadius: 50,
                                                background: 'linear-gradient(90deg, #9FEA53 0%, #64E7A3 100%)',
                                                color: sport.state ? '#000' : '#00000082',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    background: 'linear-gradient(90deg, #9FEA53 0%, #64E7A3 100%)'
                                                },
                                                '.MuiButton-icon': {
                                                    ml: '4px',
                                                    mr: '3px'
                                                }
                                            }}
                                        >
                                            {sport.state ? t('start') : t('comingSoon')}
                                        </Button>
                                    </Stack>
                                </Box>
                                <Box
                                    component="img"
                                    src={`/assets/sports/${theme.palette.mode === 'dark' ? 'mask-mobile' : 'mask-mobile-light'}.png`}
                                    sx={{ position: 'absolute', width: 1, bottom: 0, right: 0 }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Stack>
    );

    return (
        <Box>
            {isMobile ? mobileRender : desktopRender}
            <DashTable />

            <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: 'space-between', md: 'flex-start' }}
                spacing={{ md: 10, xs: 2 }}
                sx={{
                    mt: 3,
                    pt: 5,
                    borderTop: '1px solid',
                    borderColor: 'divider'
                }}
            >
                {CERTIFICATIONS.map((link, i) => (
                    <Box
                        key={i}
                        component="img"
                        src={link}
                        sx={{
                            height: { md: 64, xs: 32 }
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default Sports;
