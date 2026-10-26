import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    Box,
    Button,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { _wagerContestActive, _wagerContestCompleted } from '_mock';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatNumber } from 'utils/formatNumber';
import { formatPlace } from 'utils/formatPlace';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    fontSize: 12,
    backgroundColor: theme.palette.background.layer2,
    '& .MuiTableCell-root': {
        padding: '12px 16px',
        border: '1px solid transparent',
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    '& .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.layer3
    }
}));

const buttonStyles = {
    p: 1,
    minWidth: 0,
    bgcolor: 'background.button',
    color: 'text.primary',
    '&:hover': { bgcolor: 'action.button', boxShadow: 'none' }
} as const;

const StyledLink = styled(Link)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
        textDecoration: 'underline'
    }
}));

const CustomTable = ({ type, data }: { type: string; data: any[] }) => {
    return (
        <Box
            sx={{
                borderRadius: 2,
                height: '580px',
                mt: 1.5,
                color: 'text.secondary',
                overflow: 'hidden'
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <StyledTableContainer>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ width: '100%', py: 1.5, pr: 1.5, borderBottom: '1px solid #e4eaf019' }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                height: '28px',
                                width: '80px',
                                alignItems: 'center',
                                color: 'primary.main',
                                paddingLeft: '2px',
                                fontSize: '12px',
                                lineHeight: '28px'
                            }}
                        >
                            <Box
                                component="img"
                                src="/assets/icons/bookmark.svg"
                                alt="bookmark"
                                sx={{
                                    position: 'absolute',
                                    left: -2,
                                    top: 0,
                                    width: '80px',
                                    height: '28px'
                                }}
                            />
                            {type === 'active' && (
                                <>
                                    <Box
                                        component="img"
                                        src="/assets/icons/loading.svg"
                                        alt="loading"
                                        sx={{
                                            zIndex: 10,
                                            width: '16px',
                                            height: '16px',
                                            animation: 'spin 5s linear infinite',
                                            '@keyframes spin': {
                                                '0%': {
                                                    transform: 'rotate(0deg)'
                                                },
                                                '100%': {
                                                    transform: 'rotate(360deg)'
                                                }
                                            }
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            zIndex: 10,
                                            fontWeight: 800,
                                            marginLeft: '2px',
                                            fontSize: 12,
                                            color: '#000',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Active
                                    </Typography>
                                </>
                            )}
                            {type === 'completed' && (
                                <Typography
                                    sx={{
                                        zIndex: 10,
                                        fontWeight: 800,
                                        fontSize: 11,
                                        color: '#000',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    Completed
                                </Typography>
                            )}
                        </Box>
                        <Typography
                            variant="inherit"
                            sx={{ pl: 1.5, fontSize: 14, lineHeight: 1, fontWeight: 600, color: 'text.primary' }}
                        >
                            4/13/2025 ~ 4/14/2025
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="medium"
                            sx={{
                                ...buttonStyles,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 0.5
                            }}
                        >
                            <Typography sx={{ fontSize: 14, lineHeight: 1, fontWeight: 600 }}>History</Typography>
                            <ArrowForwardIosIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        </Button>
                    </Stack>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: { xs: '30%', sm: 'auto' } }}>#</TableCell>
                                <TableCell>Player</TableCell>
                                <TableCell>Wager</TableCell>
                                <TableCell>Prize</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ width: { xs: '30%', sm: 'auto' } }}>
                                        {formatPlace(index + 1)}
                                    </TableCell>
                                    <TableCell>
                                        {item.player.isHidden ? (
                                            <Typography variant="inherit" color="text.secondary">
                                                Hidden
                                            </Typography>
                                        ) : (
                                            <StyledLink to={`/user/profile/${item.player.id}`}>
                                                {item.player.name}
                                            </StyledLink>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="inherit" color="primary">
                                            {formatNumber(item.wager)} {item.currency}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'right' }}>
                                        <Typography variant="inherit" color="primary">
                                            {formatNumber(item.prize)}{' '}
                                            <Typography variant="inherit" component="span" color="text.primary">
                                                ({item.profit}%)
                                            </Typography>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            </Box>
        </Box>
    );
};

const ContestTable = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <Swiper
            ref={swiperRef as any}
            onSwiper={(swiper) => {
                swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={10}
            freeMode={true}
            loop={false}
            modules={[FreeMode, Navigation, Pagination]}
            style={{ width: '100%', position: 'relative' }}
        >
            <Grid container>
                <SwiperSlide>
                    <CustomTable type="active" data={_wagerContestActive} />
                </SwiperSlide>

                <SwiperSlide>
                    <CustomTable type="completed" data={_wagerContestCompleted} />
                </SwiperSlide>
            </Grid>
        </Swiper>
    );
};

export default ContestTable;
