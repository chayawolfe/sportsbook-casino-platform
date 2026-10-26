import React from 'react';
// @mui
import { Box, TableCell, TableRow, Typography } from '@mui/material';

interface EmptyDataProps {
    noData: boolean;
    colSpan: number;
    message?: string;
}

const EmptyTable: React.FC<EmptyDataProps> = ({ noData, colSpan, message = 'Oops! There is no data yet!' }) => {
    if (!noData) return null;
    return (
        <TableRow>
            <TableCell colSpan={colSpan}>
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
                        src={'/assets/empty.svg'}
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
            </TableCell>
        </TableRow>
    );
};

export default EmptyTable;
