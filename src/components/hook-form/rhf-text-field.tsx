import { useTheme } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
    name: string;
};

export default function RHFTextField({ name, helperText, type, sx, ...other }: Props) {
    const { control } = useFormContext();
    const theme = useTheme();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    type={type}
                    value={type === 'number' && field.value === 0 ? '' : field.value}
                    onChange={(event) => {
                        if (type === 'number') {
                            field.onChange(Number(event.target.value));
                        } else {
                            field.onChange(event.target.value);
                        }
                    }}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.layer4,
                            '& fieldset': { borderColor: '#3a4142' },
                            '&:hover fieldset': { borderColor: '#637381' },
                            '&.Mui-focused fieldset': { borderColor: '#24ee89' },
                            '& .MuiInputBase-input': {
                                fontWeight: 600,
                                color: 'text.primary'
                            }
                        },
                        '& .MuiInputLabel-root': {
                            color: '#637381',
                            '&.Mui-focused': { color: '#24ee89' }
                        },
                        ...sx
                    }}
                    {...other}
                />
            )}
        />
    );
}
