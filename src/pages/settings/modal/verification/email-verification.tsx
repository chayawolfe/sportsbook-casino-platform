import { useEffect, useState } from 'react';
import { useTranslate } from 'locales';
// @mui
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import { Box, TextField, Typography } from '@mui/material';
// components
import ColorButton from 'components/ColorButton';
import { useSnackbar } from 'components/snackbar';
// hooks
import { useAuth } from 'hooks/use-auth-context';
// api
import { verifyApi } from 'api/verify.api';
import { useBoolean } from 'hooks/use-boolean';
// store
import { dispatch } from 'store/store';
import { updateUserAction } from 'store/slices/auth';

const StyledEmailIcon = styled(EmailIcon)(({ theme }) => ({
    width: 32,
    height: 32,
    color: theme.palette.text.secondary
}));

const EmailVerification = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    const { t } = useTranslate();
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const confirming = useBoolean();
    const loading = useBoolean();
    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState(user?.email || '');
    const [code, setCode] = useState('');
    const [cooldown, setCooldown] = useState(0); // seconds

    // Countdown effect
    useEffect(() => {
        if (cooldown === 0) return;

        const interval = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [cooldown]);

    const sendCode = async () => {
        try {
            loading.onTrue();
            const reapones = await verifyApi.sendEmailVerify({ email });
            if (reapones.status) {
                setOtpSent(true);
                setCooldown(60);
            } else {
                enqueueSnackbar('Failed to send code. Please try again', { variant: 'error' });
            }
        } catch (error: any) {
            enqueueSnackbar(
                typeof error === 'string' ? error : error.message || 'Something went wrong! Please try again',
                { variant: 'error' }
            );
        } finally {
            loading.onFalse();
        }
    };

    const resendCode = async () => {
        try {
            if (cooldown !== 0) return;
            loading.onTrue();
            const reapones = await verifyApi.resendEmailVerify({ email });
            if (reapones.status) {
                setOtpSent(true);
            } else {
                enqueueSnackbar('Failed to send code. Please try again', { variant: 'error' });
            }
        } catch (error: any) {
            enqueueSnackbar(
                typeof error === 'string' ? error : error.message || 'Something went wrong! Please try again',
                { variant: 'error' }
            );
        } finally {
            loading.onFalse();
        }
    };

    const verifyCode = async () => {
        try {
            confirming.onTrue();
            const reapones = await verifyApi.emailCodeVerify({ code });
            if (reapones.status) {
                dispatch(updateUserAction(reapones.userData));
                setOpen(null);
            } else {
                enqueueSnackbar('Failed verification. Please try again', { variant: 'error' });
            }
        } catch (error: any) {
            enqueueSnackbar(
                typeof error === 'string' ? error : error.message || 'Something went wrong! Please try again',
                { variant: 'error' }
            );
        } finally {
            confirming.onFalse();
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                    pt: 1
                }}
            >
                <StyledEmailIcon />

                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.125rem', textAlign: 'center' }}>
                    {t('email_verification')}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ px: 2, fontWeight: 600, textAlign: 'center', color: 'text.secondary' }}
                >
                    {(() => {
                        if (otpSent) {
                            return `Please enter the 6-digit verification code sent to ${email}`;
                        }
                        if (email) {
                            return `According to the security policy of BETTHROB.COM, the registered email cannot be changed.`;
                        }
                        return t('please_enter_and_verify_your_email_below');
                    })()}
                </Typography>

                {!otpSent && (
                    <>
                        <TextField
                            size="small"
                            value={email}
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ mt: 1 }}
                            InputProps={{
                                readOnly: user?.email
                            }}
                        />

                        <ColorButton loading={loading.value} onClick={sendCode} sx={{ width: '100%', mt: 1.5 }}>
                            {t('verify')}
                        </ColorButton>
                    </>
                )}
                {otpSent && (
                    <>
                        <TextField
                            size="small"
                            value={code}
                            fullWidth
                            placeholder="6-digit verification code"
                            onChange={(e) => setCode(e.target.value)}
                            required
                            sx={{ mt: 1 }}
                        />
                        <Typography component="span" sx={{ cursor: 'pointer' }} onClick={resendCode}>
                            {cooldown > 0 ? `Resend in ${cooldown}s` : loading.value ? 'Sending...' : 'Resend Code'}
                        </Typography>
                        <ColorButton
                            disabled={code.length < 6}
                            loading={confirming.value}
                            onClick={verifyCode}
                            sx={{ width: '100%', mt: 1.5 }}
                        >
                            {t('confirm')}
                        </ColorButton>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default EmailVerification;
