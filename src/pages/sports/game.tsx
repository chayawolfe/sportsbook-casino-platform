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
import { useSettingsContext } from 'components/settings';
// api
import { gameLaunch } from 'api';
// routes
import { useParams } from 'routes/hook';

const SportsGame = () => {
    const { t } = useTranslate();
    const { language, isLogined } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const { onToggleModal } = useSettingsContext();
    const { product_code, currency } = useParams();
    const [launchUrl, setLaunchUrl] = useState('');

    const getGameLaunchUrl = async () => {
        try {
            const response = await gameLaunch({
                gameCode: '',
                language,
                productCode: product_code,
                gameType: 'SPORT_BOOK',
                currency
            });
            if (response.status) {
                setLaunchUrl(response.url);
            }
        } catch (error: any) {
            console.log(error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    useEffect(() => {
        if (isLogined && product_code && currency) {
            getGameLaunchUrl();
        }
    }, [isLogined, product_code, currency]);

    if (launchUrl) {
        return (
            <iframe
                style={{
                    top: 56,
                    width: '100%',
                    border: 'none',
                    position: 'absolute',
                    height: 'calc(100vh - 56px)'
                }}
                src={launchUrl}
            />
        );
    }

    return (
        <Stack
            sx={{
                width: 1,
                height: 'calc(100vh - 56px)',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {!isLogined && (
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
        </Stack>
    );
};

export default SportsGame;
