import { Box, Button, Typography, styled, useTheme } from '@mui/material';
import { formatNumber } from 'utils/formatNumber';

interface UpcomingLotteryDrawProps {
    index: number;
    id: string;
    logoOffset: number;
    name: string;
    prize: string;
    hours: string;
    minutes: string;
    seconds: string;
    onBetClick: () => void;
}

const LotterySectionItem = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: theme.shape.borderRadius * 1.5,
    padding: theme.spacing(1.5),
    color: theme.palette.text.primary,
    overflow: 'hidden',
    cursor: 'pointer'
}));

const LogoBox = styled(Box)(({ theme }) => ({
    width: '80px',
    height: '80px',
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transform: 'translate(25%, -25%)',
    backgroundColor: theme.palette.background.paper
}));

const TimeUnit = styled(Box)(({ theme }) => ({
    width: 'calc(33.3% - 8px)',
    height: '24px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.875rem',
    fontWeight: 600,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
}));

const Divider = styled(Box)({
    height: '1px',
    backgroundColor: 'rgba(153, 164, 176, 0.2)',
    margin: '8px 0'
});

const UpcomingLotteryDraw = ({
    index,
    id,
    logoOffset,
    name,
    prize,
    hours,
    minutes,
    seconds,
    onBetClick
}: UpcomingLotteryDrawProps) => {
    const theme = useTheme();

    const customBackground =
        theme.palette.mode === 'dark'
            ? [
                  'linear-gradient(rgba(244, 62, 139, 0) 0%, rgba(244, 62, 139, 0.6) 100%), rgb(50, 55, 56)',
                  'linear-gradient(rgba(244, 182, 62, 0) 0%, rgba(244, 182, 62, 0.6) 100%), rgb(50, 55, 56)',
                  'linear-gradient(rgba(230, 246, 44, 0) 0%, rgba(230, 246, 44, 0.6) 100%), rgb(50, 55, 56)',
                  'linear-gradient(rgba(44, 246, 89, 0) 0%, rgba(44, 246, 89, 0.6) 100%), rgb(50, 55, 56)',
                  'linear-gradient(rgba(44, 125, 246, 0) 0%, rgba(44, 125, 246, 0.6) 100%), rgb(50, 55, 56)'
              ]
            : [
                  'linear-gradient(rgba(244, 62, 139, 0) 0%, rgba(244, 62, 139, 0.6) 100%), rgb(255, 255, 255)',
                  'linear-gradient(rgba(244, 182, 62, 0) 0%, rgba(244, 182, 62, 0.6) 100%), rgb(255, 255, 255)',
                  'linear-gradient(rgba(230, 246, 44, 0) 0%, rgba(230, 246, 44, 0.6) 100%), rgb(255, 255, 255)',
                  'linear-gradient(rgba(44, 246, 89, 0) 0%, rgba(44, 246, 89, 0.6) 100%), rgb(255, 255, 255)',
                  'linear-gradient(rgba(44, 125, 246, 0) 0%, rgba(44, 125, 246, 0.6) 100%), rgb(255, 255, 255)'
              ];

    return (
        <LotterySectionItem id={id} sx={{ background: customBackground[index % 5], color: 'text.primary' }}>
            <LogoBox>
                <Box
                    sx={{
                        position: 'relative',
                        width: '64px',
                        height: '64px',
                        minHeight: '64px',
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        component="img"
                        src="/assets/countries.png"
                        alt=""
                        sx={{
                            width: '64px',
                            position: 'absolute',
                            top: `-${logoOffset}px`
                        }}
                    />
                </Box>
            </LogoBox>

            <Typography
                sx={{
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 600,
                    width: '66.666%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                }}
            >
                {name}
            </Typography>

            <Typography
                variant="h6"
                sx={{
                    fontStyle: 'italic',
                    fontWeight: 800,
                    mt: 1
                }}
            >
                ${formatNumber(prize)}
            </Typography>

            <Divider />

            <Typography
                variant="caption"
                sx={{
                    color: 'text.secondary',
                    fontWeight: 600
                }}
            >
                Next Draw Starts in
            </Typography>

            <Box
                sx={{
                    mt: 2,
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <TimeUnit>{hours}h</TimeUnit>
                <Box sx={{ width: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>:</Box>
                <TimeUnit>{minutes}m</TimeUnit>
                <Box sx={{ width: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>:</Box>
                <TimeUnit>{seconds}s</TimeUnit>
            </Box>

            <Button
                variant="contained"
                fullWidth
                sx={{
                    height: '36px',
                    borderRadius: 1,
                    color: '#000000',
                    backgroundImage: 'linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))',
                    boxShadow: 'rgba(35, 238, 136, 0.3) 0px 0px 12px, rgb(29, 202, 106) 0px -2px inset'
                }}
                onClick={onBetClick}
            >
                Bet Now
            </Button>
        </LotterySectionItem>
    );
};

export default UpcomingLotteryDraw;
