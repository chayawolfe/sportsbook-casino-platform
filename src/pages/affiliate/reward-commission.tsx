import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import {
    Table,
    Stack,
    Button,
    Select,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    TableHead,
    ButtonGroup,
    FormControl,
    TableContainer
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
// api
import { affiliateApi } from 'api/affiliate.api';
// utils
import { fDateTime } from 'utils/format-time';
import { fBalance } from 'utils/format-balance';
// components
import LoadTable from 'components/load-table';
import EmptyTable from 'components/empty-table';

const RewardCommission = () => {
    const { t } = useTranslation();
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [data, setData] = useState<any[]>([]);

    const loadData = async () => {
        try {
            setIsLoading(true);
            const res = await affiliateApi.getRewardLog({
                type: 'commission',
                currentPage,
                rowsPerPage
            });
            setData(res.data);
            setTotalCount(res.total);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(typeof error === 'string' ? error : error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line
    }, [rowsPerPage, currentPage]);

    return (
        <TableContainer sx={{ py: 2, px: 2 }}>
            <Table sx={{ th: { py: 1, whiteSpace: 'nowrap' }, td: { borderColor: 'divider' } }}>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('reward.table.username')}</TableCell>
                        <TableCell align="right">{t('reward.table.commissionRate')}</TableCell>
                        <TableCell align="right">{t('reward.table.totalBet')}</TableCell>
                        <TableCell align="right">{t('reward.table.totalCommission')}</TableCell>
                        <TableCell align="right">{t('reward.table.currency')}</TableCell>
                        <TableCell align="right">{t('reward.table.registrationDate')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(() => {
                        if (isLoading) {
                            return <LoadTable colSpan={6} />;
                        }
                        if (!data.length) {
                            return <EmptyTable noData={!data.length && !isLoading} colSpan={6} />;
                        }
                        return data.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>{item.user.username}</TableCell>
                                <TableCell align="right">{item.referralData.commissionRate * 100}%</TableCell>
                                <TableCell align="right">{fBalance(item.betAmount)}</TableCell>
                                <TableCell align="right">{fBalance(item.commissionAmount)}</TableCell>
                                <TableCell align="right">{item.currency}</TableCell>
                                <TableCell align="right">{fDateTime(item.user.createdAt)}</TableCell>
                            </TableRow>
                        ));
                    })()}
                </TableBody>
            </Table>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
                <FormControl>
                    <Select
                        size="small"
                        value={String(rowsPerPage)}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
                <ButtonGroup variant="contained">
                    <Button
                        size="small"
                        sx={{ p: 0, color: 'white' }}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        <KeyboardArrowLeft />
                    </Button>
                    <Button
                        size="small"
                        sx={{ p: 0, color: 'white' }}
                        disabled={totalCount <= currentPage * rowsPerPage}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        <KeyboardArrowRight />
                    </Button>
                </ButtonGroup>
            </Stack>
        </TableContainer>
    );
};

export default RewardCommission;
