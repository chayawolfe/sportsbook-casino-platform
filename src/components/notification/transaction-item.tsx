import moment from 'moment';
import parse from 'html-react-parser';
// @mui
import { Delete, RemoveRedEye } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
// types
import { notificationType } from 'types/notification';

const TansactionItem = ({
    item,
    onDelete,
    onRead
}: {
    item: notificationType;
    onDelete: () => Promise<void>;
    onRead: () => Promise<void>;
}) => {
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
            <Stack spacing={1}>
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
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
                {item.isRead ? (
                    <Stack />
                ) : (
                    <Button size="small" startIcon={<RemoveRedEye />} onClick={onRead}>
                        Mark as Read
                    </Button>
                )}
                <IconButton onClick={onDelete}>
                    <Delete />
                </IconButton>
            </Stack>
        </Stack>
    );
};

export default TansactionItem;
