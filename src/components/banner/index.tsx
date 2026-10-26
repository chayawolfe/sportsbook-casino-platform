import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { Box, Stack, Typography, useTheme, useMediaQuery, styled } from '@mui/material';
// hooks
import { useAuth } from 'hooks/use-auth-context';
// components
import Image from 'components/image';
import ColorButton from 'components/ColorButton';
import { useTranslate } from 'locales';
// store
import { useSelector } from 'store/store';
// utils
import { ASSETS } from 'utils/axios';

const BannerContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius * 1.5,
    background:
        'radial-gradient(68.72% 68.75% at 50.13% 100%, rgba(34, 233, 167, 0.25) 0%, rgba(155, 232, 73, 0) 100%);',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat-x',
    aspectRatio: '1.7',
    maxHeight: '200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
    // [theme.breakpoints.up('sm')]: {
    //     aspectRatio: '4.6',
    //     background:
    //         theme.palette.mode === 'dark'
    //             ? 'linear-gradient(90deg, rgb(8, 172, 91), transparent 40%), url(/assets/bg-BlZBL8HD.svg)'
    //             : 'linear-gradient(90deg, rgb(8, 172, 91), transparent 40%), url(/assets/bg_w-DdW8hRgr.svg)'
    // }
}));

const BannerImage = styled('img')({
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%'
});

const ContentContainer = styled(Stack, {
    shouldForwardProp: (prop) => prop !== 'scale'
})<{ scale?: number }>(({ theme, scale = 1 }) => ({
    position: 'absolute',
    top: 0,
    left: theme.spacing(1.5),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
        left: '19%',
        top: '4%',
        height: 'auto',
        alignItems: 'center',
        padding: 0,
        textAlign: 'center'
    }
}));

const PromoBox = styled(Box)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 1.5,
    marginTop: theme.spacing(1.5),
    padding: 0,
    [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(2),
        backgroundColor: 'rgba(176, 255, 216, 0.2)',
        backdropFilter: 'blur(4px)',
        padding: theme.spacing(1.5, 15)
    }
}));

const GradientText = styled(Typography)({
    background: 'linear-gradient(to right, #9FE871, #24EE89)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginLeft: 4
});

const StyledButton = styled(ColorButton)(({ theme }) => ({
    marginTop: 'auto',
    width: 112,
    height: 40,
    [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(2.5),
        width: 240
    }
}));

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0
            }
        }
    ]
};

const Banner = () => {
    const theme = useTheme();
    const { t } = useTranslate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { isLogined } = useAuth();
    const { banners } = useSelector((state) => state.setting);

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isLogined ? (
                <Stack
                    className="slider-container"
                    sx={{
                        width: '100%',
                        maxWidth: 1200,
                        margin: '0 auto',
                        p: 2,
                        '& .slick-dots li button:before': {
                            color: 'background.layer3',
                            fontSize: '12px',
                            opacity: 1
                        },
                        '& .slick-dots li.slick-active button:before': {
                            color: 'primary.main',
                            opacity: 1
                        },
                        '& .slick-slide > div': {
                            px: 1
                        },
                        '@media (max-width:600px)': {
                            p: 1,
                            '& .slick-slide > div': {
                                px: 0.5
                            }
                        },
                        mb: 2
                    }}
                >
                    <Slider {...settings}>
                        {banners.map((img, index) => (
                            <Image
                                key={index}
                                src={ASSETS(img.image)}
                                sx={{
                                    borderRadius: 1
                                }}
                            />
                        ))}
                    </Slider>
                </Stack>
            ) : (
                <BannerContainer sx={{ maxHeight: isMobile ? 180 : 400, mb: 2 }}>
                    <BannerImage
                        src={
                            isMobile
                                ? '/assets/images/home/players-banner-mobile.png'
                                : '/assets/images/home/players-banner.png'
                        }
                        alt="Banner"
                    />

                    {/* <ContentContainer scale={width / 1440 > 1 ? 1 : width / 1440} > */}
                    <Stack alignItems="start" sx={{ ml: isMobile ? 0 : 5, zIndex: 5 }}>
                        <Typography
                            sx={{ textTransform: 'uppercase' }}
                            variant={isMobile ? 'body2' : 'h3'}
                            fontWeight={isMobile ? 600 : 800}
                            color="text.primary"
                        >
                            {t('signUpGetUpTo')}
                        </Typography>
                        <GradientText variant={isMobile ? 'h4' : 'h3'} fontWeight={800}>
                            $20,000.00
                        </GradientText>
                        <Typography
                            sx={{ textTransform: 'uppercase' }}
                            variant={isMobile ? 'body2' : 'h3'}
                            fontWeight={600}
                        >
                            {t('inCasinoOrSports')}
                        </Typography>
                        <StyledButton
                            sx={{
                                borderRadius: 2,
                                width: { xs: '103px', md: '156px' },
                                height: { xs: '32px', md: '56px' },
                                color: '#142426',
                                fontWeight: '600',
                                fontSize: { xs: '14px', md: '18px' },
                                bgcolor: '#22E9A7',
                                '&:hover': {
                                    bgcolor: '#5ef1c0',
                                    boxShadow: '0 4px 12px rgba(34, 233, 167, 0.6)'
                                }
                            }}
                        >
                            {t('joinNow')}
                        </StyledButton>
                    </Stack>
                    {/* </ContentContainer> */}
                </BannerContainer>
            )}
        </>
    );
};

export default Banner;
