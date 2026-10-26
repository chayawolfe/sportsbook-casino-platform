import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fDateTime } from 'utils/format-time';
// @mui
import {
    Card,
    Stack,
    Table,
    Button,
    Divider,
    TableRow,
    TableBody,
    TableHead,
    TableCell,
    IconButton,
    Typography,
    TableContainer
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
// api
import { affiliateApi } from 'api/affiliate.api';
// components
import EmptyTable from 'components/empty-table';
import LoadTable from 'components/load-table';
// hooks
import { useCopyToClipboard } from 'hooks/use-copy-to-clipboard';
//
import { CreateReferralModal } from './create-referral-modal';

const ReferralCodeFriendView = () => {
    const { t } = useTranslation();
    const { copy } = useCopyToClipboard();

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [codeCount, setCodeCount] = useState(0);
    const [maxCount, setMaxCount] = useState(0);
    const [codes, setCodes] = useState<any[]>([]);
    const [totalFriend, setTotalFriend] = useState(0);

    const loadCodes = async () => {
        try {
            setIsLoading(true);
            const referralStatus = await affiliateApi.getReferralStatus();
            setTotalFriend(referralStatus.friendCount);
            setMaxCount(referralStatus.referralCount);
            const codes = await affiliateApi.getReferralCode();
            setCodeCount(codes.length);
            setCodes(codes);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // toast.error(typeof error === "string" ? error : error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onCloseModal = (reload: boolean) => {
        setOpenCreateModal(false);
        if (reload) {
            loadCodes();
        }
    };

    useEffect(() => {
        loadCodes();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Card
                sx={{
                    p: { md: 4, xs: 2 },
                    borderRadius: 2,
                    backgroundColor: 'background.card'
                }}
            >
                <Stack flexDirection={{ md: 'row', xs: 'column' }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ width: { md: '66%', xs: 1 } }}>
                        <Stack>
                            <Typography sx={{ color: 'text.secondary', fontSize: 14, fontWeight: 600 }}>
                                {t('referralCodes.stats.codes')}
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, textAlign: { md: 'start', xs: 'center' } }}>
                                {`${codeCount}/${maxCount}`}
                            </Typography>
                        </Stack>
                        <Stack>
                            <Typography sx={{ color: 'text.secondary', fontSize: 14, fontWeight: 600 }}>
                                {t('referralCodes.stats.friends')}
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, textAlign: { md: 'start', xs: 'center' } }}>
                                {totalFriend}
                            </Typography>
                        </Stack>
                        <Divider orientation="vertical" sx={{ display: { md: 'block', xs: 'none' } }} />
                    </Stack>
                    <Divider orientation="horizontal" sx={{ m: 3, display: { md: 'none', xs: 'block' } }} />
                    <Stack sx={{ flex: 1 }}>
                        <Stack sx={{ my: 'auto', ml: { md: 4, xs: 0 }, position: 'relative' }}>
                            <Stack spacing={1} sx={{ mx: { md: 4, xs: 0 } }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ color: '#000' }}
                                    onClick={() => setOpenCreateModal(true)}
                                >
                                    {t('referralCodes.actions.createCode')}
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>

            <Card
                sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.card'
                }}
            >
                <TableContainer>
                    <Table sx={{ th: { py: 1, whiteSpace: 'nowrap' }, td: { borderColor: 'divider' } }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">{t('referralCodes.table.name')}</TableCell>
                                <TableCell align="center">{t('referralCodes.table.code')}</TableCell>
                                <TableCell align="center">{t('referralCodes.table.link')}</TableCell>
                                <TableCell align="center">{t('referralCodes.table.commissionRate')}</TableCell>
                                <TableCell align="center">{t('referralCodes.table.dateCreated')}</TableCell>
                                <TableCell align="right">{t('referralCodes.table.referrals')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(() => {
                                if (isLoading) {
                                    return <LoadTable colSpan={6} />;
                                }
                                if (!codes.length) {
                                    return <EmptyTable noData={!codes.length && !isLoading} colSpan={6} />;
                                }
                                return codes.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="left">{item.name || '--'}</TableCell>
                                        <TableCell align="center">
                                            <Typography component="span">{item.code}</Typography>
                                            <IconButton
                                                sx={{ borderRadius: 1, ml: 1, p: 0.5 }}
                                                onClick={() => copy(`p-${item.code}`)}
                                            >
                                                <ContentCopy sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography component="span">{`https://betthrob.com/?r=p-${item.code}`}</Typography>
                                            <IconButton
                                                sx={{ borderRadius: 1, ml: 1, p: 0.5 }}
                                                onClick={() => copy(`https://betthrob.com/?r=p-${item.code}`)}
                                            >
                                                <ContentCopy sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="center">{item.commissionRate * 100}%</TableCell>
                                        <TableCell align="center">{fDateTime(item.createdAt)}</TableCell>
                                        <TableCell align="right">{item.referralCount}</TableCell>
                                    </TableRow>
                                ));
                            })()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <CreateReferralModal open={openCreateModal} onclose={onCloseModal} />
        </>
    );
};

export default ReferralCodeFriendView;
