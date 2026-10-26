import { groupBy } from 'lodash';
import { useMemo, useState } from 'react';
import { useTranslate } from 'locales';
// @mui
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    Box,
    Button,
    Stack,
    Dialog,
    Collapse,
    Typography,
    IconButton,
    DialogTitle,
    DialogContent,
    LinearProgress
} from '@mui/material';
// store
import { useSelector } from 'store/store';
// types
import { IVip } from 'types/site';
// utils
import { ASSETS } from 'utils/axios';
import { useBoolean } from 'hooks/use-boolean';

const StaticLinearProgress = styled(LinearProgress)(({ theme }) => ({
    '& .MuiLinearProgress-bar': {
        transition: 'none', // Disable smooth transition
        animation: 'none' // Disable any running animation
    }
}));

const StyledContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    overflow: 'hidden',
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
        flexWrap: 'wrap'
    }
}));

const VipCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
        flexBasis: '40rem'
    }
}));

const VipContent = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius * 3,
    backgroundImage: 'linear-gradient(-12deg, transparent 28%, rgba(113, 113, 113, 0.5) 82%)',
    boxShadow: theme.shadows[1],
    [theme.breakpoints.up('sm')]: {
        minHeight: '14rem',
        paddingBottom: 0
    }
}));

const VipBadge = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: -1,
    marginRight: theme.spacing(4),
    width: '7rem',
    height: '7rem',
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(5),
        width: '11rem',
        height: '11rem'
    }
}));

const VipProgress = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(0deg, rgba(58, 65, 66, 0.5) 5%, rgba(110, 110, 110, 0.5) 117.33%)'
            : 'linear-gradient(0deg, rgba(255, 255, 255, 0.5) 5%, rgba(255, 255, 255, 0.5) 117.33%)',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2)
    }
}));

const VipStatus = ({ vipData }: { vipData: IVip[] }) => {
    const { t } = useTranslate();
    const balance = useSelector((store) => store.balance);
    const modal = useBoolean();

    const [index, setIndex] = useState(-1);

    const { progress, currentVip, nextVip } = useMemo(() => {
        const sorted = vipData.sort((a, b) => a.xp - b.xp);

        let currentVip = null;
        let nextVip = null;
        let progress = 0;
        for (let i = 0; i < sorted.length; i++) {
            if (sorted[i].xp <= balance.turnover) {
                currentVip = sorted[i];
            } else {
                nextVip = sorted[i];
                break;
            }
        }

        if (currentVip && nextVip) {
            progress = ((balance.turnover - currentVip.xp) / (nextVip.xp - currentVip.xp)) * 100;
        }
        return { progress, currentVip, nextVip };
    }, [balance, vipData]);

    const renderData = useMemo(() => {
        return groupBy(vipData, 'tiersName');
    }, [vipData]);

    return (
        <StyledContainer>
            <VipCard>
                <VipContent sx={{ pb: { xs: 1, sm: 2 } }}>
                    <Box sx={{ display: 'flex', width: '100%', gap: 2, pl: { sm: 3 } }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexGrow: 1,
                                flexDirection: 'column',
                                gap: 2,
                                pl: { xs: 1.5, sm: 3 },
                                pr: 0,
                                pt: { xs: 1.5, sm: 3 },
                                order: { sm: 2 }
                            }}
                        >
                            <Typography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    fontSize: { xs: 20, sm: 30 },
                                    fontWeight: 800,
                                    textTransform: 'uppercase'
                                }}
                            >
                                {currentVip?.levelName || 'VIP 0'}
                            </Typography>

                            <VipProgress>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                        {`${(balance.turnover || 0).toFixed()} XP`}
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                        {`${nextVip?.xp || 0} XP`}
                                    </Typography>
                                </Box>

                                <Box sx={{ width: '100%', position: 'relative' }}>
                                    <StaticLinearProgress
                                        variant="determinate"
                                        value={progress}
                                        sx={{
                                            height: { xs: 8, sm: 12 },
                                            borderRadius: 2,
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundImage:
                                                    'linear-gradient(to right, rgb(185, 185, 185), rgb(241, 241, 241))'
                                            }
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            left: `${progress}%`,
                                            top: '50%',
                                            transform: 'translate(-16px, -50%)',
                                            width: 24,
                                            height: 24
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="#B9B9B9"
                                            width="100%"
                                            height="100%"
                                        >
                                            <circle opacity="0.1" cx="12" cy="12" r="12" />
                                            <circle opacity="0.25" cx="12" cy="12" r="7" />
                                            <circle cx="12" cy="12" r="4" />
                                        </svg>
                                    </Box>
                                </Box>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 600,
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    {`${((nextVip?.xp || balance.turnover) - balance.turnover || 0).toFixed()}XP until `}
                                    <Box component="span" sx={{ textTransform: 'uppercase' }}>
                                        {nextVip?.levelName || 'VIP 0'}
                                    </Box>
                                </Typography>
                            </VipProgress>
                        </Box>

                        <VipBadge>
                            <Box
                                component="img"
                                src={ASSETS(currentVip?.icon || '/assets/images/vip/vip-badge.webp')}
                                sx={{ width: '100%', height: '100%', position: 'absolute', top: '15%' }}
                            />

                            {/* <Box
                                sx={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: { xs: '100%', sm: '105%' },
                                    width: { xs: '11rem', sm: '24rem' },
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/assets/images/vip/angle-none-7b783330.webp"
                                    sx={{ width: '100%', height: '100%' }}
                                />
                            </Box> */}
                        </VipBadge>
                    </Box>

                    <Box sx={{ position: 'absolute', right: 16, top: 16 }}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={modal.onTrue}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid #e4eaf019',
                                px: 1,
                                py: 1.5,
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                color: 'primary.main',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                }
                            }}
                        >
                            {t('vip.viewLevelUpDetail')}
                        </Button>
                    </Box>
                </VipContent>
            </VipCard>
            <Dialog open={modal.value} maxWidth="xs" fullScreen={false} fullWidth onClose={modal.onFalse}>
                <DialogTitle sx={{ m: 0, p: 2, bgcolor: 'background.card' }}>VIP Level System</DialogTitle>
                <IconButton
                    onClick={modal.onFalse}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                    size="large"
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ p: 2 }}>
                    <Stack spacing={1}>
                        {Object.keys(renderData).map((key, i) => (
                            <Stack key={key} sx={{ borderRadius: 1, bgcolor: 'background.card' }}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ pl: 1, py: 0 }}
                                >
                                    <Typography>{key}</Typography>
                                    <IconButton onClick={() => setIndex(i === index ? -1 : i)}>
                                        {i === index ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                                    </IconButton>
                                </Stack>
                                <Collapse in={i === index}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{ p: 1 }}
                                    >
                                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Level</Typography>
                                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                                            Required XP
                                        </Typography>
                                    </Stack>
                                    {renderData[key].map((item, j) => (
                                        <Stack
                                            key={j}
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            sx={{
                                                p: 1,
                                                borderTop: 1,
                                                borderColor: 'divider',
                                                borderStyle: 'dashed none none none'
                                            }}
                                        >
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Box component="img" src={ASSETS(item.icon)} sx={{ width: 20 }} />
                                                <Typography variant="body2">{item.levelName}</Typography>
                                            </Stack>
                                            <Typography variant="body2">{item.xp}</Typography>
                                        </Stack>
                                    ))}
                                </Collapse>
                            </Stack>
                        ))}
                    </Stack>
                </DialogContent>
            </Dialog>
        </StyledContainer>
    );
};

export default VipStatus;
