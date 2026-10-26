import { useTranslate } from 'locales';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
// @mui
import { Stack } from '@mui/material';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
// hooks
import { useAuth } from 'hooks/use-auth-context';
// components
import ColorButton from 'components/ColorButton';
import { LoadingScreen } from 'components/loading-screen';
import { useSettingsContext } from 'components/settings';
// api
import { gameLaunch } from 'api';

export const Sports = () => {
    const { t } = useTranslate();
    const { isLogined } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const { onToggleModal } = useSettingsContext();

    const [loading, setLoading] = useState(false);
    const [launchUrl, setLaunchUrl] = useState('');

    const getGameLaunchUrl = async () => {
        try {
            setLoading(true);
            const response = await gameLaunch({
                gameCode: '1',
                productCode: 1046,
                gameType: 'SPORT_BOOK'
            });
            if (response.status) {
                setLaunchUrl(response.url);
            }
        } catch (error: any) {
            console.log(error);
            enqueueSnackbar(error.message, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLogined) {
            getGameLaunchUrl();
        }
    }, [isLogined]);

    return (
        <Stack
            sx={{
                width: '100%',
                height: { md: 'calc(100vh - 56px)', xs: 'calc(100vh - 56px - 62px)' },
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }}
        >
            {loading && (
                <Stack sx={{ width: 1, height: '90vh' }}>
                    <LoadingScreen />
                </Stack>
            )}
            {launchUrl === '' && !isLogined && (
                <Stack
                    sx={{
                        width: { md: '400px', sx: '300px' },
                        bgcolor: 'background.layer3',
                        borderRadius: 2,
                        padding: 2
                    }}
                    gap={4}
                >
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <ColorButton
                            sx={{ width: '12rem', display: 'flex', alignItems: 'center', gap: 1 }}
                            onClick={() => onToggleModal('SIGNIN')}
                        >
                            <PlayCircleOutlineOutlinedIcon sx={{ fontSize: 16 }} />
                            {t('signin')}
                        </ColorButton>
                    </Stack>
                </Stack>
            )}
            {launchUrl !== '' && (
                <iframe
                    style={{ width: '100%', border: 'none', position: 'absolute', zIndex: '100', height: '100%' }}
                    src={launchUrl}
                />
            )}
        </Stack>
    );
};
