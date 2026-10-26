import DarkModeIcon from '@mui/icons-material/DarkMode';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, Button, Stack, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { useSettingsContext } from 'components/settings';
import { casinoMenus } from 'data';
import { useTranslate } from 'locales';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'routes/hook';

interface MenuItem {
    name: string;
    icon: {
        path: string;
        x: number;
        y: number;
    };
    path: string;
    children?: MenuItem[];
}

interface IconProps {
    path: string;
    x: number;
    y: number;
}

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

const NavItem = memo(
    ({
        item,
        pathname,
        isChild,
        expanded,
        onExpand,
        onNavigate
    }: {
        item: MenuItem;
        pathname: string;
        isChild?: boolean;
        expanded: boolean;
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
                <ListItem
                    disablePadding
                    sx={{
                        border: 0,
                        borderStyle: 'solid',
                        borderBottom: isChild ? 0 : 1,
                        borderColor: (theme) => (theme.palette.mode === 'dark' ? '#ffffff1f' : theme.palette.divider)
                    }}
                >
                    <ListItemButton
                        onClick={() => {
                            onNavigate(item.path);
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
                            <Icon {...item.icon} />
                        </ListItemIcon>
                        <ListItemText primary={`${t(`${item.name}`)}`} />
                        {hasChildren && (
                            <Button
                                onClick={handleExpandClick}
                                sx={{ minWidth: 'auto', p: 0, mr: 0.5, bgcolor: 'background.brightButton' }}
                            >
                                {expanded ? <ExpandLess /> : <ExpandMore />}
                            </Button>
                        )}
                    </ListItemButton>
                </ListItem>
                {hasChildren && (
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ml: 3 }}>
                                {item.children?.map((child) => (
                                    <NavItem
                                        key={child.path}
                                        item={child}
                                        isChild={true}
                                        pathname={pathname}
                                        expanded={false}
                                        onExpand={onExpand}
                                        onNavigate={onNavigate}
                                    />
                                ))}
                            </Box>
                        </List>
                    </Collapse>
                )}
            </Box>
        );
    }
);

NavItem.displayName = 'NavItem';

const TheemSwitch = memo(() => {
    const { t } = useTranslate();
    const settings = useSettingsContext();

    const [mode, setMode] = useState<'light' | 'dark'>(settings.themeMode);

    useEffect(() => {
        settings.onUpdate('themeMode', mode);
    }, [mode]);

    return (
        <DisplayModeToggle sx={{ ml: 'auto', cursor: 'pointer' }}>
            <Box sx={{ zIndex: 999 }} onClick={() => setMode('dark')}>
                <DarkModeIcon
                    //  color={mode === 'dark' ? 'primary' : 'disabled'}
                    sx={{ fontSize: 16 }}
                />
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                        ml: 0.5
                        // color: mode === 'dark' ? 'primary.main' : 'text.disabled'
                    }}
                >
                    {t('dark')}
                </Typography>
            </Box>
            <Box sx={{ zIndex: 999 }} onClick={() => setMode('light')}>
                <LightModeIcon
                    // color={mode === 'light' ? 'primary' : 'disabled'}
                    sx={{ fontSize: 16 }}
                />
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                        ml: 0.5
                        // color: mode === 'light' ? 'primary.main' : 'text.disabled'
                    }}
                >
                    {t('light')}
                </Typography>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    backgroundColor: '#22E9A7',
                    borderRadius: 50,
                    zIndex: 0,
                    transition: 'all 0.3s ease-out',
                    left: mode === 'dark' ? '1px' : 'calc(50% - 1px)'
                }}
            />
        </DisplayModeToggle>
    );
});

const MenuPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const handleExpand = useCallback((itemName: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [itemName]: !prev[itemName]
        }));
    }, []);

    const handleNavigate = useCallback(
        (path: string) => {
            router.push(path);
        },
        [router]
    );

    const menuItems = useMemo(() => casinoMenus, []);

    return (
        <Stack sx={{ height: 1, px: 2, overflow: 'auto' }}>
            <List
                sx={{
                    p: 0,
                    height: 1,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Stack direction="column" justifyContent="space-between" gap={0.5} sx={{ height: 1 }}>
                    <Stack direction="column" gap={0.5}>
                        {menuItems.map((item) => (
                            <NavItem
                                key={item.path}
                                item={item}
                                pathname={pathname}
                                expanded={expandedItems[item.name] || false}
                                onExpand={handleExpand}
                                onNavigate={handleNavigate}
                            />
                        ))}
                    </Stack>

                    <Stack direction="column" gap={0.5}>
                        <TheemSwitch />
                    </Stack>
                </Stack>
            </List>
        </Stack>
    );
};

MenuPage.displayName = 'MenuPage';

export default MenuPage;
