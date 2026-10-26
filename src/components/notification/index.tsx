import { useMemo, useState } from 'react';
// @mui
import { Close } from '@mui/icons-material';
import { Drawer, Box, Stack, Button, Typography, IconButton, Badge } from '@mui/material';
// api
import { notificationApi } from 'api/notification.api';
// hooks
import { useResponsive } from 'hooks/use-responsive';
// store
import { useDispatch, useSelector } from 'store/store';
// types
import { notificationType } from 'types/notification';
//
import PromotionItem from './promotion-item';
import TansactionItem from './transaction-item';
import { deleteNotification, readNotification } from 'store/slices/notification';

interface INotification {
    open: boolean;
    onClose: () => void;
}

const CATEGORY_LIST = [
    {
        value: 'promotions',
        label: 'Promotions',
        count: 'promotionsCount'
    },
    {
        value: 'transaction',
        label: 'Transactions',
        count: 'transactionsCount'
    },
    {
        value: 'system',
        label: 'System',
        count: 'systemCount'
    }
];

export default function Notification({ open, onClose }: INotification) {
    const dispatch = useDispatch();
    const isMobile = useResponsive('down', 'sm');
    const notification = useSelector((state: any) => state.notification);

    const [category, setCategory] = useState('promotions');

    const list = useMemo(() => {
        if (category === 'promotions') {
            return notification.promotions;
        }
        if (category === 'transactions') {
            return notification.transactions;
        }
        return notification.system;
    }, [notification, category]);

    const removeNotification = async (id: string, category: string) => {
        try {
            await notificationApi.deleteNotification(id);
            dispatch(deleteNotification({ id, category }));
        } catch (error) {
            console.log(error);
        }
    };

    const markAsRead = async (id: string, category: string) => {
        try {
            await notificationApi.readNotification(id);
            dispatch(readNotification({ id, category, data: { isRead: true } }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
            sx={{
                zIndex: 1300
            }}
            PaperProps={{
                sx: {
                    width: isMobile ? '100%' : '380px',
                    bgcolor: 'background.default'
                }
            }}
        >
            <Box>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ p: 2, position: 'relative', bgcolor: 'background.layer3' }}
                >
                    <Typography variant="subtitle1">Notification</Typography>
                    <IconButton sx={{ borderRadius: 1, position: 'absolute', top: 8, right: 16 }} onClick={onClose}>
                        <Close />
                    </IconButton>
                </Stack>
                <Stack sx={{ px: 2 }}>
                    <Stack direction="row" alignItems="center" sx={{ mt: 2, borderRadius: 2, bgcolor: '#0000004d' }}>
                        {CATEGORY_LIST.map((item) => (
                            <Badge
                                key={item.value}
                                badgeContent={notification[item.count]}
                                color="error"
                                sx={{ flex: 1 }}
                            >
                                <Button
                                    onClick={() => setCategory(item.value)}
                                    sx={{
                                        flex: 1,
                                        color: 'text.secondary',
                                        ...(item.value === category && {
                                            bgcolor: '#274145',
                                            color: 'text.primary'
                                        })
                                    }}
                                >
                                    {item.label}
                                </Button>
                            </Badge>
                        ))}
                    </Stack>
                    <Stack spacing={2} sx={{ my: 2 }}>
                        {list.map((item: notificationType) =>
                            category === 'promotions' ? (
                                <PromotionItem
                                    item={item}
                                    onDelete={() => removeNotification(item._id, category)}
                                    onRead={() => markAsRead(item._id, category)}
                                />
                            ) : (
                                <TansactionItem
                                    item={item}
                                    onDelete={() => removeNotification(item._id, category)}
                                    onRead={() => markAsRead(item._id, category)}
                                />
                            )
                        )}
                    </Stack>
                </Stack>
            </Box>
        </Drawer>
    );
}
