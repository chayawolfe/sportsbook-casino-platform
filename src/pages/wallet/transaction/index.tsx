import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { _dateRangeOptions } from '_mock';
import { useEffect, useState } from 'react';
import TablePaginationCustom from 'components/table/table-pagination-custom';
import { getTransactions } from 'api';
import moment from 'moment';
import { useAuth } from 'hooks/use-auth-context';
import { Itransaction } from 'types/transaction';
import { fDateTime } from 'utils/format-time';
import { LoadingScreen } from 'components/loading-screen';
import { useTranslate } from 'locales';

import CustomDateRangePicker, { useDateRangePicker } from '../../../components/custom-date-range-picker';
import EmptyData from '../../../components/empty-data';

const TransactionPage = () => {
    const { t } = useTranslate();
    const rangeCalendarPicker = useDateRangePicker(new Date(), null);
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    const [totalRows, setTotalRows] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const [type, setType] = useState<string>('all');
    const [date, setDate] = useState<{ start: Date; end: Date }>({
        start: new Date(),
        end: new Date()
    });
    const [selectedDuration, setSelectedDuration] = useState<string>('60');

    const typeOptions = [
        {
            name: 'all',
            label: 'all'
        },
        {
            name: 'deposit',
            label: 'deposit'
        },
        {
            name: 'withdraw',
            label: 'withdraw'
        },
        {
            name: 'win',
            label: 'win'
        },
        {
            name: 'bet',
            label: 'bet'
        }
    ];
    const [data, setData] = useState<Itransaction[]>([]);

    const changeDuration = (value: string) => {
        if (value === 'custom' && rangeCalendarPicker.onOpen) {
            rangeCalendarPicker.onOpen();
        } else {
            const dateRange = getPastDate(Number(value));
            setDate(dateRange);
        }
        setSelectedDuration(value);
    };

    useEffect(() => {
        changeDuration(selectedDuration);
    }, [selectedDuration]);

    useEffect(() => {
        if (rangeCalendarPicker.startDate && rangeCalendarPicker.endDate) {
            setDate({
                start: rangeCalendarPicker.startDate,
                end: rangeCalendarPicker.endDate
            });
        }
    }, [rangeCalendarPicker.startDate, rangeCalendarPicker.endDate]);

    const getPastDate = (days: number) => {
        return {
            start: moment().add(-days, 'days').startOf('day').toDate(),
            end: moment().endOf('day').toDate()
        };
    };

    useEffect(() => {
        setData([]);
    }, []);

    const getTransactionHistories = async () => {
        try {
            setLoading(true);
            const response = await getTransactions({
                type,
                currentPage: currentPage + 1,
                rowsPerPage,
                date
            });
            setTotalRows(response.total);
            setData(response.data);
        } catch (error) {
            console.log('Get Transaction Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTransactionHistories();
    }, [type, date, rowsPerPage, currentPage]);

    return (
        <Stack
            direction="column"
            gap={2}
            sx={{ py: { xs: 1, sm: 2 }, px: { xs: 2, sm: 4 }, bgcolor: 'background.card', borderRadius: 3 }}
        >
            <Stack
                gap={1}
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }
                }}
            >
                <Select size="small" fullWidth value={type} onChange={(e) => setType(e.target.value)}>
                    {typeOptions.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                            {t(`${item.label}`)}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    size="small"
                    fullWidth
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                >
                    {_dateRangeOptions.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                            {t(`${item.label}`)}
                        </MenuItem>
                    ))}
                </Select>
            </Stack>

            <Stack direction="row" alignItems="center">
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                        cursor: 'pointer',
                        color: 'text.secondary',
                        textDecoration: 'underline',
                        gap: 0.5,
                        '&:hover': {
                            opacity: 0.8
                        }
                    }}
                >
                    <InfoOutlinedIcon sx={{ fontSize: 17 }} />
                    <Typography variant="body2">Fiat Deposit issues or Disputes</Typography>
                </Stack>
            </Stack>

            <Table
                sx={{
                    th: {
                        py: 1
                    },
                    td: {
                        borderBottom: 0
                    }
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>{t('type')}</TableCell>
                        <TableCell>{t('time')}</TableCell>
                        <TableCell>{t('amount')}</TableCell>
                        <TableCell> {t('balance')} </TableCell>
                    </TableRow>
                </TableHead>

                {!loading &&
                    (data.length === 0 ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <EmptyData />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        data.map((item, index) => (
                            <TableBody key={index}>
                                <TableCell sx={{ textTransform: 'capitalize' }}>
                                    <Typography fontWeight={700}>{item.typeDescription}</Typography>
                                    <Typography variant="caption" color="textDisabled">
                                        {item.gameName}
                                    </Typography>
                                </TableCell>
                                <TableCell>{fDateTime(item.createdAt)}</TableCell>
                                <TableCell>
                                    <Typography variant="button" color={item.amount > 0 ? 'primary' : 'error'}>
                                        {item.amount}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: 'right', fontWeight: '800' }}>{item.afterAmount}</TableCell>
                            </TableBody>
                        ))
                    ))}
            </Table>
            {loading && (
                <Stack width="100%" minHeight={300}>
                    <LoadingScreen />
                </Stack>
            )}
            <TablePaginationCustom
                count={totalRows}
                page={currentPage}
                rowsPerPage={rowsPerPage}
                onPageChange={(_, newPage) => setCurrentPage(newPage)}
                onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
            />
            <CustomDateRangePicker
                variant="calendar"
                open={rangeCalendarPicker.open}
                startDate={rangeCalendarPicker.startDate}
                endDate={rangeCalendarPicker.endDate}
                onChangeStartDate={rangeCalendarPicker.onChangeStartDate}
                onChangeEndDate={rangeCalendarPicker.onChangeEndDate}
                onClose={rangeCalendarPicker.onClose}
                error={rangeCalendarPicker.error}
            />
        </Stack>
    );
};

export default TransactionPage;
