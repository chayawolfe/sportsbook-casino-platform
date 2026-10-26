import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import HttpsIcon from '@mui/icons-material/Https';
import { Box, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { updatePassword } from 'api';
import ColorButton from 'components/ColorButton';
import FormProvider, { RHFTextField } from 'components/hook-form';
import { useSnackbar } from 'components/snackbar';
import { useTranslate } from 'locales';

const StyledEmailIcon = styled(HttpsIcon)(({ theme }) => ({
    width: 32,
    height: 32,
    color: theme.palette.text.secondary
}));

const validationSchema = Yup.object().shape({
    old_password: Yup.string().required('Old password is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Confirm Password does not match')
        .required('Confirm Password is required')
});

type FormValues = {
    old_password: string;
    password: string;
    confirmPassword: string;
};

const SetPassword = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    const { t } = useTranslate();
    const { enqueueSnackbar } = useSnackbar();
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const methods = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            old_password: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const payload = {
                oldPassword: data.old_password,
                newPassword: data.password
            };

            await updatePassword(payload);
            enqueueSnackbar('Password updated successfully!', { variant: 'success' });
            setOpen(null);
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
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
                        {t('set_password')}
                    </Typography>

                    <Stack direction="column" width="100%" sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                            {t('current_password')}
                        </Typography>
                        <RHFTextField
                            size="small"
                            type={showOldPassword ? 'text' : 'password'}
                            name="old_password"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowOldPassword(!showOldPassword)}
                                            edge="end"
                                            sx={{ mr: '0px', color: '#637381' }}
                                        >
                                            {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Stack>

                    <Stack direction="column" width="100%" sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                            {t('password')}
                        </Typography>
                        <RHFTextField
                            size="small"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ mr: '0px', color: '#637381' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Stack>

                    <Stack direction="column" width="100%">
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                            {t('confirm_password')}
                        </Typography>
                        <RHFTextField
                            size="small"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                            sx={{ mr: '0px', color: '#637381' }}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Stack>

                    <ColorButton type="submit" sx={{ width: '100%', mt: 1.5 }}>
                        {t('verify')}
                    </ColorButton>
                </Box>
            </FormProvider>
        </Box>
    );
};

export default SetPassword;
