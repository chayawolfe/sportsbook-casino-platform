import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Scrollbar from 'components/scrollbar';
import EditProfile from './edit-profile';
import MasterMedals from './master-medals';
import MedalDetails from './medal-details';
import MyProfile from './my-profile';
import StatisticsDetails from './statistics-details';
import { ChangeAvatar } from './change-avatar';
const StyledModal = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const ModalContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    flex: '1 1',
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius * 3,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '480px',
    position: 'relative',
    '&:focus': { outline: 'none' }
}));

const ProfileModal = ({ open, setOpen }: { open: string | null; setOpen: (open: string | null) => void }) => {
    const renderTitle = () => {
        if (open === 'my-profile') return 'My Profile';
        if (open === 'edit-profile') return 'Edit Profile';
        if (open === 'edit-avatar') return 'Edit Your Avatar';
        if (open === 'master-medals') return 'Master Medals';
        if (open?.includes('medal-details')) return 'Medal Details';
        if (open === 'statistics-details') return 'Statistics Details';
    };

    const renderContent = () => {
        if (open === 'my-profile') return <MyProfile setOpen={setOpen} />;
        if (open === 'edit-profile') return <EditProfile setOpen={setOpen} />;
        if (open === 'edit-avatar') return <ChangeAvatar setOpen={setOpen} />;
        if (open === 'master-medals') return <MasterMedals setOpen={setOpen} />;
        if (open?.includes('medal-details')) return <MedalDetails id={open.split('-')[1]} />;
        if (open === 'statistics-details') return <StatisticsDetails />;
    };

    const handleClose = () => {
        if (open === 'my-profile') return setOpen(null);
        if (open === 'edit-profile') return setOpen('my-profile');
        if (open === 'edit-avatar') return setOpen('edit-profile');
        if (open === 'master-medals') return setOpen('my-profile');
        if (open?.includes('medal-details')) return setOpen('master-medals');
        if (open === 'statistics-details') return setOpen('my-profile');
        else return setOpen(null);
    };

    return (
        <StyledModal open={open !== null} onClose={() => setOpen(null)}>
            <ModalContent>
                <Stack direction="column" sx={{ width: '100%' }}>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width: '100%', height: '3.5rem', bgcolor: 'background.card' }}
                    >
                        <Typography variant="h6">{renderTitle()}</Typography>
                        <Button
                            sx={{
                                minWidth: 'auto',
                                p: 0.7,
                                mr: 0.5,
                                bgcolor: 'background.brightButton',
                                position: 'absolute',
                                left: '1rem'
                            }}
                            onClick={() => handleClose()}
                        >
                            <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
                        </Button>
                    </Stack>

                    <Stack sx={{ position: 'relative', p: 2 }}>
                        <Scrollbar sx={{ height: '584px' }}>{renderContent()}</Scrollbar>
                    </Stack>
                </Stack>
            </ModalContent>
        </StyledModal>
    );
};

export default ProfileModal;
