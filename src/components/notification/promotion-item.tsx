import moment from 'moment';
import parse from 'html-react-parser';
import { Link as ReactLink } from 'react-router-dom';
// @mui
import { Delete } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
// components
import Image from 'components/image/image';
// types
import { notificationType } from 'types/notification';
// utils
import { ASSETS } from 'utils/axios';
// hooks
import { useBoolean } from 'hooks/use-boolean';

const PromotionItem = ({
    item,
    onDelete,
    onRead
}: {
    item: notificationType;
    onDelete: () => Promise<void>;
    onRead: () => Promise<void>;
}) => {
    const isOpen = useBoolean();

    return (
        <Stack
            sx={{
                borderRadius: 2,
                padding: 1,
                bgcolor: 'background.layer5'
            }}
            spacing={1}
        >
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {moment(item.createdAt).format('M/D/yyy, hh:mm:ss A')}
            </Typography>
            <Typography variant="h6">{item.title}</Typography>
            <Stack
                spacing={1}
                sx={{ maxHeight: isOpen.value ? 'auto' : '6em', overflow: 'hidden', position: 'relative' }}
            >
                <Image sx={{ borderRadius: 1, minHeight: 180 }} src={ASSETS(item.banner)} />
                <Box
                    sx={{
                        color: 'text.secondary',
                        '*': {
                            margin: 0
                        },
                        p: {
                            fontSize: '0.875rem'
                        }
                    }}
                >
                    {parse(item.content || '')}
                </Box>
                <Button
                    onClick={() => {
                        isOpen.onToggle();
                        if (!item.isRead && !isOpen.value) {
                            onRead();
                        }
                    }}
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: '#4b7c83cc',
                        '&:hover': { bgcolor: '#4b7c83cc' }
                    }}
                >
                    {isOpen.value ? 'Hide' : 'Show All'}
                </Button>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
                {item.link ? (
                    <Button
                        component={ReactLink}
                        to={item.link}
                        variant="contained"
                        sx={{ color: 'success.main' }}
                        onClick={() => {
                            if (!item.isRead) {
                                onRead();
                            }
                        }}
                    >
                        Click to know more
                    </Button>
                ) : (
                    <Stack />
                )}
                <IconButton onClick={onDelete}>
                    <Delete />
                </IconButton>
            </Stack>
        </Stack>
    );
};

export default PromotionItem;
