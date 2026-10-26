import React from 'react';
// @mui
import { Stack, TableCell, TableRow } from '@mui/material';
//
import { LoadingScreen } from '../loading-screen';

interface EmptyDataProps {
    colSpan: number;
}

const LoadTable: React.FC<EmptyDataProps> = ({ colSpan }) => {
    return (
        <TableRow>
            <TableCell colSpan={colSpan}>
                <Stack sx={{ minHeight: 300 }}>
                    <LoadingScreen />
                </Stack>
            </TableCell>
        </TableRow>
    );
};

export default LoadTable;
