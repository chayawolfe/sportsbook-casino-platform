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
// routes
import { useParams } from 'routes/hook';

// Declare Bootstrapper if it’s loaded globally
declare global {
    interface Window {
        Bootstrapper?: {
            boot: (params: any, options: { name: string }) => void;
            bootIframe: (params: any, options: { name: string }, dimensions: { height: string }) => void;
        };
    }
}

const DigitainPlay = () => {
    const { t } = useTranslate();
    const { language, isLogined } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const { onToggleModal } = useSettingsContext();
    const { currency } = useParams();
    const [launchUrl, setLaunchUrl] = useState('');
    const [useAsianView, setUseAsianView] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const agentFrontUrl = 'https://betthrob.com';
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const getGameLaunchUrl = async () => {
        try {
            const response = await gameLaunch({
                gameCode: '',
                language,
                productCode: 1164,
                gameType: 'SPORT_BOOK',
                currency
            });
            if (response.status) {
                const url = new URL(response.url);
                const tokenFromUrl = url.searchParams.get('token');
                setToken(tokenFromUrl);
                setLaunchUrl(response.url);
            }
        } catch (error: any) {
            console.log(error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    useEffect(() => {
        console.log(useAsianView, token);
        if (!useAsianView || !token) return;

        // Send iframeLoaded message when iframe is ready
        window.onload = function () {
            window.parent.postMessage(
                { type: 'iframeLoaded' },
                agentFrontUrl // Example: "https://agent.front.url"
            );
        };

        const params = {
            server: 'https://tst-sp-web.int-digi.com',
            containerId: 'application-container',
            token,
            defaultLanguage: 'cn',
            timeZone: 4,
            login: function () {
                // Define your own login modal logic
                alert('Please login.');
            },
            hashRouterDisabled: false,
            externalLinksOpenInside: true,
            oddsFormatList: [0, 1, 2],
            oddsFormat: 2,
            parent: ['http://embed.partnerdomain.com/', 'http://othersite.example.com/'],
            sportPartner: '907cbf8a-1ed0-4fec-8707-d598db6ace7f'
        };
        console.log(window.Bootstrapper, '--window.Bootstrapper-');
        if (window.Bootstrapper) {
            window.Bootstrapper.boot(params, { name: 'Mobile' });
            window.Bootstrapper.bootIframe(params, { name: 'Mobile' }, { height: '900px' });
        }
    }, [useAsianView, token, scriptLoaded, agentFrontUrl]);

    useEffect(() => {
        if (isLogined && currency) {
            getGameLaunchUrl();
        }
    }, [isLogined, currency]);

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
            {isLogined && (
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
                    onLoad={() => window.parent.postMessage({ type: 'iframeLoaded' }, agentFrontUrl)}
                    style={{ width: '100%', border: 'none', position: 'absolute', zIndex: '100', height: '100%' }}
                    src={launchUrl}
                />
            )}
        </Stack>
    );
};

export default DigitainPlay;
