import { useState } from 'react';
import { useTranslate } from 'locales';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
// hooks
import { useAuth } from 'hooks/use-auth-context';
// components
import ColorButton from 'components/ColorButton';
import { useSettingsContext } from 'components/settings';
// api
import { gameLaunch } from 'api';
//
import { useSnackbar } from 'notistack';
import { useSelector } from 'store/store';
import { Dialog, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const GameContainer_ = styled(Box)(({ theme }) => ({
    maxWidth: '100%',
    position: 'relative',
    zIndex: 100,
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: { padding: 0 },
    backgroundColor: theme.palette.background.layer2,
    borderRadius: 8
}));

const GameFrame = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 10,
    backgroundColor: theme.palette.background.layer2,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    transition: 'all 0.3s'
}));

const GameOverlay = styled(Box)({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
});

const GameControls = styled(Box)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
}));

const GameContainer = ({ gameData, gameCode }: { gameData: any; gameCode: string }) => {
    const { t } = useTranslate();
    const { language, isLogined } = useAuth();
    const balance = useSelector((state) => state.balance);
    const { enqueueSnackbar } = useSnackbar();
    const { onToggleModal } = useSettingsContext();
    const [loading, setLoading] = useState(false);
    const [launchUrl, setLaunchUrl] = useState('');
    const [launchState, setLaunchState] = useState(false);

    const launchGame = async () => {
        try {
            let currency = balance.currency;
            const supportCurrencies = gameData.support_currency.split(',');
            if (!supportCurrencies.includes(balance.currency)) {
                if (balance.currency === 'IDR') {
                    if (!supportCurrencies.includes('IDR2')) {
                        enqueueSnackbar('This game does not support your currency.', { variant: 'error' });
                        return;
                    } else {
                        currency = 'IDR2';
                    }
                } else {
                    enqueueSnackbar('This game does not support your currency.', { variant: 'error' });
                    return;
                }
            }
            setLoading(true);
            const response = await gameLaunch({
                gameCode,
                currency,
                language,
                productCode: gameData.product_code,
                gameType: gameData.game_type
            });
            if (response.status) {
                setLaunchUrl(response.url);
                setLaunchState(true);
            } else {
                enqueueSnackbar(response.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <GameContainer_>
            <GameFrame>
                <Dialog
                    open={launchState}
                    onClose={() => setLaunchState(false)}
                    fullWidth
                    fullScreen
                    sx={{
                        '& .MuiDialog-paperFullWidth': {
                            position: 'relative',
                            overflow: 'hidden'
                        }
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ p: 1, pr: 2, bgcolor: 'background.layer3' }}
                    >
                        <IconButton
                            onClick={() => {
                                setLaunchState(false);
                                setLaunchUrl('');
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={0.5}
                            sx={(theme) => ({
                                p: '3px',
                                height: { md: '40px', xs: '38px' },
                                border: `2px solid ${theme.palette.divider}`,
                                borderRadius: 2
                            })}
                        >
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={{ md: 1, xs: 0.5 }}
                            >
                                <Box
                                    component="img"
                                    src={balance.icon || ''}
                                    alt="currency"
                                    sx={{ width: { md: 22, xs: '18px' }, height: { md: 20, xs: 16 } }}
                                />
                                <Typography sx={{ fontWeight: 600, fontSize: { md: '18px', xs: '12px' } }}>
                                    {balance.amount.toFixed(2)}
                                </Typography>
                            </Stack>
                            <ColorButton
                                onClick={() => onToggleModal('DEPOSIT')}
                                sx={{
                                    height: '1.8rem',
                                    fontSize: { md: '14px', xs: '10px' },
                                    px: { md: 2, xs: 0 },
                                    width: 'auto'
                                }}
                            >
                                {t('deposit')}
                            </ColorButton>
                        </Stack>
                    </Stack>
                    <iframe
                        style={{
                            width: '100%',
                            border: 'none',
                            zIndex: '100%',
                            height: '100%'
                        }}
                        src={launchUrl}
                    />
                </Dialog>

                {!isLogined ? (
                    <GameOverlay>
                        <Box
                            sx={{
                                maxWidth: '30rem',
                                bgcolor: 'background.layer1',
                                p: { xs: 2, sm: 4 },
                                borderRadius: 2
                            }}
                        >
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <ColorButton
                                    sx={{ width: '12rem', display: 'flex', alignItems: 'center', gap: 1 }}
                                    onClick={() => onToggleModal('SIGNIN')}
                                >
                                    <PlayCircleOutlineOutlinedIcon sx={{ fontSize: 16 }} />
                                    {t('auth.signIn')}
                                </ColorButton>
                            </Stack>
                        </Box>
                    </GameOverlay>
                ) : (
                    <GameOverlay>
                        <Box
                            sx={{
                                maxWidth: '30rem',
                                bgcolor: 'background.layer1',
                                p: { xs: 2, sm: 4 },
                                borderRadius: 2
                            }}
                        >
                            <Stack sx={{ flexDirection: { md: 'row' } }} spacing={2} justifyContent="center">
                                {!launchState && (
                                    <ColorButton
                                        sx={{ width: '18rem', display: 'flex', alignItems: 'center', gap: 1 }}
                                        onClick={() => launchGame()}
                                        loading={loading}
                                    >
                                        <PlayCircleOutlineOutlinedIcon sx={{ fontSize: 16 }} />
                                        {t('game.playGame')}
                                    </ColorButton>
                                )}
                            </Stack>
                        </Box>
                    </GameOverlay>
                )}

                <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                    <Box
                        component="img"
                        src={gameData?.image_url}
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: 'auto',
                            filter: 'blur(1px)',
                            animation: 'scaleOpacity 1s ease-in-out'
                        }}
                    />
                </Box>
            </GameFrame>

            {/* <GameControls>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        pr={2}
                        borderRight="1px solid"
                        borderColor="divider"
                    >
                        {['favourite', 'like', 'share'].map((icon) => (
                            <Box
                                key={icon}
                                component="img"
                                src={`/assets/icons/${icon}.svg`}
                                alt={icon}
                                sx={{ width: 24, height: 24 }}
                            />
                        ))}
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <IconButton onClick={toggleFullscreen}>
                            <Box
                                component="img"
                                src={`/assets/icons/full-screen.svg`}
                                alt="full-screen"
                                sx={{ width: 24, height: 24 }}
                            />
                        </IconButton>
                        {['live-stats', 'movie-mode', 'full-screen'].map((icon) => (
                            <IconButton key={`game-${icon}`}>
                                <Box
                                    component="img"
                                    src={`/assets/icons/${icon}.svg`}
                                    alt={icon}
                                    sx={{ width: 24, height: 24 }}
                                />
                            </IconButton>
                        ))}
                    </Stack>
                </Stack>

                <Box
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        position: 'absolute',
                        inset: 0,
                        m: 'auto',
                        height: 32
                    }}
                />

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ flex: 1, zIndex: 10 }}
                >
                    <Box sx={{ display: 'flex', px: 2, ml: 'auto' }} />
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 0.5,
                            height: 40,
                            borderRadius: 1,
                            bgcolor: 'background.default',
                            p: 0.5
                        }}
                    >
                        <Button
                            sx={{
                                px: 2,
                                height: '100%',
                                whiteSpace: 'nowrap',
                                fontSize: { xs: 12, sm: 14 },
                                bgcolor: 'background.layer2'
                            }}
                        >
                            Real Play
                        </Button>
                    </Box>
                </Stack>
            </GameControls> */}
        </GameContainer_>
    );
};

export default GameContainer;
