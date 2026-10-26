import { useTranslate } from 'locales';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
// @mui
import { Box, Card, MenuItem, Stack, Typography } from '@mui/material';
// components
import Iconify from 'components/iconify';
import { settingApi } from 'api/setting.api';

const HelpCenter = () => {
    const { t, i18n } = useTranslate();
    const [data, setData] = useState<any[]>([]);
    const [help, setHelp] = useState<any>();

    const loadData = async () => {
        const response = await settingApi.getHelps(i18n.language);
        setData(response);
        if (response.length) {
            setHelp(response[0]);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line
    }, [i18n.language]);

    return (
        <Stack spacing={1}>
            <Card sx={{ bgcolor: 'background.card', p: 2, py: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="icon-park-outline:help" />
                    <Typography>{t('helpCenter')}</Typography>
                </Stack>
            </Card>
            <Stack spacing={1} direction={{ md: 'row', xs: 'column' }} sx={{ height: 'calc(100vh - 128px)' }}>
                <Card sx={{ bgcolor: 'background.card', p: 1, flex: 1 }}>
                    <Box sx={{ height: 1, overflow: 'auto' }}>
                        <Box>
                            {data.map((item) => (
                                <MenuItem
                                    onClick={() => setHelp(item)}
                                    key={item._id}
                                    sx={{ bgcolor: item._id === help._id ? 'background.layer3' : 'background.card' }}
                                >
                                    {item.title}
                                </MenuItem>
                            ))}
                        </Box>
                    </Box>
                </Card>
                <Card sx={{ bgcolor: 'background.card', p: 2, flex: 4, height: 1 }}>
                    {help && (
                        <Stack spacing={1} sx={{ height: 1, overflow: 'auto' }}>
                            <Typography variant="h3">{help.title}</Typography>
                            <Box
                                sx={{
                                    '*': {
                                        margin: 0
                                    },
                                    p: {
                                        fontSize: '0.875rem'
                                    }
                                }}
                            >
                                {parse(help.content || '')}
                            </Box>
                        </Stack>
                    )}
                </Card>
            </Stack>
        </Stack>
    );
};

export default HelpCenter;
