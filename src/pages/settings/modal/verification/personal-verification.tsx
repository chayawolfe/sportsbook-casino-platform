import { useEffect, useState } from 'react';
import { Box, LinearProgress, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { FirstStep } from './personal-verification-step/first-step';
import { SecondStep } from './personal-verification-step/second-step';
import { ThirdStep } from './personal-verification-step/third-step';
import { getKyc, personalVerify } from 'api';
import { useSnackbar } from 'notistack';

const ModalContainer = styled(Box)(({ theme }) => ({
    // minWidth: 340,
    // minHeight: 400,
    borderRadius: 16,
    padding: theme.spacing(4, 3),
    margin: 'auto',
    color: theme.palette.text.primary
}));

const PersonalVerification = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [countryCode, setCountryCode] = useState('AF');
    const [country, setCountry] = useState('Afghanistan');
    const [docType, setDocType] = useState({
        value: 'passport',
        label: 'Passport'
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const [frontImage, setFrontImage] = useState<File | null>(null);
    const [backImage, setBackImage] = useState<File | null>(null);

    const onSubmit = async () => {
        try {
            if (!frontImage || !backImage) return;
            setLoading(true);
            const formData = new FormData();
            formData.append('frontImg', frontImage);
            formData.append('backImg', backImage);
            formData.append('countryCode', countryCode);
            formData.append('country', country);
            formData.append('type', docType.value);

            await personalVerify(formData);
            enqueueSnackbar('Successfully submitted. Please wait until confirm!', { variant: 'success' });
            setOpen(null);
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: 'error' });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalContainer>
            <Box sx={{ width: '100%', mb: 3, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <LinearProgress
                    variant="determinate"
                    value={(100 * step) / 3}
                    sx={{
                        height: 6,
                        borderRadius: 3,
                        width: '70%',
                        backgroundColor: 'background.layer3',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#25c16f',
                            borderRadius: 3
                        }
                    }}
                />
                {step > 1 && (
                    <Button
                        sx={{
                            minWidth: 'auto',
                            p: 0.7,
                            mr: 0.5,
                            bgcolor: 'background.brightButton',
                            position: 'absolute',
                            left: '0rem',
                            top: '-0.5rem'
                        }}
                        onClick={() => setStep(step - 1)}
                    >
                        <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
                    </Button>
                )}
            </Box>
            {step === 1 && (
                <FirstStep
                    countryCode={countryCode}
                    docType={docType}
                    setCountryCode={setCountryCode}
                    setCountry={setCountry}
                    setDocType={setDocType}
                    setStep={setStep}
                />
            )}
            {step === 2 && <SecondStep docType={docType.label} country={countryCode} setStep={setStep} />}
            {step === 3 && (
                <ThirdStep
                    loading={loading}
                    docType={docType.label}
                    country={countryCode}
                    setFrontImage={setFrontImage}
                    setBackImage={setBackImage}
                    setStep={setStep}
                    onSubmit={onSubmit}
                />
            )}
        </ModalContainer>
    );
};

export default PersonalVerification;
