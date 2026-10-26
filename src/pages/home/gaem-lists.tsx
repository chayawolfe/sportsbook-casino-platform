import { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
// components
import Image from 'components/image';
// hooks
import { useResponsive } from 'hooks/use-responsive';
// locales
import { useTranslate } from 'locales';
// api
import { casinoApi } from 'api/casino.api';

export default function GameLists() {
    const { t } = useTranslate();
    const isMobile = useResponsive('down', 'sm');

    const [data, setData] = useState<any[]>([]);

    const loadData = async () => {
        try {
            const response = await casinoApi.getRecentBigWin();
            setData(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line
    }, []);

    if (data.length) {
        return (
            <Stack>
                <Stack flexDirection="row" alignItems="center">
                    <Box
                        sx={{
                            position: 'relative',
                            mx: 2,
                            width: 8,
                            height: 8
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                bgcolor: '#24ee89',
                                borderRadius: '50%',
                                width: 1,
                                height: 1
                            }}
                        />
                        <Box
                            className="animate-ping"
                            sx={{
                                position: 'absolute',
                                bgcolor: '#24ee89',
                                borderRadius: '50%',
                                width: 1,
                                height: 1
                            }}
                        />
                    </Box>
                    <Typography fontWeight={800} sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                        {t('recent_big_wins')}
                    </Typography>
                </Stack>
                <Stack
                    width={1}
                    bgcolor="background.layer1"
                    borderRadius={1.5}
                    p={2}
                    sx={{ height: 'auto', mb: { lg: 0, xs: 3 }, mt: 1 }}
                >
                    <Swiper
                        modules={[FreeMode, Autoplay]}
                        loop={true}
                        speed={1000}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        freeMode={true}
                        slidesPerView="auto"
                        spaceBetween={isMobile ? 10 : 20}
                        grabCursor={true}
                        pagination={{
                            clickable: true
                        }}
                        className="mySwiper"
                        style={{ width: '100%', height: '100%' }}
                    >
                        {data.map((item, index) => (
                            <SwiperSlide
                                key={index}
                                style={{
                                    width: isMobile ? 70 : 85
                                }}
                            >
                                <Stack sx={{ pr: 0 }} gap={2}>
                                    <Image
                                        src={item.game.image_url}
                                        sx={{
                                            borderRadius: 2,
                                            display: 'block',
                                            width: 1,
                                            height: { xs: '88px', md: '110px' }
                                        }}
                                        alt={`slide-${index}`}
                                    />
                                    <Stack>
                                        <Stack
                                            alignItems="center"
                                            flexDirection="row"
                                            sx={{
                                                background: 'linear-gradient(90deg, #21dc9f42 0%, transparent 100%)',
                                                position: 'relative',
                                                width: 0.7,
                                                ml: '10%',
                                                py: 0.3,
                                                boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src="./assets/b.svg"
                                                sx={{
                                                    position: 'absolute',
                                                    top: -2,
                                                    ml: '-15%',
                                                    width: { xs: '15px', md: '23px' },
                                                    height: { xs: '17px', md: '25px' }
                                                }}
                                            />
                                            <Typography
                                                noWrap
                                                sx={{
                                                    textTransform: 'uppercase',
                                                    fontSize: 11,
                                                    ml: 2
                                                }}
                                                color="text.primary"
                                            >
                                                {item.game.game_name}
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            color="#22E9A7"
                                            alignItems="end"
                                            flexDirection="row"
                                            gap={1}
                                            sx={{ fontSize: 12, fontWeight: 600 }}
                                        >
                                            <Typography sx={{ fontSize: 12 }} fontWeight={600}>
                                                {item.profitAmount}
                                            </Typography>{' '}
                                            {item.currency}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Stack>
            </Stack>
        );
    }

    return null;
}
