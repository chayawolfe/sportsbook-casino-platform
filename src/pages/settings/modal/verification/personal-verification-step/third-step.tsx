import { useState } from 'react';
import { Typography, Stack, Button, styled, Divider } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';

interface IThirdStep {
    country: string;
    docType: string;
    loading: boolean;
    setStep: (value: number) => void;
    setFrontImage: (file: File) => void;
    setBackImage: (file: File) => void;
    onSubmit: () => void;
}

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

export const ThirdStep = ({
    country,
    docType,
    loading,
    setStep,
    setFrontImage,
    setBackImage,
    onSubmit
}: IThirdStep) => {
    const [frontImg, setFrontImg] = useState<string>('');
    const [backImg, setBackImg] = useState<string>('');
    const handleFrontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newAvatarUrl = URL.createObjectURL(file);
            setFrontImage(file);
            setFrontImg(newAvatarUrl);
        }
    };

    const handleBackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newAvatarUrl = URL.createObjectURL(file);
            setBackImage(file);
            setBackImg(newAvatarUrl);
        }
    };
    return (
        <>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, textAlign: 'center', color: 'text.primary' }}>
                Upload your document
            </Typography>
            <Typography textAlign="center" color="text.secondary">
                Make sure that all the information on the photo is visible and easy to read
            </Typography>

            <Stack>
                <Typography color="text.secondary">Document type</Typography>
                <Button
                    sx={{
                        bgcolor: 'background.button1',
                        borderRadius: '8px',
                        justifyContent: 'space-between'
                    }}
                    onClick={() => setStep(1)}
                >
                    <Stack flexDirection="row" alignItems="center" gap={1}>
                        <img
                            loading="lazy"
                            width="20"
                            height="13"
                            srcSet={`https://flagcdn.com/w40/${country.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${country.toLowerCase()}.png`}
                            alt={country}
                        />
                        <Typography>{docType}</Typography>
                    </Stack>
                    <EditIcon />
                </Button>
            </Stack>

            <Button
                role={undefined}
                tabIndex={-1}
                component="label"
                sx={{
                    border: '1px dashed',
                    borderColor: 'background.layer3',
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'start',
                    gap: '8px',
                    padding: '8px 12px 8px 8px',
                    borderRadius: '8px',
                    marginTop: '12px',
                    bgcolor: 'background.button1',
                    flexDirection: 'row',
                    cursor: 'pointer',
                    ':hover': {
                        borderColor: '#1765ff'
                    }
                }}
            >
                <Stack
                    sx={{
                        width: '64px',
                        height: '64px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        bgcolor: 'background.button'
                    }}
                >
                    {frontImg !== '' ? <img src={frontImg} height="64px" width="64px" /> : <CloudUploadIcon />}
                </Stack>
                <Stack alignItems="start">
                    <Typography variant="body2" color="text.secondary">
                        Front side
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span style={{ color: '#1765ff' }}>Choose</span> or drag and drop
                    </Typography>
                </Stack>
                <VisuallyHiddenInput onChange={handleFrontChange} type="file" multiple />
            </Button>

            <Button
                role={undefined}
                tabIndex={-1}
                component="label"
                sx={{
                    border: '1px dashed',
                    borderColor: 'background.layer3',
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'start',
                    gap: '8px',
                    padding: '8px 12px 8px 8px',
                    borderRadius: '8px',
                    marginTop: '12px',
                    bgcolor: 'background.button1',
                    flexDirection: 'row',
                    cursor: 'pointer',
                    ':hover': {
                        borderColor: '#1765ff'
                    }
                }}
            >
                <Stack
                    sx={{
                        width: '64px',
                        height: '64px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        bgcolor: 'background.button'
                    }}
                >
                    {backImg !== '' ? <img src={backImg} height="64px" width="64px" /> : <CloudUploadIcon />}
                </Stack>
                <Stack alignItems="start">
                    <Typography variant="body2" color="text.secondary">
                        Back side
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span style={{ color: '#1765ff' }}>Choose</span> or drag and drop
                    </Typography>
                </Stack>
                <VisuallyHiddenInput onChange={handleBackChange} type="file" multiple />
            </Button>

            <Typography variant="body2" fontWeight="600" mt={2} color="text.secondary" textAlign="center">
                JPG, PNG, HEIC, WEBP or PDF (max 50 MB)
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack direction="column" spacing={1} mt={3}>
                <Button
                    loading={loading}
                    disabled={frontImg === '' || backImg === ''}
                    variant="contained"
                    fullWidth
                    sx={{
                        bgcolor: '#25c16f',
                        color: '#fff',
                        fontWeight: 700,
                        borderRadius: 1.5,
                        '&:hover': { bgcolor: '#1e9e58' }
                    }}
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Stack>
        </>
    );
};
