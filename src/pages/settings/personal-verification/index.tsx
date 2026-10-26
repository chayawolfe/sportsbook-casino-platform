import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Alert, Box, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ColorButton from 'components/ColorButton';
import { useEffect, useState } from 'react';
import SettingModal from '../modal/verification';
import { getKyc } from 'api';
import { useTranslate } from 'locales';

const VerificationItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5)
}));

const VerificationCard = ({
    title,
    items,
    reviewTime,
    buttonText = 'Verify Now',
    onClick
}: {
    title: string;
    items: { icon: React.ReactNode; text: string }[];
    reviewTime: string;
    buttonText?: string;
    onClick: () => void;
}) => (
    <Paper
        sx={{
            p: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.layer3',
            borderRadius: 2
        }}
    >
        <Typography align="center" fontSize={16} fontWeight="bold" gutterBottom>
            {title}
        </Typography>
        <Stack direction="column" gap={1}>
            {items.map((item: any, index) => (
                <VerificationItem key={index}>
                    <Box component="img" src={item.icon} sx={{ width: 24, height: 24 }} />
                    <Typography variant="subtitle1" fontWeight="medium">
                        {item.text}
                    </Typography>
                </VerificationItem>
            ))}
        </Stack>
        <Box sx={{ mt: 'auto', pt: 3 }}>
            <ColorButton sx={{ width: 1 }} onClick={onClick}>
                {buttonText}
            </ColorButton>
            <Box sx={{ mt: 1, textAlign: 'center' }}>
                <Typography variant="body2" fontWeight="bold">
                    Review time: {reviewTime}
                </Typography>
            </Box>
        </Box>
    </Paper>
);

interface kycType {
    backImg: string;
    frontImg: string;
    status: string;
    type: string;
    userId: string;
    country: {
        code: string;
        name: string;
    };
    reason: string;
}

const PersonalVerification = () => {
    const { t } = useTranslate();
    const [openSetting, setOpenSetting] = useState<string | null>(null);
    const [kycData, setKycData] = useState<kycType>({
        backImg: '',
        frontImg: '',
        status: '',
        type: '',
        userId: '',
        country: {
            code: '',
            name: ''
        },
        reason: ''
    });

    const getPersonalInfo = async () => {
        const response = await getKyc();
        setKycData(response);
    };

    useEffect(() => {
        getPersonalInfo();
    }, []);

    const basicVerificationItems = [
        { icon: '/assets/icons/personal-info.svg', text: 'Personal Information' },
        { icon: '/assets/icons/facial.svg', text: 'Facial Verification' },
        { icon: '/assets/icons/government.svg', text: 'Government ID' }
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'background.layer4', borderRadius: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
                <Typography fontWeight="bold" sx={{ fontSize: 16 }}>
                    {t('personal_verification')}
                </Typography>
            </Box>

            <Stack spacing={2}>
                <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: { xs: '1fr' } }}>
                    {kycData.status === '' ||
                        (!kycData.status && (
                            <VerificationCard
                                title="Basic Verification"
                                items={basicVerificationItems}
                                reviewTime="Few mins"
                                onClick={() => setOpenSetting('personal-verification')}
                            />
                        ))}

                    {kycData.status === 'pending' && (
                        <VerificationCard
                            title="Basic Verification"
                            items={basicVerificationItems}
                            buttonText="Pending"
                            reviewTime="Few mins"
                            onClick={() => {}}
                        />
                    )}
                </Box>

                <Alert
                    severity="warning"
                    icon={<WarningAmberIcon />}
                    sx={{
                        backgroundColor: 'rgba(255, 152, 32, 0.15)',
                        '& .MuiAlert-icon': {
                            color: 'warning.main'
                        }
                    }}
                >
                    To serve you better we ask that you provide original identifying documents. This will secure your
                    account in cases of account recovery. It also helps to ensure that the gifts or actual rewards you
                    receive are sent to the correct location.
                </Alert>
            </Stack>

            <SettingModal open={openSetting} setOpen={setOpenSetting} />
        </Box>
    );
};

export default PersonalVerification;
