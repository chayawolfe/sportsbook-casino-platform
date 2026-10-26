import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Icon } from '@iconify/react';
// @mui
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
// hooks
// import useSettings from 'hooks/useSettings';
// import MobileMenu from 'components/MobileMenu';

type listItemProps = {
    order: number;
    title: string;
    link: string;
    icon: any;
};

const Wrapper = () => {
    const theme = useTheme();

    // const { onChangePasswordModal, config } = useSettings();

    const dropList = useMemo(() => {
        let array: listItemProps[] = [
            {
                title: 'profile',
                order: 0,
                link: '/profile',
                icon: <Icon icon="mingcute:user-4-fill" width="24" height="24" />
            },
            {
                order: 3,
                title: 'account statement',
                link: '/reports/account-statement',
                icon: <Icon icon="game-icons:receive-money" width="24" height="24" />
            },
            {
                order: 4,
                title: 'game report',
                link: '/reports/profit-loss',
                icon: <Icon icon="octicon:log-16" width="24" height="24" />
            },
            {
                order: 6,
                title: 'my bets',
                link: '/reports/mybets',
                icon: <Icon icon="mdi:book-alphabet" width="24" height="24" />
            },
            {
                order: 7,
                title: 'Chip Settings',
                link: '/setting/stake',
                icon: <Icon icon="mdi:poker-chip" width="24" height="24" />
            },
            {
                order: 8,
                title: 'IP log',
                link: '/reports/login-history',
                icon: <Icon icon="solar:document-text-bold-duotone" width="24" height="24" />
            }
        ];
        return array.sort((a, b) => a.order - b.order);
    }, []);

    const active = useMemo(() => {
        const activeRouter = dropList.filter(({ link }) => link === window.location.pathname);
        if (activeRouter.length) {
            return activeRouter[0].link;
        } else {
            return '/reports/profit-loss';
        }
    }, [dropList, window.location.pathname]);

    const handlePassword = () => {
        // onChangePasswordModal(true);
    };

    return (
        <>
            <Box component="main" sx={{ minHeight: 'calc(100vh - 72px - 347px)' }}>
                <Box sx={{ width: 1, display: 'flex', justifyContent: 'center' }}>
                    <Tabs
                        value={active}
                        variant="scrollable"
                        sx={{
                            bottom: 0,
                            zIndex: 9,
                            paddingLeft: 0,
                            paddingRight: 0,
                            '& .MuiTabs-scroller': {
                                marginTop: 1
                            },
                            '& .MuiTabScrollButton-root': {
                                [theme.breakpoints.down('sm')]: {
                                    bgcolor: 'background.neutral',
                                    borderColor: 'background.paper',
                                    borderWidth: 2,
                                    borderStyle: 'solid',
                                    borderRadius: 0,
                                    '&:nth-of-type(1)': {
                                        borderLeftWidth: 0,
                                        borderTopRightRadius: 8,
                                        borderBottomRightRadius: 8
                                    },
                                    '&:nth-of-type(4)': {
                                        borderRightWidth: 0,
                                        borderTopLeftRadius: 8,
                                        borderBottomLeftRadius: 8
                                    }
                                }
                            },
                            '& .MuiTabs-indicator': {
                                top: 0,
                                height: 'calc(100% - 8px)',
                                borderRadius: 1000,
                                zIndex: 0,
                                bgcolor: 'background.neutral',
                                boxShadow: theme.shadows[4]
                            },
                            '& .MuiTab-root': {
                                padding: 1,
                                bgcolor: 'background.neutral',
                                borderWidth: 1,
                                borderStyle: 'solid',
                                borderColor: 'background.paper',
                                borderRadius: 1000,
                                wordBreak: 'break-all',
                                marginRight: '8px !important',
                                marginBottom: 1,
                                marginLeft: '8px !important',
                                boxShadow: theme.shadows[4],
                                '& .MuiTab-label': {
                                    ml: 0.5,
                                    zIndex: 1
                                },
                                '& .MuiTab-iconWrapper': {
                                    zIndex: 1,
                                    margin: 0,
                                    borderRadius: '50%',
                                    bgcolor: 'background.paper',

                                    '& span': {
                                        width: 48,
                                        height: 48,
                                        transform: 'scale(0.8)'
                                    }
                                }
                            }
                        }}
                    >
                        {dropList.map((item: any, index: number) => (
                            <Tab
                                key={index}
                                value={item.link}
                                label={<Box className="MuiTab-label">{item.title}</Box>}
                                component={RouterLink}
                                to={item.link}
                                icon={item.icon}
                                iconPosition="start"
                            />
                        ))}
                        <Tab
                            sx={{ ml: 5 }}
                            value=""
                            label={<Box className="MuiTab-label">Change Password</Box>}
                            onClick={handlePassword}
                            icon={<Icon icon="solar:lock-password-bold-duotone" width="24" height="24" />}
                            iconPosition="start"
                        />
                    </Tabs>
                </Box>
                <Container maxWidth="xl" sx={{ py: 2 }}>
                    <Outlet />
                </Container>
            </Box>
            {/* <MobileMenu /> */}
        </>
    );
};

export default Wrapper;
