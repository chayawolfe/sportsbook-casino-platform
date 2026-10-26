import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useResponsive } from 'hooks/use-responsive';

import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { useTranslate } from 'locales';
import { useSelector } from 'store/store';
import GameCard from 'components/game-card';
import { ASSETS } from 'utils/axios';

const RecommendSlider = () => {
    const { t } = useTranslate();
    const navigate = useNavigate();
    const { recommendGames } = useSelector((state) => state.setting);
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const isMobile = useResponsive('down', 'sm');
    const isTablet = useResponsive('down', 'md');

    const responsiveViewCount = isMobile ? 3 : isTablet ? Math.round((8 / 3) * 2) : 8;

    const totalSlides = recommendGames.length;
    const prevButtonClass = `swiper-prev-button-recommend`;
    const nextButtonClass = `swiper-next-button-recommend`;

    const handleNext = () => {
        if (!swiperRef.current) return;

        const newIndex = Math.min(activeIndex + responsiveViewCount, totalSlides - 1);
        setActiveIndex(newIndex);
        swiperRef.current.slideTo(newIndex);
    };

    const handlePrev = () => {
        if (!swiperRef.current) return;

        const newIndex = Math.max(activeIndex - responsiveViewCount, 0);
        setActiveIndex(newIndex);
        swiperRef.current.slideTo(newIndex);
    };

    const buttonStyles = {
        p: 1,
        minWidth: 0,
        // bgcolor: 'background.button',
        '&:hover': { bgcolor: 'action.button', boxShadow: 'none' }
    } as const;

    if (!recommendGames.length) {
        return (
            <Stack direction="column" gap={1} mt={3}>
                <Typography sx={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase' }}>
                    {t(`recommended_games`)}
                </Typography>
                <Typography color="text.secondary">{t('no_items_to_display')}</Typography>
            </Stack>
        );
    }

    return (
        <Stack direction="column" gap={1} mt={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase' }}>
                    {t(`recommended_games`)}
                </Typography>

                <Stack direction="row" alignItems="center" gap={0.5}>
                    <Button
                        variant="text"
                        color="secondary"
                        size="medium"
                        sx={buttonStyles}
                        onClick={handlePrev}
                        disabled={activeIndex === 0}
                    >
                        <ArrowBackIosNewIcon sx={{ fontSize: 14, color: 'text.primary' }} />
                    </Button>
                    <Button
                        variant="text"
                        color="secondary"
                        size="medium"
                        sx={buttonStyles}
                        onClick={handleNext}
                        disabled={activeIndex >= totalSlides - responsiveViewCount}
                    >
                        <ArrowForwardIosIcon sx={{ fontSize: 14, color: 'text.primary' }} />
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="medium"
                        sx={{
                            ...buttonStyles,
                            bgcolor: '#FFFFFF1A',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 0.5
                        }}
                        onClick={() => navigate(`/gamelist/recommended-games`)}
                    >
                        <Typography sx={{ fontSize: 14, color: 'text.primary', lineHeight: 1, fontWeight: 600 }}>
                            {t('all')}
                        </Typography>
                        <ArrowForwardIosIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    </Button>
                </Stack>
            </Stack>

            <Swiper
                ref={swiperRef as any}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setActiveIndex(swiper.activeIndex);
                }}
                navigation={{
                    prevEl: `.${prevButtonClass}`,
                    nextEl: `.${nextButtonClass}`
                }}
                slidesPerView={responsiveViewCount}
                spaceBetween={10}
                freeMode={true}
                loop={totalSlides > responsiveViewCount}
                modules={[FreeMode, Navigation, Pagination]}
                style={{ width: '100%', position: 'relative' }}
            >
                <Grid container>
                    {recommendGames.map((item, itemIndex) => (
                        <SwiperSlide key={`slide-${itemIndex}`}>
                            <Box key={itemIndex} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                <GameCard
                                    key={itemIndex}
                                    name={item.gameName ? item.gameName : item.game_name}
                                    image={item.ownImg ? ASSETS(item.ownImg) : item.image_url || ASSETS(item.gameCode)}
                                    href={item.game_code ? `/game/${item.game_code}` : `/ag-game/${item.gameCode}`}
                                />
                            </Box>
                        </SwiperSlide>
                    ))}
                </Grid>
            </Swiper>
        </Stack>
    );
};

export default RecommendSlider;
