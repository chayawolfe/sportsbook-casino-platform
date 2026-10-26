import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useTranslate } from 'locales';
import { useEffect, useState } from 'react';
// @mui
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
// types
import { IDeposit } from 'types/deposit';
// utils
import { fDateTime } from 'utils/format-time';
// api
import { paymentApi } from 'api/payment.api';
// components
import LoadTable from 'components/load-table';
import EmptyTable from 'components/empty-table';
import { useSettingsContext } from 'components/settings';
import TablePaginationCustom from 'components/table/table-pagination-custom';
//
import DepositSearchTool from './search-tool';

const STATUS: { [key: string]: string } = {
    pending: 'warning',
    process: 'info',
    success: 'success',
    failed: 'error',
    canceled: 'error'
};

const TYPE: { [key: string]: string } = {
    nowpayment: 'Crypto',
    manual: 'Admin',
    gspayment: 'Visa / MasterCard',
    agpayment: 'Pix Payment'
};

const DepositPage = () => {
    const { t } = useTranslate();
    const { enqueueSnackbar } = useSnackbar();
    const { onToggleModal } = useSettingsContext();

    const [status, setStatus] = useState('all');
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [data, setData] = useState<IDeposit[]>([]);
    const [date, setDate] = useState<{ start: Date; end: Date }>({
        start: moment().add(-7, 'days').startOf('day').toDate(),
        end: moment().toDate()
    });

    const getDepositList = async () => {
        try {
            setLoading(true);
            const response = await paymentApi.getDepositList({
                status,
                rowsPerPage,
                currentPage: currentPage + 1,
                date
            });

            setTotalRows(response.total);
            setData(response.data);
        } catch (error: any) {
            enqueueSnackbar(typeof error === 'string' ? error : error.message, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDepositList();
    }, [status, date]);

    return (
        <Stack sx={{ pt: 3, px: { md: 3, xs: 1 }, minHeight: '400px', bgcolor: 'background.card', borderRadius: 3 }}>
            <Stack spacing={2}>
                <Stack width={1} alignItems="end">
                    <Button onClick={() => onToggleModal('DEPOSIT')} variant="contained" color="primary">
                        {t('deposit')}
                    </Button>
                </Stack>
                <DepositSearchTool status={status} setDate={setDate} onChangeStatus={setStatus} />

                <Stack sx={{ overflow: 'auto' }}>
                    <Table sx={{ th: { py: 1 }, td: { borderBottom: 0 } }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Amount</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && <LoadTable colSpan={5} />}
                            {!loading &&
                                data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.amount.toFixed(2)}</TableCell>
                                        <TableCell align="right">{TYPE[item.payinType]}</TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                variant="body2"
                                                color={STATUS[item.status]}
                                                sx={{
                                                    textTransform: 'capitalize'
                                                }}
                                            >
                                                {item.status}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">{fDateTime(item.createdAt)}</TableCell>
                                    </TableRow>
                                ))}
                            <EmptyTable noData={!data.length && !loading} colSpan={5} />
                        </TableBody>
                    </Table>
                </Stack>
                <TablePaginationCustom
                    count={totalRows}
                    page={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(_, newPage) => setCurrentPage(newPage)}
                    onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
                />
            </Stack>
        </Stack>
    );
};

export default DepositPage;
