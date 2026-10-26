import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
// redux
import { store } from 'store/store';
import { Provider as ReduxProvider } from 'react-redux';
// language
import i18n from 'locales/i18n';
import { I18nextProvider } from 'react-i18next';
import { LocalizationProvider } from 'locales';
// pages
import SignModal from 'pages/sign-modal';
import ExploreModal from 'pages/explore';
import LanguageModal from 'pages/settings/modal/language-modal';
// components
import ScrollToTop from 'components/ScrollToTop';
import { DepositDialog } from 'components/deposit';
import { SettingsProvider } from 'components/settings';
import { SnackbarProvider } from 'components/snackbar';
// context
import AuthProvider from 'context/auth/auth-provider';
import { AuthConsumer } from 'context/auth/auth-consumer';
import SocketProvider from 'context/socket/socket-provider';
// theme
import ThemeProvider from 'theme';
// routes
import Router from 'routes/sections';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FreeSpinDialog } from 'pages/settings/modal/spin-modal';

const App = () => {
    return (
        <ReduxProvider store={store}>
            <AuthProvider>
                <SocketProvider>
                    <HelmetProvider>
                        <SettingsProvider
                            defaultSettings={{
                                themeMode: 'dark', // 'light' | 'dark'
                                themeDirection: 'ltr', //  'rtl' | 'ltr'
                                themeContrast: 'default', // 'default' | 'bold'
                                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                                themeStretch: false
                            }}
                        >
                            <ThemeProvider>
                                <SnackbarProvider>
                                    <AuthConsumer>
                                        <BrowserRouter>
                                            <I18nextProvider i18n={i18n}>
                                                <LocalizationProvider>
                                                    <Router />
                                                    <ScrollToTop />
                                                    <ExploreModal />
                                                    <SignModal />
                                                    <DepositDialog />
                                                    <LanguageModal />
                                                    <FreeSpinDialog />
                                                </LocalizationProvider>
                                            </I18nextProvider>
                                        </BrowserRouter>
                                    </AuthConsumer>
                                </SnackbarProvider>
                            </ThemeProvider>
                        </SettingsProvider>
                    </HelmetProvider>
                </SocketProvider>
            </AuthProvider>
        </ReduxProvider>
    );
};

export default App;
