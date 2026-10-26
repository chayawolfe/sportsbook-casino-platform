import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Scrollbar from 'components/scrollbar';
import MyProfile from 'pages/profile/my-profile';
import EmailVerification from './email-verification';
import PersonalVerification from './personal-verification';
import PhoneVerification from './phone-verification';
import SetPassword from './set-password';
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

const SettingModal = ({ open, setOpen }: { open: string | null; setOpen: (open: string | null) => void }) => {
    const renderTitle = () => {
        if (open === 'personal-verification') return 'Personal Verification';
        else return '';
    };

    const renderContent = () => {
        if (open === 'my-profile') return <MyProfile setOpen={setOpen} />;
        if (open === 'email-verification') return <EmailVerification setOpen={setOpen} />;
        if (open === 'phone-verification') return <PhoneVerification />;
        if (open === 'set-password') return <SetPassword setOpen={setOpen} />;
        if (open === 'personal-verification') return <PersonalVerification setOpen={setOpen} />;
    };

    return (
        <StyledModal open={open !== null} onClose={() => setOpen(null)}>
            <ModalContent>
                <Stack direction="column" sx={{ width: '100%' }}>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width: '100%', height: '3.5rem', bgcolor: 'background.layer2' }}
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
                            onClick={() => setOpen(null)}
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

export default SettingModal;
