import { Button, Divider, Stack, Typography } from '@mui/material';
// mui icons
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface ISecondStep {
    docType: string;
    country: string;
    setStep: (value: number) => void;
}

export const SecondStep = ({ docType, country, setStep }: ISecondStep) => {
    return (
        <>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, textAlign: 'center', color: 'text.primary' }}>
                Get ready to upload your {docType}
            </Typography>
            <Stack flexDirection="row" alignItems="center" gap={1} justifyContent="center">
                <img
                    loading="lazy"
                    width="20"
                    height="13"
                    srcSet={`https://flagcdn.com/w40/${country.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${country.toLowerCase()}.png`}
                    alt={country}
                />
                <Typography>{docType}</Typography>
                <Button onClick={() => setStep(1)}>
                    <EditIcon />
                </Button>
            </Stack>
            <Stack gap={0.5}>
                <Typography color="text.secondary">Tips</Typography>
                <Stack flexDirection="row" gap={1} alignItems="center">
                    <CheckCircleIcon color="success" fontSize="small" />
                    <Typography color="text.secondary">Upload a colored photo or file</Typography>
                </Stack>
                <Stack flexDirection="row" gap={1} alignItems="center">
                    <CheckCircleIcon color="success" fontSize="small" />
                    <Typography color="text.secondary">Take a photo in a well lit room</Typography>
                </Stack>
                <Stack flexDirection="row" gap={1} alignItems="center">
                    <HighlightOffIcon color="error" fontSize="small" />
                    <Typography color="text.secondary">Don't edit images of your document</Typography>
                </Stack>
            </Stack>
            <Typography
                variant="body2"
                sx={{
                    textAlign: 'center',
                    my: 3,
                    color: '#1765ff',
                    cursor: 'pointer',
                    ':hover': {
                        color: '#1765ffcc'
                    }
                }}
            >
                View our guidelines
            </Typography>

            <Divider sx={{ mt: 3 }} />

            <Stack direction="column" spacing={1} mt={3}>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        bgcolor: '#25c16f',
                        color: '#fff',
                        fontWeight: 700,
                        borderRadius: 1.5,
                        '&:hover': { bgcolor: '#1e9e58' }
                    }}
                    onClick={() => setStep(3)}
                >
                    Continue
                </Button>
            </Stack>
        </>
    );
};
