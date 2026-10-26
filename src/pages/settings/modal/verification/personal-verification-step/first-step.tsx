import {
    Autocomplete,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { countries } from 'config';

const documentTypes = [
    { value: 'passport', label: 'Passport' },
    { value: 'idcard', label: 'ID card' },
    { value: 'visa', label: 'Visa' }
];

interface IFirstStep {
    countryCode: string;
    docType: {
        value: string;
        label: string;
    };
    setCountryCode: (value: string) => void;
    setCountry: (value: string) => void;
    setDocType: (value: { value: string; label: string }) => void;
    setStep: (value: number) => void;
}

export const FirstStep = ({ countryCode, docType, setCountry, setCountryCode, setDocType, setStep }: IFirstStep) => {
    return (
        <>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, textAlign: 'center', color: 'text.primary' }}>
                Select type and issuing country of your identity document
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
                <Autocomplete
                    options={countries}
                    getOptionLabel={(option) => option.label}
                    value={countries.find((c) => c.code === countryCode) || null}
                    onChange={(event, newValue) => {
                        setCountryCode(newValue ? newValue.code : '');
                        setCountry(newValue ? newValue.label : '');
                    }}
                    isOptionEqualToValue={(option, value) => option.code === value.code}
                    sx={{
                        bgcolor: 'background.layer2',
                        borderRadius: 1,
                        '& .MuiInputBase-root': {
                            color: 'text.secondary'
                        },
                        '& .MuiInputBase-input': {
                            color: 'text.primary'
                        }
                    }}
                    renderOption={(props, option) => (
                        <li {...props} key={option.code}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    height="13"
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    alt={option.label}
                                />
                                <Typography color="text.primary">{option.label}</Typography>
                            </Stack>
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Issuing country"
                            variant="outlined"
                            sx={{ bgcolor: 'background.layer2', borderRadius: 1 }}
                            InputLabelProps={{ sx: { color: 'red' } }}
                        />
                    )}
                />
            </FormControl>

            <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                    Document type
                </Typography>
                <RadioGroup
                    value={docType.value}
                    onChange={(e) => {
                        const selectedDoc = documentTypes.find((doc) => doc.value === e.target.value);
                        setDocType(selectedDoc || { value: '', label: '' });
                    }}
                >
                    {documentTypes.map((type) => (
                        <FormControlLabel
                            key={type.value}
                            value={type.value}
                            control={
                                <Radio
                                    sx={{
                                        color: '#25c16f',
                                        '&.Mui-checked': { color: '#25c16f' }
                                    }}
                                />
                            }
                            label={type.label}
                            sx={{
                                mx: 0,
                                bgcolor: 'background.layer2',
                                borderRadius: 1,
                                mb: 1,
                                pl: 1,
                                '.MuiTypography-root': { color: 'text.primary' }
                            }}
                        />
                    ))}
                </RadioGroup>
            </FormControl>

            <Divider sx={{ mb: 2 }} />

            <Stack direction="column" spacing={1}>
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
                    onClick={() => setStep(2)}
                >
                    Continue
                </Button>
            </Stack>
        </>
    );
};
