// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
// components
import { useSettingsContext } from 'components/settings';
import { IVip } from 'types/site';

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 0,
    marginLeft: '-16px',
    marginRight: '-16px',
    overflow: 'hidden',
    padding: '16px',
    backgroundImage: 'linear-gradient(rgba(255, 130, 15, 0.5) 30%, transparent 100%)',
    backgroundColor: theme.palette.background.layer2,
    borderRadius: theme.shape.borderRadius * 3,
    [theme.breakpoints.up('sm')]: {
        margin: 0,
        padding: '44px 48px'
    }
}));

const HeroImage = styled('img')(({ theme }) => ({
    position: 'absolute',
    bottom: '-32px',
    zIndex: -10,
    [theme.breakpoints.up('sm')]: {
        top: '-96px',
        right: 0,
        width: '33rem',
        height: '33rem'
    }
}));

const VipBanner = () => {
    const { onToggleModal } = useSettingsContext();

    return (
        <StyledBox>
            <HeroImage src="/assets/vip-benefit-hero-0ac174b8.webp" alt="VIP Benefits" />
            <Box sx={{ position: 'relative', zIndex: 20, pt: { xs: 2, sm: 0 } }}>
                <Typography
                    sx={{
                        display: { sm: 'flex' },
                        gap: { sm: 1 },
                        fontSize: { xs: '1.5rem', sm: '2.25rem' },
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        lineHeight: 1.2
                    }}
                >
                    <Box component="span">exclusive</Box>
                    <Box component="span">vip benefits</Box>
                </Typography>
                <Typography
                    sx={{
                        mt: 1.5,
                        maxWidth: { sm: '571px' },
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'text.secondary'
                    }}
                >
                    Join our VIP Club now and get ready to be showered with gifts, giveaways, and amazing features.
                    Experience the thrill of higher cash back and exclusive rewards that are sure to leave you amazed.
                </Typography>
            </Box>
            <Box sx={{ mt: 3, display: 'flex', width: '100%', alignItems: 'center', gap: 1 }}>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        maxWidth: { sm: '256px' },
                        fontSize: '1rem',
                        fontWeight: 800,
                        textTransform: 'capitalize',
                        backgroundImage: 'linear-gradient(270deg, #FBD765 0%, #EF9E3F 100%)'
                    }}
                    onClick={() => onToggleModal('SIGNUP')}
                >
                    Sign up
                </Button>
            </Box>
        </StyledBox>
    );
};

export default VipBanner;
