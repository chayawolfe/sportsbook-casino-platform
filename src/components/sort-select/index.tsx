import React from 'react';
import { FormControl, FormControlLabel, MenuItem, Radio, Select, SelectChangeEvent, Typography } from '@mui/material';

interface ISortSelect {
    value: string;
    size?: 'small' | 'medium';
    sortList: string[];
    width: number;
    defaultValue?: boolean;
    capitalize?: boolean;
    setSelectedValue: (value: string) => void;
}

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

export const SortSelect = ({
    size,
    value,
    sortList,
    width,
    setSelectedValue,
    defaultValue,
    capitalize
}: ISortSelect) => {
    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSelectedValue(event.target.value);
    };
    return (
        <FormControl sx={{ width }}>
            <Select
                size={size || 'medium'}
                labelId="demo-radio-select-label"
                id="demo-radio-select"
                value={value}
                onChange={handleSortChange}
                renderValue={(selected) =>
                    defaultValue ? (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={700}
                            sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
                        >
                            Sort by:
                            <Typography fontWeight={700} color="text.primary" component="span">
                                {selected || 'None'}
                            </Typography>
                        </Typography>
                    ) : (
                        <Typography textTransform="capitalize" fontWeight={700} color="text.primary" component="span">
                            {selected || 'None'}
                        </Typography>
                    )
                }
                MenuProps={MenuProps}
                sx={{ borderRadius: 3 }}
            >
                {sortList.map((option) => (
                    <MenuItem key={option} value={option}>
                        <FormControlLabel
                            value={option}
                            control={<Radio checked={value === option} />}
                            label={option}
                            sx={{
                                textTransform: capitalize ? 'capitalize' : 'initial'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
