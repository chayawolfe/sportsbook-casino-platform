import { useTranslate } from 'locales';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
// utils
import { fDateTime } from 'utils/format-time';
// api
import { bonusApi } from 'api/bonus.api';
// types
import { IPlayerBonus } from 'types/bonus';
// components
import LoadTable from 'components/load-table';
import EmptyTable from 'components/empty-table';
import TablePaginationCustom from 'components/table/table-pagination-custom';
//
import BonusSearchTool from './search-tool';
import { fBalance } from 'utils/format-balance';
import { useBoolean } from 'hooks/use-boolean';

const STATUS: { [key: string]: string } = {
    pending: 'warning',
    active: 'info',
    claimed: 'success',
    expired: 'error',
    delete: 'error'
};

const BonusPage = () => {
    const { t } = useTranslate();
    const { enqueueSnackbar } = useSnackbar();

    const loading = useBoolean();
    const vipLoading = useBoolean();

    const [totalRows, setTotalRows] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [status, setStatus] = useState<string>('all');
    const [data, setData] = useState<IPlayerBonus[]>([]);
    const [vipData, setVipData] = useState<any>({
        weekly: null,
        monthly: null,
        levelUp: null
    });

    const checkVIPBonus = async () => {
        try {
            const response = await bonusApi.checkVIPBonus();
            setVipData(response);
        } catch (error) {
            console.log('Error for getting vip bonus');
        }
    };

    const getBonusList = async () => {
        try {
            loading.onTrue();
            const response = await bonusApi.getBonusList({
                status,
                rowsPerPage,
                currentPage: currentPage + 1
            });
            setTotalRows(response.total);
            setData(response.data);
        } catch (error) {
            console.log('Error for getting bonus history');
        } finally {
            loading.onFalse();
        }
    };

    const claimBonus = async (bonusId: string) => {
        try {
            loading.onTrue();
            const updatedData = await bonusApi.claimBonus(bonusId);
            if (updatedData) {
                setData((pre) =>
                    pre.map((item) => (item._id === bonusId ? { ...item, status: updatedData.status } : item))
                );
            }
            enqueueSnackbar('Successfully claimed!', { variant: 'success' });
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: 'error' });
        } finally {
            loading.onFalse();
        }
    };

    const claimVipBonus = async (type: string) => {
        try {
            vipLoading.onTrue();
            const updatedData = await bonusApi.claimVipBonus({ type });
            if (updatedData) {
                setVipData((pre: any) => ({ ...pre, [type]: null }));
            }
            enqueueSnackbar('Successfully claimed!', { variant: 'success' });
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: 'error' });
        } finally {
            vipLoading.onFalse();
        }
    };

    useEffect(() => {
        getBonusList();
    }, [status]);

    useEffect(() => {
        checkVIPBonus();
        // eslint-disable-next-line
    }, []);

    return (
        <Stack spacing={2}>
            <Stack
                sx={{ pt: 3, px: { md: 3, xs: 1 }, minHeight: '400px', bgcolor: 'background.card', borderRadius: 3 }}
            >
                <Stack gap={2}>
                    <BonusSearchTool status={status} onChangeStatus={setStatus} />
                    <Stack sx={{ overflow: 'auto' }}>
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
                                    <TableCell>{t('bonus.table.name')}</TableCell>
                                    <TableCell>{t('bonus.table.amount')}</TableCell>
                                    <TableCell>{t('bonus.table.goal')}</TableCell>
                                    <TableCell>{t('bonus.table.process')}</TableCell>
                                    <TableCell align="center">{t('bonus.table.status')}</TableCell>
                                    <TableCell align="center">{t('bonus.table.type')}</TableCell>
                                    <TableCell align="center" sx={{ minWidth: 180 }}>
                                        {t('bonus.table.expiryDate')}
                                    </TableCell>
                                    <TableCell>{t('bonus.table.action')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading.value && <LoadTable colSpan={8} />}
                                {!loading.value &&
                                    data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ width: { xs: '30%', sm: 'auto' } }}>
                                                {item.bonus.name}
                                            </TableCell>
                                            <TableCell>{item.amount.toFixed(2)}</TableCell>
                                            <TableCell>{item.goalAmount}</TableCell>
                                            <TableCell sx={{ width: { xs: '96px', sm: 'auto' } }}>
                                                {item.processAmount.toFixed(2)}
                                            </TableCell>
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
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    fontWeight: 600,
                                                    textTransform: 'capitalize'
                                                }}
                                            >
                                                {item.bonus.option}
                                            </TableCell>
                                            <TableCell align="right">{fDateTime(item.bonus.expireDate)}</TableCell>
                                            <TableCell align="right">
                                                {item.status === 'active' && (
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => claimBonus(item._id)}
                                                    >
                                                        {t('bonus.claim')}
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                <EmptyTable noData={!data.length && !loading.value} colSpan={8} />
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

            <Stack
                spacing={2}
                sx={{ pt: 3, px: { md: 3, xs: 1 }, minHeight: '400px', bgcolor: 'background.card', borderRadius: 3 }}
            >
                <Typography variant="subtitle1">
                    Hit{' '}
                    <Typography component="span" sx={{ fontWeight: 700, color: 'success.light' }}>
                        VIP 22
                    </Typography>{' '}
                    - Your Bonus Buffet Awaits!
                </Typography>

                <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" sx={{ bgcolor: 'background.layer5', borderRadius: 2 }}>
                        <Box component="img" src="/assets/images/vip/bonus-recharge.webp" sx={{ width: 100 }} />
                        <Stack>
                            <Typography variant="subtitle2">Level Up Bonus</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                Reach every VIP level
                            </Typography>
                        </Stack>
                        <Stack sx={{ ml: 'auto', mr: 2 }} alignItems="center" spacing={1}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {vipData.levelUp ? fBalance(vipData.levelUp.amount) : '0.00'}
                            </Typography>
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled={!vipData.levelUp}
                                loading={vipLoading.value}
                                onClick={() => claimVipBonus('levelUp')}
                            >
                                Claim
                            </LoadingButton>
                        </Stack>
                    </Stack>

                    <Stack direction="row" alignItems="center" sx={{ bgcolor: 'background.layer5', borderRadius: 2 }}>
                        <Box component="img" src="/assets/images/vip/bonus-weekly.webp" sx={{ width: 100 }} />
                        <Stack>
                            <Typography variant="subtitle2">Weekly Cashback</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                Personalised cash drop every Friday
                            </Typography>
                        </Stack>
                        <Stack sx={{ ml: 'auto', mr: 2 }} alignItems="center" spacing={1}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {vipData.weekly ? fBalance(vipData.weekly.amount) : '0.00'}
                            </Typography>
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled={!vipData.weekly}
                                loading={vipLoading.value}
                                onClick={() => claimVipBonus('weekly')}
                            >
                                Claim
                            </LoadingButton>
                        </Stack>
                    </Stack>
                    <Stack direction="row" alignItems="center" sx={{ bgcolor: 'background.layer5', borderRadius: 2 }}>
                        <Box component="img" src="/assets/images/vip/bonus-monthly.webp" sx={{ width: 100 }} />
                        <Stack>
                            <Typography variant="subtitle2">Monthly Cashback</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                Supersized rebate on the 15th
                            </Typography>
                        </Stack>
                        <Stack sx={{ ml: 'auto', mr: 2 }} alignItems="center" spacing={1}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {vipData.monthly ? fBalance(vipData.monthly.amount) : '0.00'}
                            </Typography>
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled={!vipData.monthly}
                                loading={vipLoading.value}
                                onClick={() => claimVipBonus('monthly')}
                            >
                                Claim
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default BonusPage;
