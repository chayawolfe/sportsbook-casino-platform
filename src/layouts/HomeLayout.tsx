import { Suspense, useEffect, useState } from 'react';
// hooks
import { useResponsive } from 'hooks/use-responsive';
// components
import Header from 'components/header';
import Navbar from 'components/navbar';
import Tabbar from 'components/tabbar';
import MobileNavbar from 'components/navbar/mobile';
import Notification from 'components/notification';
import { LoadingScreen } from 'components/loading-screen';
//
import Wrapper from './Wrapper';

const MainLayout = () => {
    const isDesktop = useResponsive('up', 'sm');
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
                <MobileNavbar open={navStatus} onClose={() => setNavStatus(false)} />
            )}
            <Wrapper open={navStatus} />
            {!isDesktop && <Tabbar navStatus={navStatus} onHandleNav={() => setNavStatus((pre) => !pre)} />}
            <Notification open={notificationState} onClose={() => setNotificationState(false)} />
        </Suspense>
    );
};

export default MainLayout;
