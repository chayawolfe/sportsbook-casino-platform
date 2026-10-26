import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type RHFSelectProps = TextFieldProps & {
    name: string;
    native?: boolean;
    maxHeight?: boolean | number;
    children: React.ReactNode;
    PaperPropsSx?: SxProps<Theme>;
};

export function RHFSelect({
    name,
    native,
    maxHeight = 220,
    helperText,
    children,
    PaperPropsSx,
    sx,
    defaultValue = '', // add defaultValue prop with default ''
    ...other
}: RHFSelectProps & { defaultValue?: any }) {
    const { control } = useFormContext();
    const theme = useTheme();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue} // <-- pass defaultValue here
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    select
                    fullWidth
                    SelectProps={{
                        native,
                        MenuProps: {
                            PaperProps: {
                                sx: {
                                    ...PaperPropsSx
                                }
                            }
                        },
                        sx: { textTransform: 'capitalize' }
                    }}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.layer4,
                            padding: '0 8px',
                            '& fieldset': { borderColor: '#3a4142' },
                            '&:hover fieldset': { borderColor: '#637381' },
                            '&.Mui-focused fieldset': { borderColor: '#24ee89' },
                            '& .MuiInputBase-input': {
                                fontWeight: 600,
                                padding: '10px 4px',
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
                >
                    {children}
                </TextField>
            )}
        />
    );
}

// ----------------------------------------------------------------------

type RHFMultiSelectProps = FormControlProps & {
    name: string;
    label?: string;
    chip?: boolean;
    checkbox?: boolean;
    placeholder?: string;
    helperText?: React.ReactNode;
    options: {
        label: string;
        value: string;
    }[];
};

export function RHFMultiSelect({
    name,
    chip,
    label,
    options,
    checkbox,
    placeholder,
    helperText,
    ...other
}: RHFMultiSelectProps) {
    const { control } = useFormContext();

    const renderValues = (selectedIds: string[]) => {
        const selectedItems = options.filter((item) => selectedIds.includes(item.value));

        if (!selectedItems.length && placeholder) {
            return <Box sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
        }

        if (chip) {
            return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedItems.map((item) => (
                        <Chip key={item.value} size="small" label={item.label} />
                    ))}
                </Box>
            );
        }

        return selectedItems.map((item) => item.label).join(', ');
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControl error={!!error} {...other}>
                    {label && <InputLabel id={name}> {label} </InputLabel>}

                    <Select
                        {...field}
                        multiple
                        displayEmpty={!!placeholder}
                        id={`multiple-${name}`}
                        labelId={name}
                        label={label}
                        renderValue={renderValues}
                    >
                        {options.map((option) => {
                            const selected = field.value.includes(option.value);

                            return (
                                <MenuItem key={option.value} value={option.value}>
                                    {checkbox && <Checkbox size="small" disableRipple checked={selected} />}

                                    {option.label}
                                </MenuItem>
                            );
                        })}
                    </Select>

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
}
