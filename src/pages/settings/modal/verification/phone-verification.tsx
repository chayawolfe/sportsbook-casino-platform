import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ColorButton from 'components/ColorButton';
import FormProvider, { RHFTextField } from 'components/hook-form';
import { useTranslate } from 'locales';
import React from 'react';
import { useForm } from 'react-hook-form';

const StyledPhoneIcon = styled(PhoneIcon)(({ theme }) => ({
    width: 32,
    height: 32,
    color: theme.palette.text.secondary
}));

const PhoneVerification: React.FC = () => {
    const { t } = useTranslate();
    const methods = useForm({
        defaultValues: {
            phone: ''
        }
    });

    const onSubmit = async (data: { phone: string }) => {
        try {
            console.log(data);
        } catch (error) {
            console.error('Phone verification failed:', error);
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
                    <StyledPhoneIcon />

                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.125rem', textAlign: 'center' }}>
                        {t('phone_verification')}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ px: 2, fontWeight: 600, textAlign: 'center', color: 'text.secondary' }}
                    >
                        {/* {t('enter_your_new_phone_number_below_to_receive_a_verification_code')} */}
                        Enter your new phone number below to receive a verification code
                    </Typography>

                    <RHFTextField size="small" name="email" required sx={{ mt: 1 }} />

                    <ColorButton type="submit" sx={{ width: '100%', mt: 1.5 }}>
                        {t('verify')}
                    </ColorButton>
                </Box>
            </FormProvider>
        </Box>
    );
};

export default PhoneVerification;
