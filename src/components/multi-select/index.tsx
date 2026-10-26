import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    InputBase,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { providerType } from 'types/game';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
            width: 250,
            position: 'relative' as 'relative'
        }
    }
};

interface IMultiSelect {
    placeholder: string;
    size?: 'small' | 'medium';
    defaultValue?: string[];
    list: { value: string; label: string }[];
    selectedValues: string[];
    selectValues: (value: string[]) => void;
}

export const MultiSelect = ({
    placeholder,
    selectedValues,
    list,
    size,
    defaultValue = ['All'],
    selectValues
}: IMultiSelect) => {
    const [providerSearch, setProviderSearch] = React.useState<string>('');

    const filteredProviders = list.filter((pro) => pro?.label?.toLowerCase().includes(providerSearch.toLowerCase()));

    const handleProviderChange = (event: SelectChangeEvent<typeof selectedValues>) => {
        const {
            target: { value }
        } = event;

        let forkValue: string | string[] = '';
        if (typeof value === 'string') {
            forkValue = value;
        } else if (typeof value === 'object') {
            forkValue = value.filter((item) => String(item) !== 'undefined');
        }

        if (!forkValue.length) {
            forkValue = defaultValue;
        }

        const newValue = typeof forkValue === 'string' ? forkValue.split(',') : forkValue;

        if (newValue.length === 0) {
            selectValues(defaultValue);
        } else if (selectedValues[0] === defaultValue[0] && newValue.length > 1 && newValue[0] === defaultValue[0]) {
            selectValues(newValue.filter((v) => v !== defaultValue[0]));
        } else {
            selectValues(newValue);
        }
    };

    const handleClearAllProviders = () => {
        selectValues(defaultValue);
    };

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <Select
                size={size || 'medium'}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedValues}
                onChange={handleProviderChange}
                renderValue={(selected) => (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={700}
                        sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
                    >
                        {placeholder}:
                        <Typography fontWeight={700} color="text.primary">
                            {selected.length === 1 && selected[0] === 'All' ? 'All' : `+${selected.length}`}
                        </Typography>
                    </Typography>
                )}
                MenuProps={MenuProps}
                sx={{ borderRadius: 3 }}
            >
                <Box
                    sx={{
                        px: 1,
                        pt: 1,
                        pb: 1
                    }}
                >
                    <InputBase
                        placeholder="Search Providers"
                        fullWidth
                        value={providerSearch}
                        onChange={(e) => setProviderSearch(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        onKeyUp={(e) => e.stopPropagation()}
                        onKeyPress={(e) => e.stopPropagation()}
                        sx={{
                            bgcolor: 'background.layer4',
                            borderRadius: 1,
                            px: 1,
                            fontSize: 14,
                            height: 36
                        }}
                    />
                </Box>
                {filteredProviders.map((pro) => (
                    <MenuItem key={pro.value} value={`${pro.value}`}>
                        <Checkbox checked={selectedValues.includes(`${pro.value}`)} />
                        <ListItemText primary={pro.label} />
                    </MenuItem>
                ))}

                <Box
                    sx={{
                        position: 'sticky',
                        bottom: 0,
                        zIndex: 1,
                        bgcolor: 'background.paper',
                        px: 2,
                        py: 1,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleClearAllProviders}
                        sx={{
                            fontWeight: 700,
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <DeleteIcon />
                        Clear All
                    </Button>
                </Box>
            </Select>
        </FormControl>
    );
};
