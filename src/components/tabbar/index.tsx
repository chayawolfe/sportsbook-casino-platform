import { paths } from 'routes/paths';
import { memo, useMemo } from 'react';
import { useRouter } from 'routes/hook';
import { useTranslate } from 'locales';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// icons
import { CasinoIcon, ExploreIcon, MenuIcon, SportsIcon } from 'icons';
// components
import { useSettingsContext } from 'components/settings';

// ----------------------------------------------------------------------

const StyledBottomNavigation = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTopLeftRadius: theme.shape.borderRadius * 2,
    borderTopRightRadius: theme.shape.borderRadius * 2,
    zIndex: 1300,
    backgroundColor: theme.palette.background.layer2,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(0.5, 0)
}));

const TabLabel = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(0.5),
    fontSize: '0.75rem',
    fontWeight: 800
}));

const TabItem = styled(Stack)(({ theme }) => ({
    flex: 1,
    alignItems: 'center',
    cursor: 'pointer',
    padding: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    '&:hover': {
        color: theme.palette.primary.main
    },
    '&.active': {
        color: theme.palette.primary.main
    }
}));

const tabs = [
    {
        label: 'menu'
    },
    {
        label: 'explore'
    },
    {
        label: 'casino',
        path: paths.casino.root
    },
    {
        label: 'sports',
        path: paths.sports.root
    }
];

const Tabbar = ({ navStatus, onHandleNav }: { navStatus: boolean; onHandleNav: VoidFunction }) => {
    const { t } = useTranslate();
    const router = useRouter();
    const { onToggleModal } = useSettingsContext();

    const activeTab = useMemo(() => {
        if (navStatus) {
            return 'menu';
        }
        const current = tabs.find((tab) => location.pathname.startsWith(tab.path || 'explore'));
        return current?.label || '';
    }, [location.pathname, navStatus]);

    return (
        <StyledBottomNavigation>
            <Stack direction="row" spacing={0} sx={{ width: 1 }}>
                <TabItem
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => {
                        onHandleNav();
                    }}
                >
                    <MenuIcon
                        sx={{
                            color: activeTab === 'menu' ? 'primary.main' : 'text.secondary'
                        }}
                    />
                    <TabLabel
                        sx={{
                            color: activeTab === 'menu' ? 'primary.main' : 'text.secondary'
                        }}
                    >
                        {t(`menu`)}
                    </TabLabel>
                </TabItem>
                <TabItem
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => {
                        onToggleModal('EXPLORE');
                    }}
                >
                    <ExploreIcon
                        sx={{
                            color: activeTab === 'explore' ? 'primary.main' : 'text.secondary'
                        }}
                    />
                    <TabLabel
                        sx={{
                            color: activeTab === 'explore' ? 'primary.main' : 'text.secondary'
                        }}
                    >
                        {t(`explore`)}
                    </TabLabel>
                </TabItem>
                <TabItem
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => {
                        router.push(paths.casino.root);
                    }}
                >
                    <CasinoIcon
                        sx={{
                            color: activeTab === 'casino' ? 'primary.main' : 'text.secondary'
                        }}
                    />
                    <TabLabel
                        sx={{
                            color: activeTab === 'casino' ? 'primary.main' : 'text.secondary'
                        }}
                    >
                        {t(`casino`)}
                    </TabLabel>
                </TabItem>
                <TabItem
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => {
                        router.push(paths.sports.root);
                    }}
                >
                    <SportsIcon
                        sx={{
                            color: activeTab === 'sports' ? 'primary.main' : 'text.secondary'
                        }}
                    />
                    <TabLabel
                        sx={{
                            color: activeTab === 'sports' ? 'primary.main' : 'text.secondary'
                        }}
                    >
                        {t(`sports`)}
                    </TabLabel>
                </TabItem>
            </Stack>
        </StyledBottomNavigation>
    );
};

export default memo(Tabbar);
