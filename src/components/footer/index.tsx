import { useTranslate } from 'locales';
// @mui
import { Box, Container, Stack, Typography, styled } from '@mui/material';

const SkewedButton = styled(Box)(({ theme }) => ({
    display: 'inline-block',
    fontSize: 16,
    position: 'relative',
    background: 'linear-gradient(to right, #9BE849, #22E9A7)',
    color: '#000',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: '4px 16px',
    fontFamily: 'sans-serif',
    cursor: 'pointer',
    '&::after': {
        content: `""`,
        position: 'absolute',
        top: 0,
        right: -32,
        width: 0,
        height: 0,
        borderBottom: '32px solid transparent',
        borderLeft: '32px solid #22E9A7' // same as rightmost gradient color
    }
}));

const Footer = () => {
    const { t } = useTranslate();
    return (
        <Box
            sx={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 3,
                bgcolor: 'background.footer',
                '& > *': {
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    '&:first-of-type': {
                        borderTop: 'none'
                    }
                }
            }}
        >
            <Container maxWidth={false} sx={{ maxWidth: '1248px !important' }}>
                <Box
                    sx={{
                        py: 5,
                        pb: { mb: 5, xs: 1 },
                        borderTop: '1px solid',
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <Box component="img" src="/logo.svg" />

                    <Stack direction={{ md: 'row', xs: 'column' }} sx={{ pt: { xs: 1, md: 5 } }}>
                        <Stack sx={{ flex: 2 }}>
                            <Box>
                                <SkewedButton>{t('footer.aboutBetthrob')}</SkewedButton>
                            </Box>
                            <Typography sx={{ fontSize: 12, mb: { md: 4, xs: 1.5 }, mt: { md: 3, xs: 1.5 } }}>
                                {t('footer.description')}
                            </Typography>
                        </Stack>
                        <Stack sx={{ flex: 1, mt: { md: 0, xs: 3 } }}>
                            <SkewedButton sx={{ mr: '32px' }}>{t('footer.termsPolicy')}</SkewedButton>
                        </Stack>
                    </Stack>
                </Box>
                <Typography sx={{ fontSize: 11, color: 'text.secondary', my: 3, mb: 8 }}>
                    {t('footer.copyright')}
                </Typography>
            </Container>
        </Box>
    );
};
export default Footer;
