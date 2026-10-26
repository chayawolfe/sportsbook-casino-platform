import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Button, Grid, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import { useResponsive } from 'hooks/use-responsive';

import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { useTranslate } from 'locales';

interface CustomSwiperProps {
    index: string;
    title: string;
    category: string;
    loading: boolean;
    data: React.ReactNode[];
    viewCount: number;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({ index, title, data, viewCount, category, loading }) => {
    const { t } = useTranslate();
    const navigate = useNavigate();
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const theme = useTheme();

    const isMobile = useResponsive('down', 'sm');
    const isTablet = useResponsive('down', 'md');

    const responsiveViewCount = isMobile ? 3 : isTablet ? Math.round((viewCount / 3) * 2) : viewCount;

    const totalSlides = data.length;
    const prevButtonClass = `swiper-prev-button-${index}`;
    const nextButtonClass = `swiper-next-button-${index}`;

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

    if (!data.length) {
        return (
            <Stack direction="column" gap={1} mt={3}>
                <Typography sx={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase' }}>
                    {t(`${title}`)}
                </Typography>
                <Typography color="text.secondary">{t('no_items_to_display')}</Typography>
            </Stack>
        );
    }

    return (
        <Stack direction="column" gap={1} mt={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase' }}>
                    {t(`${title}`)}
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
                        onClick={() => navigate(`/gamelist/${category}?type=${title}`)}
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
                    {loading
                        ? new Array(viewCount).fill(null).map((_, index) => (
                              <SwiperSlide key={`skeleton-${index}`}>
                                  <Skeleton width="100%" height="162px" sx={{ bgcolor: 'background.button1' }} />
                              </SwiperSlide>
                          ))
                        : data.map((item, itemIndex) => <SwiperSlide key={`slide-${itemIndex}`}>{item}</SwiperSlide>)}
                </Grid>
            </Swiper>
        </Stack>
    );
};

export default CustomSwiper;
