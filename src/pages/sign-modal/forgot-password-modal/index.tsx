import React, { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button, Stack, TextField, Typography } from '@mui/material';
// components
import ColorButton from 'components/ColorButton';
import { useSettingsContext } from 'components/settings';

const CloseButton = styled(Button)(({ theme }) => ({
    minWidth: '32px',
    width: '32px',
    height: '32px',
    padding: 0,
    backgroundColor: theme.palette.background.layer1,
    '&:hover': {
        filter: 'brightness(1.05)'
    }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.background.layer4,
        padding: '0 8px',
        borderRadius: theme.shape.borderRadius * 2,
        '& fieldset': {
            borderColor: '#3a4142'
        },
        '&:hover fieldset': {
            borderColor: '#637381'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#24ee89'
        },
        '& .MuiInputBase-input': {
            fontWeight: 600,
            padding: '10px 4px'
        }
    },
    '& .MuiInputLabel-root': {
        color: '#637381'
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#24ee89'
    }
}));

const ForgotPasswordModal = () => {
    const { onToggleModal } = useSettingsContext();

    const [formData, setFormData] = useState({ email: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Forgot password form submitted:', formData);
    };

    return (
        <Stack sx={{ position: { sm: 'relative' }, height: '100%' }}>
            <Stack direction="column" sx={{ p: '20px 24px', gap: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontSize: 18, fontWeight: 800, lineHeight: '1.75rem' }}>
                        Reset Password
                    </Typography>

                    <CloseButton
                        sx={{
                            position: { xs: 'absolute', sm: 'relative' },
                            right: { xs: 15, sm: 'auto' },
                            top: { xs: 15, sm: 'auto' }
                        }}
                        onClick={() => onToggleModal('')}
                    >
                        <CloseIcon sx={{ fontSize: 16 }} />
                    </CloseButton>
                </Stack>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <StyledTextField
                            fullWidth
                            name="email"
                            placeholder="Email / Phone Number"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <ColorButton
                            type="submit"
                            sx={{ width: '100%', height: '2.5rem', fontSize: 14, fontWeight: 600 }}
                        >
                            Reset Password
                        </ColorButton>

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ gap: 1, cursor: 'pointer' }}
                            onClick={() => onToggleModal('SIGNIN')}
                        >
                            <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />

                            <Typography sx={{ color: 'text.primary', fontSize: 14, fontWeight: 600 }}>
                                Back to Login
                            </Typography>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    );
};

export default ForgotPasswordModal;
