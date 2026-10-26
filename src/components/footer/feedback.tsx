import React from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { useTranslate } from 'locales';

const Feedback: React.FC = () => {
    const { t } = useTranslate();
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, mb: 6, px: 2 }}>
            <Box sx={{ flex: '1 1 34rem', display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <Typography sx={{ fontSize: '1.125rem', lineHeight: '1.75rem' }}>
                        {t('crypto_online_casino')}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                        Casinos online have not always been around, but we can safely say that online casinos have been
                        used a lot since they came on the market. And it's not in short demand nor options, and now in
                        2023, we have 1000s and 1000s to pick from – it's just a matter of what you like and what
                        payment options you would like to see at the casino.
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                        Players are always looking for something new, which will help make the gaming experience so much
                        better and more accessible. Allowing the player to focus on the absolute fun of a casino, that's
                        right, the games themselves.
                    </Typography>
                </Box>

                <Box sx={{ minWidth: 24 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="medium"
                        sx={{
                            bgcolor: 'background.button',
                            color: 'text.primary',
                            '&:hover': { bgcolor: 'action.button', boxShadow: 'none' }
                        }}
                    >
                        {t('show_more')}
                    </Button>
                </Box>
            </Box>

            <Box sx={{ flex: '0 1 500px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ fontSize: '1.125rem', lineHeight: '1.75rem' }}>
                    {t('help_us_improve_your_experience')}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                    Get rewarded for your valuable feedback!
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                        Email us:
                        <Link
                            href="mailto:feedback@betthrob.com"
                            sx={{ ml: 1, color: 'brand.main', textDecoration: 'underline' }}
                        >
                            feedback@betthrob.com
                        </Link>
                    </Typography>
                </Box>
                <Box>
                    <Typography color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                        If you find any vulnerabilities or leaks, please contact us at security@betthrob.com
                        (security-related issues only; non-related issues will be omitted).
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                        Security email:
                        <Link
                            href="mailto:security@betthrob.com"
                            sx={{ ml: 1, color: 'brand.main', textDecoration: 'underline' }}
                        >
                            security@betthrob.com
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Feedback;
