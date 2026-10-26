import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import {
    Box,
    Stack,
    Table,
    Button,
    Dialog,
    Avatar,
    Collapse,
    Skeleton,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    Typography,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// api
import { luckSpinApi } from 'api/luckySpin.api';
// utils
import { ASSETS } from 'utils/axios';
import { fBalance } from 'utils/format-balance';
// types
import { WeelWiner } from 'types/spin';
// components
import { useSettingsContext } from 'components/settings';
// store
import { useSelector } from 'store/store';
// hooks
import { useResponsive } from 'hooks/use-responsive';
// pages
import { CloseButton } from 'pages/sign-modal/component';

type IPrize = {
    id: string;
    amount: number;
    probability: number;
};

const prizeCount = 16;

export const FreeSpinDialog = () => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const { modal, onToggleModal } = useSettingsContext();
    const balanceStore = useSelector((state: any) => state.balance);
    const isMobile = useResponsive('down', 'sm');

    const matchRef = useRef(null);
    const luckyWheelRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioWinRef = useRef<HTMLAudioElement>(null);
    const audioCollectRef = useRef<HTMLAudioElement>(null);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const intervalRef = useRef<any>(null);

    const [modalStatus, setModalStatus] = useState('loading');
    const [prizes, setPrizes] = useState<IPrize[]>([]);
    const [prize, setPrize] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [collecting, setCollecting] = useState(false);
    const [winerModal, setWinerModal] = useState(false);
    const [winners, setWinners] = useState<WeelWiner[]>([]);
    const [timeLeft, setTimeLeft] = useState('00:00:00');
    const [rewardId, setRewardId] = useState('');
    const [targetDate, setTargetDate] = useState(new Date());

    const topPrize = useMemo(() => {
        if (prizes.length) {
            let item = prizes[0];
            prizes.forEach((element) => {
                if (element.amount > item.amount) {
                    item = element;
                }
            });
            return item;
        }
        return null;
    }, [prizes]);

    // -----------------------------------------------------

    const calculateTimeLeft = (time: Date) => {
        const start = moment();
        const end = moment(time || targetDate);
        const totalSeconds = end.diff(start, 'seconds');

        if (totalSeconds <= 0) {
            return '00:00:00';
        }

        const hours = Math.floor(totalSeconds / 3600); // 3600 seconds in an hour
        const minutes = Math.floor((totalSeconds % 3600) / 60); // Remaining minutes
        const seconds = totalSeconds % 60; // Remaining seconds

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    const startTimer = (time: Date) => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(calculateTimeLeft(time));
            }, 1000);
        }
    };

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        return () => stopTimer();
    }, []);

    // -----------------------------------------------------

    const getWinners = async () => {
        try {
            const res = await luckSpinApi.getWinners();
            setWinners(res);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            enqueueSnackbar(typeof error === 'string' ? error : error.message || error.error, { variant: 'error' });
        }
    };

    const getStatistic = async () => {
        setCollecting(true);
        try {
            const res = await luckSpinApi.getStatistic();
            setTotalAmount(res.totalAmount);
        } catch (error) {
            console.error(error);
        } finally {
            setCollecting(false);
        }
    };

    const getStatus = async () => {
        try {
            const response = await luckSpinApi.getSpinData();
            if (!response.prizes) {
                enqueueSnackbar('Lucky spin is not available', { variant: 'info' });
                onToggleModal('');
                return;
            }
            setPrizes(response.prizes);
            if (response.status === 'waiting') {
                const now = moment();
                now.add(response.timeLeft.hours, 'hours')
                    .add(response.timeLeft.minutes, 'minutes')
                    .add(response.timeLeft.seconds, 'seconds');
                setTargetDate(now.toDate());
                setModalStatus('waiting');
                startTimer(now.toDate());
            }
            setModalStatus(response.status);
        } catch (error) {
            console.error(error);
        }
    };

    const collectPrize = async () => {
        try {
            audioCollectRef.current?.play();
            const res = await luckSpinApi.collect({ rewardId });
            enqueueSnackbar(res.message);
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (error: any) {
            enqueueSnackbar(typeof error === 'string' ? error : error.message || error.error, { variant: 'error' });
        }
    };

    useEffect(() => {
        if (modal === 'SPIN') {
            getWinners();
            getStatistic();
            getStatus();
        }
        // eslint-disable-next-line
    }, [modal]);

    // -----------------------------------------------------

    const showCollectWin = async (wheelIndex: number) => {
        try {
            setModalStatus('collect');
            audioWinRef.current?.play();
            resetWheelRotation();
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const onPlay = async () => {
        if (modalStatus === 'active') {
            const response = await luckSpinApi.play();
            response.rewardId;
            if (response.rewardId) {
                setRewardId(response.rewardId);
                setPrize(response.prize);
            }
            const prizeIndex = prizes.findIndex((prize) => prize.id === response.prizeId);
            spinWheel(prizeIndex, showCollectWin);
        }
    };

    function spinWheel(prizeIndex: number, callback: (i: number) => void) {
        if (isLoading) return;

        const anglePerPrize = 360 / prizeCount;
        const pointerAngleOffset = 90;

        let target = prizeIndex * anglePerPrize * -1; // - pointerAngleOffset;

        console.log('prize index: ', prizeIndex);
        console.log('target angle: ', target);

        target += 360 * prizeCount;
        spinCoroutine(target, prizeIndex, callback);
    }

    function spinCoroutine(target: number, prizeIndex: number, callback: (i: number) => void) {
        setIsLoading(true);
        const duration = 5 * 1000; // 10 seconds
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        let start: any = null;
        // Reset wheel rotation
        resetWheelRotation();

        function animateWheel(time: number) {
            if (!start) start = time;
            const elapsedTime = time - start;

            const t = elapsedTime / duration;
            const easedT = 1 - Math.pow(1 - t, 4);

            const currentAngle = (easedT * target) % 360;
            if (luckyWheelRef.current) {
                luckyWheelRef.current.style.transform = `rotate(${currentAngle}deg)`;
            }

            if (elapsedTime % (duration / prizeCount) < 100) {
                audioRef.current?.play();
            }

            if (elapsedTime < duration) {
                requestAnimationFrame(animateWheel);
            } else {
                elasticEffect(target, prizeIndex, callback);
            }
        }

        requestAnimationFrame(animateWheel);
    }

    function elasticEffect(target: number, prizeIndex: number, callback: (i: number) => void) {
        const randomOffset = Math.random() * 10 - 5; // Small random offset
        const elasticDuration = 700; // 700ms elastic effect
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        let start: any = null;

        function animateElastic(time: number) {
            if (!start) start = time;
            const elapsedTime = time - start;

            const elasticT = elapsedTime / elasticDuration;
            const easedElasticT = Math.sin(elasticT * Math.PI * 2) * (1 - elasticT);

            if (luckyWheelRef.current) {
                luckyWheelRef.current.style.transform = `rotate(${(target + randomOffset * easedElasticT) % 360}deg)`;
            }

            if (elapsedTime < elasticDuration) {
                requestAnimationFrame(animateElastic);
            } else {
                // Ensure final angle is exact
                const currentAngle = target % 360;
                if (luckyWheelRef.current) {
                    luckyWheelRef.current.style.transform = `rotate(${currentAngle}deg)`;
                }
                callback(prizeIndex);
            }
        }

        requestAnimationFrame(animateElastic);
    }

    function resetWheelRotation() {
        if (luckyWheelRef.current) {
            luckyWheelRef.current.style.transform = 'rotate(0deg)';
        }
    }

    // -----------------------------------------------------

    return (
        <Dialog
            open={modal === 'SPIN'}
            onClose={() => onToggleModal('')}
            fullWidth
            fullScreen={isMobile}
            sx={{
                borderRadius: 3,
                '& .MuiDialog-paperFullWidth': {
                    borderRadius: 3,
                    maxWidth: { md: 420, xs: 'auto' },
                    position: 'relative',
                    overflow: 'hidden'
                }
            }}
        >
            {(() => {
                if (modalStatus === 'loading') {
                    return (
                        <Stack>
                            <Stack sx={{ zIndex: 1 }}>
                                <Box
                                    component="div"
                                    sx={{
                                        backgroundSize: '100% auto',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <Stack alignItems={'center'} sx={{ pt: 2 }}>
                                        <Skeleton sx={{ width: '80%', height: 30 }} variant="text" />
                                        <Skeleton sx={{ width: 200, height: 50 }} variant="text" />
                                    </Stack>
                                </Box>
                                <Box
                                    sx={{
                                        my: 3.5,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        height: 305,
                                        width: 1
                                    }}
                                >
                                    <Skeleton sx={{ width: 305, height: 1 }} variant="circular" />
                                </Box>
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-around"
                                sx={{ height: 1, px: 2, mb: 2 }}
                            >
                                <Box
                                    sx={{
                                        height: 1
                                    }}
                                >
                                    <Stack justifyContent={'center'} alignItems={'center'} sx={{ height: 1 }}>
                                        <Stack justifyContent={'center'} alignItems={'center'} sx={{ height: 1 }}>
                                            <Skeleton sx={{ width: 1 }} variant="text" />
                                            <Skeleton sx={{ width: 100 }} variant="text" />
                                        </Stack>
                                    </Stack>
                                </Box>
                                <Skeleton
                                    sx={{ width: 128, height: 42, transform: 'scale(1)', borderRadius: 1 }}
                                    variant="text"
                                />
                            </Stack>
                            <div
                                style={{
                                    width: 200,
                                    height: 200,
                                    backgroundImage:
                                        'radial-gradient(circle at 50% 50%,rgb(25, 105, 65),rgba(25,26,27,0))',
                                    top: 160,
                                    right: 0,
                                    filter: 'blur(26px)',
                                    position: 'absolute'
                                }}
                            />
                            <div
                                style={{
                                    width: 150,
                                    height: 150,
                                    backgroundImage:
                                        'radial-gradient(circle at 50% 50%, rgb(25, 105, 65),rgba(25,26,27,0))',
                                    top: 400,
                                    left: 0,
                                    filter: 'blur(26px)',
                                    position: 'absolute'
                                }}
                            />
                            <div
                                style={{
                                    width: 430,
                                    height: 200,
                                    backgroundImage:
                                        'radial-gradient(circle at 50% 50%, rgb(25, 105, 65),rgba(25,26,27,0))',
                                    top: -100,
                                    left: -50,
                                    filter: 'blur(26px)',
                                    position: 'absolute'
                                }}
                            />
                        </Stack>
                    );
                }
                if (modalStatus === 'active' || modalStatus === 'waiting' || modalStatus === 'lowLevel') {
                    return (
                        <>
                            <Stack sx={{ overflow: 'hidden' }}>
                                <Collapse
                                    in={winerModal}
                                    sx={{
                                        position: 'absolute',
                                        width: 1,
                                        overflow: 'auto',
                                        height: '100% !important',
                                        zIndex: 1113,
                                        bgcolor: 'background.paper'
                                    }}
                                >
                                    <Stack justifyContent="center" sx={{ p: 1 }}>
                                        <Stack direction="row">
                                            <IconButton onClick={() => setWinerModal(false)}>
                                                <KeyboardArrowLeftIcon />
                                            </IconButton>
                                        </Stack>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Box
                                                component="img"
                                                src="/assets/freespin/crown.webp"
                                                alt="crown"
                                                sx={{ height: 48 }}
                                            />
                                            <Stack
                                                spacing={1}
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Box
                                                    component="img"
                                                    src="/assets/freespin/baytree.png"
                                                    alt="crown"
                                                    sx={{ height: 20 }}
                                                />
                                                <Typography component="span" sx={{ fontWeight: 800, fontSize: 12 }}>
                                                    {t('freeSpin.bonus.title')}
                                                </Typography>
                                                <Box
                                                    component="img"
                                                    src="/assets/freespin/baytree.png"
                                                    alt="crown"
                                                    sx={{ height: 20, transform: 'scaleX(-1)' }}
                                                />
                                            </Stack>
                                            <Table sx={{ mt: 2 }}>
                                                <TableHead>
                                                    <TableRow sx={{ '& th': { px: 1.5, py: 1 } }}>
                                                        <TableCell> {t('freeSpin.table.username')}</TableCell>
                                                        <TableCell> {t('freeSpin.table.prize')}</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody sx={{ overflow: 'auto', '& td': { px: 1.5, py: 1 } }}>
                                                    {winners.map((winner, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{winner.playerName}</TableCell>
                                                            <TableCell>{`${winner.amount} ${winner.currency}`}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Stack>
                                </Collapse>
                                <Stack sx={{ zIndex: 1 }}>
                                    <Box
                                        component="div"
                                        sx={{
                                            height: 170,
                                            backgroundImage: 'url(/assets/freespin/head.png)',
                                            backgroundSize: '100% auto',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        <Stack alignItems={'center'} sx={{ pt: 5 }}>
                                            <Typography
                                                variant="h3"
                                                fontWeight={800}
                                                sx={{
                                                    backgroundImage:
                                                        'linear-gradient(to bottom, #ffffff,rgb(123, 235, 179))',
                                                    filter: 'drop-shadow(1px 1px 0px rgb(76, 214, 122))',
                                                    color: 'transparent',
                                                    backgroundClip: 'text'
                                                }}
                                            >
                                                {modalStatus === 'waiting'
                                                    ? t('freeSpin.title.nextSpin')
                                                    : t('freeSpin.title.spinToWin')}
                                            </Typography>
                                            {modalStatus === 'waiting' ? (
                                                <Typography
                                                    variant="h2"
                                                    sx={{
                                                        textTransform: 'uppercase',
                                                        textAlign: 'center',
                                                        fontWeight: 800,
                                                        backgroundImage: 'linear-gradient(to bottom, #ffb31b, #ffda67)',
                                                        filter: 'drop-shadow(2px 2px 0 #c55b1a)',
                                                        color: 'transparent',
                                                        backgroundClip: 'text'
                                                    }}
                                                >
                                                    {timeLeft}
                                                </Typography>
                                            ) : (
                                                <Typography
                                                    variant="h2"
                                                    fontWeight={800}
                                                    sx={{
                                                        backgroundImage: 'linear-gradient(to bottom,#FFA600,#FFE47B)',
                                                        filter: 'drop-shadow(2px 2px 0 #CA8619)',
                                                        backgroundClip: 'text',
                                                        color: 'transparent'
                                                    }}
                                                >
                                                    {topPrize ? topPrize.amount : ''}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Box>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            height: 348,
                                            width: 1,
                                            marginBottom: 6
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                height: 348,
                                                width: 348,
                                                left: '50%',
                                                top: 0,
                                                transform: 'translate(-50%)'
                                            }}
                                        >
                                            <Box
                                                ref={luckyWheelRef}
                                                sx={{
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src="/assets/freespin/spin.webp"
                                                    sx={{
                                                        position: 'absolute',
                                                        width: 1,
                                                        height: 1,
                                                        left: 0,
                                                        top: 0
                                                    }}
                                                />
                                                {prizes.map((option, index) => {
                                                    return (
                                                        <Box
                                                            key={index}
                                                            component={'div'}
                                                            sx={{
                                                                height: 24,
                                                                transform: `rotate(${index * 22.5}deg)`,
                                                                position: 'absolute',
                                                                width: 90,
                                                                top: '50%',
                                                                left: '50%',
                                                                marginTop: '-12px',
                                                                marginLeft: '60px',
                                                                transformOrigin: '-60px center'
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    textShadow: '0px 2px 0px rgba(0,0,0,.3)',
                                                                    color: 'common.white',
                                                                    textAlign: 'right'
                                                                }}
                                                                noWrap
                                                            >
                                                                <span style={{ fontWeight: 700 }}>
                                                                    {' '}
                                                                    {option.amount}
                                                                </span>
                                                                <span style={{ fontWeight: 700 }}>
                                                                    {' '}
                                                                    {balanceStore.currency}
                                                                </span>
                                                            </Typography>
                                                        </Box>
                                                    );
                                                })}
                                                <Box
                                                    component="img"
                                                    src="/assets/freespin/light.webp"
                                                    sx={{
                                                        position: 'absolute',
                                                        width: 1,
                                                        height: 1,
                                                        left: 0,
                                                        top: 0,
                                                        animation: 'spin-light-rotate linear 2s infinite',
                                                        '@keyframes spin-light-rotate': {
                                                            '0%': {
                                                                transform: 'rotate(0)'
                                                            },
                                                            '49.99%': {
                                                                transform: 'rotate(0)'
                                                            },
                                                            '50%': {
                                                                transform: 'rotate(22.5deg)'
                                                            },
                                                            '99.99%': {
                                                                transform: 'rotate(22.5deg)'
                                                            },
                                                            '100%': {
                                                                transform: 'rotate(0)'
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Box>
                                            <Box>
                                                <Box
                                                    component="div"
                                                    sx={{
                                                        position: 'absolute',
                                                        width: 90,
                                                        height: 90,
                                                        zIndex: 1,
                                                        top: '50%',
                                                        left: '50%',
                                                        marginTop: '-45px',
                                                        marginLeft: '-45px',
                                                        cursor: 'pointer',
                                                        transition: 'transform .2s ease',
                                                        '&:hover': {
                                                            transform: 'scale(1.1)'
                                                        }
                                                    }}
                                                >
                                                    {!isLoading && (
                                                        <Box
                                                            className="play-button"
                                                            onClick={onPlay}
                                                            component="img"
                                                            src="/assets/freespin/button.png"
                                                            sx={{
                                                                width: 77,
                                                                height: 49,
                                                                position: 'absolute',
                                                                top: 20,
                                                                left: 7,
                                                                animation: 'spin-button-rotate 2s infinite linear',
                                                                '@keyframes spin-button-rotate': {
                                                                    '0%': {
                                                                        transform: 'rotate(-5deg) scaleZ(1)'
                                                                    },

                                                                    '50%': {
                                                                        transform: 'rotate(0deg) scale3d(1.1, 1.1, 1.1)'
                                                                    },

                                                                    '100%': {
                                                                        transform: 'rotate(-5deg) scaleZ(1)'
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                                <Box
                                                    component="img"
                                                    src="/assets/freespin/center.png"
                                                    sx={{
                                                        top: '50%',
                                                        left: '50%',
                                                        marginTop: '-45px',
                                                        marginLeft: '-45px',
                                                        height: 90,
                                                        position: 'absolute'
                                                    }}
                                                />
                                                <Box
                                                    ref={matchRef}
                                                    component="img"
                                                    src="/assets/freespin/point.webp"
                                                    sx={{
                                                        // zIndex: 2,
                                                        position: 'absolute',
                                                        height: 90,
                                                        width: 160,
                                                        top: 130,
                                                        right: -30,
                                                        transformOrigin: 'left center'
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Stack>
                                {modalStatus === 'lowLevel' && (
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        sx={{ px: 1 }}
                                        // sx={{ position: 'absolute', bottom: 80, width: 1, zIndex: 1, px: 1 }}
                                    >
                                        <Typography
                                            sx={{
                                                textAlign: 'center',
                                                py: 1,
                                                bgcolor: 'background.layer3',
                                                boxShadow: '0 0 20px  #21dc9f42',
                                                width: 1,
                                                borderRadius: 1
                                            }}
                                        >
                                            Available at VIP2
                                        </Typography>
                                    </Stack>
                                )}
                                <Box component="div" sx={{ height: 70, m: 1 }}>
                                    <Stack direction="row" sx={{ height: 1 }} spacing={0.5}>
                                        <Box
                                            sx={{
                                                bgcolor: 'background.layer3',
                                                width: 1,
                                                flexGrow: 1,
                                                height: 1,
                                                borderRadius: 2
                                            }}
                                        >
                                            <Stack justifyContent={'center'} alignItems={'center'} sx={{ height: 1 }}>
                                                <Typography variant="caption">{t('freeSpin.bonus.total')}</Typography>
                                                <Typography color="warning.light" fontWeight={800}>
                                                    $ {fBalance(totalAmount)}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                        <Box
                                            sx={{
                                                bgcolor: 'background.layer3',
                                                height: 1,
                                                width: 1,
                                                borderRadius: 2
                                            }}
                                        >
                                            {winners.length ? (
                                                <Button
                                                    onClick={() => setWinerModal(true)}
                                                    sx={{
                                                        height: 1,
                                                        width: ' 13.75rem',
                                                        px: 2,
                                                        justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <Avatar
                                                            sx={{ width: 30, height: 30 }}
                                                            src={ASSETS(winners[0].avatar)}
                                                        />
                                                        <Stack alignItems="flex-start">
                                                            <Typography color="text.secondary">
                                                                {winners[0].playerName}
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                {t('freeSpin.bonus.win')} &nbsp;
                                                                <Typography
                                                                    component="span"
                                                                    color="primary.main"
                                                                    variant="body2"
                                                                >
                                                                    {winners[0].amount}
                                                                </Typography>
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <ArrowForwardIosIcon sx={{ height: 20 }} />
                                                </Button>
                                            ) : (
                                                <Button
                                                    sx={{
                                                        height: 1,
                                                        width: ' 13.75rem',
                                                        px: 2,
                                                        justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <Avatar sx={{ width: 30, height: 30 }} />
                                                        <Stack alignItems="flex-start">
                                                            <Typography color="text.secondary">vam***</Typography>
                                                            <Typography variant="body2">
                                                                {'Win: '}
                                                                <Typography
                                                                    component="span"
                                                                    color="primary.main"
                                                                    variant="body2"
                                                                >
                                                                    {'2.00 USD'}
                                                                </Typography>
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <ArrowForwardIosIcon sx={{ height: 20 }} />
                                                </Button>
                                            )}
                                        </Box>
                                    </Stack>
                                </Box>
                                <div
                                    style={{
                                        width: 200,
                                        height: 200,
                                        backgroundImage:
                                            'radial-gradient(circle at 50% 50%,rgb(25, 105, 65),rgba(25,26,27,0))',
                                        top: 160,
                                        right: 0,
                                        filter: 'blur(26px)',
                                        position: 'absolute'
                                    }}
                                />
                                <div
                                    style={{
                                        width: 150,
                                        height: 150,
                                        backgroundImage:
                                            'radial-gradient(circle at 50% 50%, rgb(25, 105, 65),rgba(25,26,27,0))',
                                        top: 400,
                                        left: 0,
                                        filter: 'blur(26px)',
                                        position: 'absolute'
                                    }}
                                />
                                <div
                                    style={{
                                        width: 430,
                                        height: 200,
                                        backgroundImage:
                                            'radial-gradient(circle at 50% 50%, rgb(25, 105, 65),rgba(25,26,27,0))',
                                        top: -100,
                                        left: -50,
                                        filter: 'blur(26px)',
                                        position: 'absolute'
                                    }}
                                />
                            </Stack>
                            <audio ref={audioRef} controls style={{ display: 'none' }}>
                                <source src="/audio/tick.mp3" type="audio/mp3" />
                            </audio>
                            <audio ref={audioWinRef} controls style={{ display: 'none' }}>
                                <source src="/audio/win.mp3" type="audio/mp3" />
                            </audio>
                        </>
                    );
                }
                if (modalStatus === 'collect') {
                    return (
                        <>
                            <Stack sx={{ position: 'relative' }}>
                                <Stack
                                    sx={{
                                        width: 1,
                                        height: 1,
                                        pt: 6,
                                        pb: 3,
                                        px: 3,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Stack
                                        sx={{
                                            borderRadius: 1,
                                            width: 1,
                                            bgcolor: 'background.level2'
                                        }}
                                        spacing={2}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{ textTransform: 'uppercase', textAlign: 'center', fontWeight: 700 }}
                                        >
                                            congratulations
                                        </Typography>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                textTransform: 'uppercase',
                                                textAlign: 'center',
                                                fontWeight: 800,
                                                color: '#FFA700',
                                                fontSize: 24
                                            }}
                                        >
                                            {prize}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            disabled={collecting}
                                            onClick={collectPrize}
                                        >
                                            Collect
                                        </Button>
                                        <Button
                                            onClick={() => onToggleModal('')}
                                            variant="outlined"
                                            sx={{ color: 'primary.main' }}
                                        >
                                            Close
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <audio ref={audioCollectRef} controls style={{ display: 'none' }}>
                                <source src="/audio/collect.mp3" type="audio/mp3" />
                            </audio>
                        </>
                    );
                }
            })()}
            <CloseButton
                onClick={() => onToggleModal('')}
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1
                }}
            >
                <CloseIcon sx={{ fontSize: 16 }} />
            </CloseButton>
        </Dialog>
    );
};
