import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

interface EmptyDataProps {
    message?: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({ message = 'Oops! There is no data yet!' }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                py: 5,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gridColumn: '1 / -1'
            }}
        >
            <Box
                component="img"
                src="/assets/empty.svg"
                alt="No data"
                sx={{
                    width: '12rem',
                    height: '12rem'
                }}
            />
            <Typography variant="body2" sx={{ mt: 2, fontWeight: 600, lineHeight: 1.25 }}>
                {message}
            </Typography>
        </Box>
    );
};

export default EmptyData;
