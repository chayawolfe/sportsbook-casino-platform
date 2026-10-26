import { useState } from 'react';
import { Avatar, Box, Button, Stack, styled } from '@mui/material';
import { ASSETS } from 'utils/axios';
import { useAuth } from 'hooks/use-auth-context';
import ColorButton from 'components/ColorButton';
import { updateAvatar } from 'api';
import { useSnackbar } from 'components/snackbar';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 192,
    height: 192,
    margin: '0 auto',
    position: 'relative',
    padding: theme.spacing(2.5),
    backgroundColor: theme.palette.background.paper
}));

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
});

export const ChangeAvatar = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { user, updateUser } = useAuth();
    const [avatar, setAvatar] = useState<string>(ASSETS(user?.avatar));
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newAvatarUrl = URL.createObjectURL(file);
            setSelectedFile(file);
            setAvatar(newAvatarUrl);
        }
    };

    const handleSave = async () => {
        if (!selectedFile) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('avatar', selectedFile);
            const data = await updateAvatar(formData);
            await updateUser({ avatar: data.avatar });
            setAvatar(data.avatar);
            enqueueSnackbar('Avatar changed successfully!', { variant: 'success' });
            setOpen(null);
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: 'error' });
            console.error('Upload failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <Button role={undefined} tabIndex={-1} component="label" sx={{ borderRadius: 50, overflow: 'hidden' }}>
                    <StyledAvatar>
                        <Avatar src={avatar} alt="avatar" sx={{ width: '100%', height: '100%' }} />
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
                    </StyledAvatar>
                </Button>
            </Stack>

            <ColorButton loading={loading} onClick={handleSave} sx={{ width: '100%', mt: 2 }}>
                Save
            </ColorButton>
        </Box>
    );
};
