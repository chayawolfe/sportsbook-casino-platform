import * as Yup from 'yup';
import { useState } from 'react';
import { useTranslate } from 'locales';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
// components
import ColorButton from 'components/ColorButton';
import FormProvider from 'components/hook-form/form-provider';
import RHFTextField from 'components/hook-form/rhf-text-field';
import { useSettingsContext } from 'components/settings';
// hooks
import { useAuth } from 'hooks/use-auth-context';
//
import { CloseButton } from '../component';

type FormValuesProps = {
    username: string;
    password: string;
    afterSubmit?: string;
};

const SignInModal = () => {
    const { login } = useAuth();
    const { t } = useTranslate();
    const { enqueueSnackbar } = useSnackbar();
    const { onToggleModal } = useSettingsContext();

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        username: Yup.string().required(t('auth.usernameRequired')),
        password: Yup.string().required(t('auth.passwordRequired'))
    });

    const defaultValues = {
        username: '',
        password: ''
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(LoginSchema),
        defaultValues
    });

    const {
        handleSubmit,
        formState: { isSubmitting }
    } = methods;

    const onSubmit = async (data: { username: string; password: string }) => {
        try {
            await login(data.username, data.password, false);
            onToggleModal('');
        } catch (error: any) {
            enqueueSnackbar(typeof error === 'string' ? error : error.message, { variant: 'error' });
        }
    };

    return (
        <Stack sx={{ position: { sm: 'relative' }, height: '100%' }}>
            <Stack direction="column" p={{ xs: '0px 14px', sm: '20px 24px' }} gap={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontSize: 18, fontWeight: 800, lineHeight: '1.75rem' }}>
                        {t('auth.signIn')}
                    </Typography>
                    <CloseButton
                        onClick={() => onToggleModal('')}
                        sx={{
                            position: { xs: 'absolute', sm: 'relative' },
                            right: { xs: 15, sm: 'auto' },
                            top: { xs: 15, sm: 'auto' }
                        }}
                    >
                        <CloseIcon sx={{ fontSize: 16 }} />
                    </CloseButton>
                </Stack>

                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <RHFTextField size="small" name="username" placeholder={t('auth.username')} type="text" />
                        <RHFTextField
                            size="small"
                            name="password"
                            placeholder={t('auth.password')}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ mr: '0px', color: '#637381' }}
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Stack alignItems="flex-end">
                            <Typography
                                component="span"
                                sx={{
                                    ml: 'auto',
                                    color: 'text.secondary',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    textAlign: 'right',
                                    cursor: 'pointer'
                                }}
                                onClick={() => onToggleModal('PASSWORD')}
                            >
                                {t('auth.forgotPassword')}
                            </Typography>
                        </Stack>
                        <ColorButton
                            loading={isSubmitting}
                            type="submit"
                            sx={{ width: '100%', height: '2.5rem', fontSize: 14, fontWeight: 600 }}
                        >
                            {t('auth.signIn')}
                        </ColorButton>
                        <Typography sx={{ color: 'text.primary', fontSize: 14, fontWeight: 600 }}>
                            {t('auth.newToBethrob')}{' '}
                            <Typography
                                component="span"
                                variant="inherit"
                                sx={{ color: 'primary.main', cursor: 'pointer' }}
                                onClick={() => onToggleModal('SIGNUP')}
                            >
                                {t('auth.createAccount')}
                            </Typography>
                        </Typography>
                    </Stack>
                </FormProvider>
            </Stack>

            {/* <Stack
                direction="column"
                gap={1.5}
                width="100%"
                position={{ xs: 'relative', sm: 'absolute' }}
                mt={{ xs: 2, sm: 0 }}
                bottom={{ xs: 10, sm: 20 }}
                left={0}
                px={3}
            >
                <Stack direction="row" alignItems="center" width="100%">
                    <Divider sx={{ flex: 1, borderColor: 'divider' }} />
                    <Typography sx={{ color: 'text.secondary', mx: 1.5, fontSize: 14, fontWeight: 600 }}>
                        {t('logInDirectlyWith')}
                    </Typography>
                    <Divider sx={{ flex: 1, borderColor: 'divider' }} />
                </Stack>

                <Button variant="outlined" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <Box
                        component="img"
                        src="/assets/icons/passkey.svg"
                        alt="passkey"
                        sx={{ width: '18px', height: '18px' }}
                    />
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Sign In with passkey</Typography>
                </Button>

                <Stack direction="row" justifyContent="space-between">
                    {['Google', 'Twitter', 'Telegram', 'Discord', 'WhatsApp'].map((social) => (
                        <SocialLoginButton key={social}>
                        </SocialLoginButton>
                    ))}
                </Stack>
            </Stack> */}
        </Stack>
    );
};

export default SignInModal;
