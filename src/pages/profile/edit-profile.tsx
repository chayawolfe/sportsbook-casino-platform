import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from 'hooks/use-auth-context';
import { ASSETS } from 'utils/axios';
import ColorButton from 'components/ColorButton';
import FormProvider, { RHFTextField } from 'components/hook-form';
import { updateUsername } from 'api';
import { useSnackbar } from 'components/snackbar';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 192,
    height: 192,
    margin: '0 auto',
    position: 'relative',
    padding: theme.spacing(2.5),
    backgroundColor: theme.palette.background.paper
}));

const EditProfile = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const methods = useForm({
        defaultValues: {
            username: user?.username || ''
        }
    });

    const onSubmit = async ({ username }: { username: string }) => {
        setLoading(true);
        try {
            await updateUsername(username);
            await updateUser({ username });
            enqueueSnackbar('Successfully updated username!', { variant: 'success' });
            setOpen(null);
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: 'error' });
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                <Box sx={{ position: 'relative' }}>
                    <StyledAvatar>
                        <Avatar src={ASSETS(user?.avatar)} alt="avatar" sx={{ width: '100%', height: '100%' }} />
                    </StyledAvatar>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }}
                    >
                        <ColorButton
                            role={undefined}
                            sx={{ minWidth: 158, height: 32, px: 1, textWrap: 'nowrap' }}
                            tabIndex={-1}
                            component="label"
                            onClick={() => setOpen('edit-avatar')}
                        >
                            Edit Your Avatar
                        </ColorButton>
                    </Box>
                </Box>

                <Typography variant="subtitle2" sx={{ mt: 2, color: 'text.secondary' }}>
                    Username
                </Typography>

                <RHFTextField name="username" required sx={{ mt: 1 }} />

                <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
                    Do not use special symbols, otherwise your account may not be supported.
                </Typography>

                <ColorButton loading={loading} type="submit" sx={{ width: '100%', mt: 2 }}>
                    Save
                </ColorButton>
            </FormProvider>
        </Box>
    );
};

export default EditProfile;
