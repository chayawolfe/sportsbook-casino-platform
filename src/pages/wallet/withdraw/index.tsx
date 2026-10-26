import { useEffect, useState } from 'react';
import { Box, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

import { useTranslate } from 'locales';
import TablePaginationCustom from 'components/table/table-pagination-custom';
import { IWithdraw } from 'types/transaction';
import { fDateTime } from 'utils/format-time';
import WithdrawSearchTool from './search-tool';
import { WithdrawModal } from './withdrawModal';
import EmptyTable from 'components/empty-table';
import LoadTable from 'components/load-table';
import { fAddress } from 'utils/format-address';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { paymentApi } from 'api/payment.api';

const STATUS: { [key: string]: string } = {
    pending: 'warning',
    payout: 'info',
    success: 'success',
    declined: 'error',
    failed: 'error'
};

const TYPE: { [key: string]: string } = {
    nowpayment: 'Crypto',
    manual: 'Admin',
    gspayment: 'Visa / MasterCard',
    agpayment: 'Pix Payment'
};

const WithdrawPage = () => {
    const { t } = useTranslate();
    const { enqueueSnackbar } = useSnackbar();

    const [status, setStatus] = useState('all');
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState<IWithdraw[]>([]);
    const [withdrawable, setWithdrawable] = useState(false);
    const [date, setDate] = useState<{ start: Date; end: Date }>({
        start: moment().add(-7, 'days').startOf('day').toDate(),
        end: moment().toDate()
    });

    const getWithdrawList = async () => {
        try {
            setLoading(true);
            const response = await paymentApi.getWithdrawList({
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

    const getWithdrawState = async () => {
        try {
            const response = await paymentApi.getPendingWithdraw();
            if (response) {
                setWithdrawable(true);
            } else {
                setWithdrawable(false);
            }
        } catch (error) {
            setWithdrawable(false);
        }
    };

    useEffect(() => {
        if (!openModal) getWithdrawState();
    }, [openModal]);

    useEffect(() => {
        getWithdrawList();
    }, [status, date]);

    return (
        <Stack sx={{ pt: 3, px: { md: 3, xs: 1 }, minHeight: '400px', bgcolor: 'background.card', borderRadius: 3 }}>
            <Stack gap={2}>
                <Stack width={1} alignItems="end">
                    <Button
                        disabled={withdrawable}
                        onClick={() => setOpenModal(true)}
                        variant="contained"
                        color="primary"
                    >
                        {t('withdraw')}
                    </Button>
                </Stack>
                <WithdrawSearchTool status={status} setDate={setDate} onChangeStatus={setStatus} />
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
                                        <TableCell sx={{ width: { xs: '30%', sm: 'auto' } }}>
                                            {item.amount.toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">{TYPE[item.payoutType]}</TableCell>
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
            <WithdrawModal open={openModal} setOpen={setOpenModal} reload={getWithdrawList} />
        </Stack>
    );
};

export default WithdrawPage;
