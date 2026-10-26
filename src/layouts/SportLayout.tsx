import { Outlet } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
// components
import Header from 'components/header';
import Navbar from 'components/navbar';
import Tabbar from 'components/tabbar';
import MobileNavbar from 'components/navbar/mobile';
import Notification from 'components/notification';
import { LoadingScreen } from 'components/loading-screen';
// hooks
import { useResponsive } from 'hooks/use-responsive';
// config
import { MAX_DRAWER_WIDTH, MIN_DRAWER_WIDTH } from 'config/constant';

const SportLayout = () => {
    const isDesktop = useResponsive('up', 'md');
    const isMobile = useResponsive('between', 'md');
    const isDownSM = useResponsive('down', 'sm');

    const [navStatus, setNavStatus] = useState(true);
    const [notificationState, setNotificationState] = useState(false);

    useEffect(() => {
        if (!isDesktop) {
            setNavStatus(false);
        }
    }, [isDesktop]);

    return (
        <Suspense fallback={<LoadingScreen />}>
            <Header
                onHandleNav={() => setNavStatus((pre) => !pre)}
                onHandleNotification={() => setNotificationState(true)}
            />
            {isDesktop ? (
                <Navbar open={navStatus} />
            ) : (
                <MobileNavbar isSport={true} open={navStatus} onClose={() => setNavStatus(false)} />
            )}
            <Box
                component="main"
                sx={{
                    minHeight: '100vh',
                    bgcolor: 'background.site',
                    ml:
                        navStatus && isDesktop
                            ? `${MAX_DRAWER_WIDTH}px`
                            : isMobile
                              ? 0
                              : isDownSM
                                ? 0
                                : `${MIN_DRAWER_WIDTH}px`,
                    pt: '3.5rem'
                }}
            >
                <Outlet />
            </Box>
            <Notification open={notificationState} onClose={() => setNotificationState(false)} />
        </Suspense>
    );
};

export default SportLayout;
