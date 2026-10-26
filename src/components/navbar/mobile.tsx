import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// @mui
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { CSSObject, styled, Theme } from '@mui/material/styles';
// components
import { useSettingsContext } from 'components/settings';
//
import { casinoMenus } from 'data';
import { useTranslate } from 'locales';
// routes
import { usePathname, useRouter } from 'routes/hook';
// hooks
import { useAuth } from 'hooks/use-auth-context';
import { Divider, IconButton } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

interface MenuItem {
    name: string;
    icon: any;
    path: string;
    children?: MenuItem[];
}

interface NavProps {
    open: boolean;
    isSport?: boolean;
    onClose: VoidFunction;
}

interface IconProps {
    path: string;
    x: number;
    y: number;
}

const FlagKey: any = {
    en: 'gb',
    cn: 'cn',
    fr: 'fr',
    vi: 'vn',
    ar: 'ae',
    pt: 'pt'
};

const DisplayModeToggle = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '40px',
    padding: '1px',
    borderRadius: 50,
    border: '1px solid',
    borderColor: theme.palette.divider,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& > div': {
        width: '50%',
        height: '38px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const Icon = memo(({ path, x, y }: IconProps) => (
    <Box
        sx={{
            width: 32,
            height: 32,
            backgroundImage: `url(${path})`,
            backgroundPosition: `${x}px ${y}px`,
            backgroundRepeat: 'no-repeat',
            transform: 'scale(0.75)'
        }}
    />
));

Icon.displayName = 'Icon';

const openedMixin = (theme: Theme): CSSObject => ({
    width: '100%',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: 0,
    [theme.breakpoints.up('sm')]: {
        width: 0
    }
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    width: '100%',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    zIndex: 1299,
    position: 'fixed',
    '& .MuiDrawer-paper': {
        zIndex: 1299,
        border: 0,
        backgroundColor: theme.palette.background.layer1
    },
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme)
            }
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme)
            }
        }
    ]
}));

const NavItem = memo(
    ({
        open,
        item,
        pathname,
        expanded,
        isChild,
        onClose,
        onExpand,
        onNavigate
    }: {
        open: boolean;
        item: MenuItem;
        pathname: string;
        expanded: boolean;
        isChild?: boolean;
        onClose: () => void;
        onExpand: (name: string) => void;
        onNavigate: (path: string) => void;
    }) => {
        const { t } = useTranslate();

        const isActive = pathname === item.path;
        const hasChildren = Boolean(item.children?.length);

        const handleExpandClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            onExpand(item.name);
        };

        return (
            <Box
                sx={{
                    gap: 0.5,
                    display: 'flex',
                    borderRadius: 2,
                    flexDirection: 'column'
                }}
            >
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            onNavigate(item.path);
                            onClose();
                            !open && onExpand(item.name);
                        }}
                        sx={{
                            px: 0.5,
                            height: 40,
                            borderRadius: 2,
                            background: 'transparent',
                            ...(isActive && {
                                background: 'linear-gradient(90deg,#23ee8833,#23ee8800),rgba(255, 255, 255, .05)',
                                color: 'primary.main'
                            }),
                            '&:hover': {
                                background: 'linear-gradient(90deg,#23ee8833,#23ee8800),rgba(255, 255, 255, .05)'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ mr: 0.5 }}>
                            <Icon
                                {...{
                                    ...item.icon,
                                    path: isActive ? item.icon.active : item.icon.path
                                }}
                            />
                        </ListItemIcon>
                        {open && (
                            <>
                                <ListItemText primary={t(`${item.name}`)} />
                                {hasChildren && (
                                    <Button
                                        onClick={handleExpandClick}
                                        sx={{ minWidth: 'auto', p: 0, mr: 0.5, bgcolor: 'background.brightButton' }}
                                    >
                                        {expanded ? <ExpandLess /> : <ExpandMore />}
                                    </Button>
                                )}
                            </>
                        )}
                    </ListItemButton>
                </ListItem>
                {hasChildren && (
                    <Collapse in={!expanded} timeout="auto" unmountOnExit>
                        <List
                            component="div"
                            disablePadding
                            sx={{
                                ml: 4,
                                borderRadius: 2
                                // background:
                                //     'linear-gradient(91.35deg, rgba(255, 255, 255, 0.15) 0.47%, rgba(255, 255, 255, 0.0375) 98.22%);'
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                {item.children?.map((child) => (
                                    <NavItem
                                        key={child.path}
                                        open={open}
                                        item={child}
                                        isChild={true}
                                        pathname={pathname}
                                        expanded={false}
                                        onClose={onClose}
                                        onExpand={onExpand}
                                        onNavigate={onNavigate}
                                    />
                                ))}
                            </Box>
                        </List>
                    </Collapse>
                )}
                {!isChild && <Divider />}
            </Box>
        );
    }
);

NavItem.displayName = 'NavItem';

const TheemSwitch = memo(({ open }: { open: boolean }) => {
    const { t } = useTranslate();
    const settings = useSettingsContext();

    const [mode, setMode] = useState<'light' | 'dark'>(settings.themeMode);

    useEffect(() => {
        settings.onUpdate('themeMode', mode);
    }, [mode]);

    if (open) {
        return (
            <DisplayModeToggle sx={{ ml: 'auto', cursor: 'pointer' }}>
                <Box sx={{ zIndex: 999 }} onClick={() => setMode('dark')}>
                    <DarkModeIcon color={mode === 'dark' ? 'primary' : 'disabled'} sx={{ fontSize: 16 }} />
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                            ml: 0.5,
                            color: mode === 'dark' ? 'primary.main' : 'text.disabled'
                        }}
                    >
                        {t('dark')}
                    </Typography>
                </Box>
                <Box sx={{ zIndex: 999 }} onClick={() => setMode('light')}>
                    <LightModeIcon color={mode === 'light' ? 'primary' : 'disabled'} sx={{ fontSize: 16 }} />
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                            ml: 0.5,
                            color: mode === 'light' ? 'primary.main' : 'text.disabled'
                        }}
                    >
                        {t('light')}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        backgroundColor: 'background.layer3',
                        borderRadius: 50,
                        zIndex: 0,
                        transition: 'all 0.3s ease-out',
                        left: mode === 'dark' ? '1px' : 'calc(50% - 1px)'
                    }}
                />
            </DisplayModeToggle>
        );
    }

    return (
        <Box
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            sx={{
                width: '100%',
                height: '40px',
                padding: '1px',
                borderRadius: 50,
                border: '1px solid',
                borderColor: (theme) => theme.palette.divider,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {mode === 'dark' ? (
                <DarkModeIcon color="primary" sx={{ fontSize: 16 }} />
            ) : (
                <LightModeIcon color="primary" sx={{ fontSize: 16 }} />
            )}
        </Box>
    );
});

const MobileNavbar = memo(({ open, isSport, onClose }: NavProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const { t, i18n } = useTranslate();

    const { isLogined } = useAuth();
    const { modal, onToggleModal } = useSettingsContext();

    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const handleExpand = useCallback((itemName: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [itemName]: !prev[itemName]
        }));
    }, []);

    const handleNavigate = useCallback(
        (path: string) => {
            onToggleModal('');
            router.push(path);
        },
        [router]
    );

    const menuItems = useMemo(() => casinoMenus, []);

    return (
        <Drawer component="nav" variant="permanent" open={open}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ p: 2, width: 1, position: 'sticky', top: 0, bgcolor: 'background.default', zIndex: 1 }}
            >
                <Typography sx={{ fontWeight: 600, fontSize: 16, textTransform: 'uppercase' }}>{t('menu')}</Typography>
                <IconButton onClick={onClose}>
                    <CloseOutlined sx={{ color: 'text.primary' }} />
                </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ px: 2, pt: 1, pb: isSport ? 3 : '70px', height: 1, overflow: 'auto' }}>
                <List
                    sx={{
                        width: 1,
                        p: 0,
                        borderRadius: 2,
                        display: 'flex',
                        flexGrow: 1,
                        flex: 1,
                        flexDirection: 'column'
                    }}
                >
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                        spacing={0.5}
                        sx={{
                            flexGrow: 1,
                            flex: 1
                        }}
                    >
                        <Stack direction="column" gap={0.5}>
                            <Box
                                sx={{
                                    gap: 0.5,
                                    display: 'flex',
                                    borderRadius: 2,
                                    flexDirection: 'column'
                                }}
                            >
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            onToggleModal(isLogined ? 'SPIN' : 'SIGNIN');
                                        }}
                                        sx={{
                                            px: open ? 0.5 : 0.25,
                                            height: 40,
                                            borderRadius: 2,
                                            background:
                                                modal === 'SPIN'
                                                    ? 'linear-gradient(90deg,#23ee8833,#23ee8800),rgba(255, 255, 255, .05)'
                                                    : 'transparent',
                                            '&:hover': {
                                                background:
                                                    'linear-gradient(90deg,#23ee8833,#23ee8800),rgba(255, 255, 255, .05)'
                                            }
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                mr: 0.5,
                                                height: '42px',
                                                width: '42px',
                                                position: 'relative',
                                                pt: 0.5
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src="/assets/spin/spin-round.png"
                                                sx={{
                                                    position: 'absolute',
                                                    height: 36,
                                                    width: 36,
                                                    left: 0,
                                                    animation: 'rotate linear 2s infinite',
                                                    borderRadius: '50%',
                                                    '@keyframes rotate': {
                                                        '0%': {
                                                            transform: 'rotate(0)'
                                                        },
                                                        '100%': {
                                                            transform: 'rotate(360deg)'
                                                        }
                                                    }
                                                }}
                                            />
                                            <Box
                                                alt="spin"
                                                component="img"
                                                src="/assets/spin/spin.png"
                                                sx={{
                                                    position: 'absolute',
                                                    height: 'auto',
                                                    width: 18,
                                                    left: 8,
                                                    top: -3
                                                }}
                                            />
                                        </ListItemIcon>
                                        {open && <ListItemText primary={t('freeSpin.luckySpin')} />}
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </Box>
                            {menuItems.map((item) => (
                                <NavItem
                                    key={item.path}
                                    open={open}
                                    item={item}
                                    onClose={onClose}
                                    pathname={pathname}
                                    expanded={expandedItems[item.name] || false}
                                    onExpand={handleExpand}
                                    onNavigate={handleNavigate}
                                />
                            ))}
                        </Stack>

                        <Stack direction="column" spacing={2} sx={{ mt: 'auto' }}>
                            <Box>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => onToggleModal('LANGUAGE')}
                                        sx={{
                                            px: 0.5,
                                            height: 40,
                                            borderRadius: 2,
                                            background: 'transparent'
                                        }}
                                    >
                                        <ListItemText primary={t('language')} />
                                        <Button sx={{ minWidth: 'auto', p: 0, gap: 1 }}>
                                            <Box
                                                component="img"
                                                sx={{ width: 24, height: 24, borderRadius: 50 }}
                                                src={`https://flagcdn.com/w160/${FlagKey[i18n.language]}.png`}
                                                alt="lang"
                                            />
                                            <Typography sx={{ textTransform: 'uppercase' }}>{i18n.language}</Typography>
                                        </Button>
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </Box>

                            <TheemSwitch open={open} />
                        </Stack>
                    </Stack>
                </List>
            </Stack>
        </Drawer>
    );
});

MobileNavbar.displayName = 'Navbar';

export default MobileNavbar;
