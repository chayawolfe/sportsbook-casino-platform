import { lazy } from 'react';

import MainLayout from 'layouts/HomeLayout';
import SportsLayout from 'layouts/SportLayout';

import Loadable from 'components/Loadable';

const HomePage = Loadable(lazy(() => import('pages/home')));
const CasinoPage = Loadable(lazy(() => import('pages/casino')));
const YourGames = Loadable(lazy(() => import('pages/your-games')));
const SportsGame = Loadable(lazy(() => import('pages/sports/game')));
// const DigitainPlay = Loadable(lazy(() => import('pages/sports/digitain-play')));
const PlayerBonusPage = Loadable(lazy(() => import('pages/wallet/bonus')));
const WithdrawPage = Loadable(lazy(() => import('pages/wallet/withdraw')));
const TransactionPage = Loadable(lazy(() => import('pages/wallet/transaction')));
const DepositPage = Loadable(lazy(() => import('pages/wallet/deposit')));
const BetHistoryPage = Loadable(lazy(() => import('pages/wallet/bet-history')));
const BallancePage = Loadable(lazy(() => import('pages/wallet/balance')));
const WalletPage = Loadable(lazy(() => import('pages/wallet')));
const VipPage = Loadable(lazy(() => import('pages/vip')));
const Sports = Loadable(lazy(() => import('pages/sports/index')));
const SecurityPage = Loadable(lazy(() => import('pages/settings/security')));
const PreferencesPage = Loadable(lazy(() => import('pages/settings/preferences')));
const PersonalVerification = Loadable(lazy(() => import('pages/settings/personal-verification')));
const AccountInfoPage = Loadable(lazy(() => import('pages/settings/account-info')));
const SettingPage = Loadable(lazy(() => import('pages/settings')));
const RecommendGameList = Loadable(lazy(() => import('pages/recommended')));
const GamePage = Loadable(lazy(() => import('pages/game')));
const BonusDetailPage = Loadable(lazy(() => import('pages/bonus/bonus-detail')));
const BonusPage = Loadable(lazy(() => import('pages/bonus')));
const AgGamePage = Loadable(lazy(() => import('pages/ag-game')));
const HotGames = Loadable(lazy(() => import('pages/slot-games/hot-game')));
const SlotGames = Loadable(lazy(() => import('pages/slot-games')));
const GameList = Loadable(lazy(() => import('pages/game-list')));
const AffiliateDashboard = Loadable(lazy(() => import('pages/affiliate/index')));
const HelpCenter = Loadable(lazy(() => import('pages/help-center')));

// ----------------------------------------------------------------------

export const mainRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: 'sports',
                element: <Sports />
            },
            {
                path: 'casino',
                element: <CasinoPage />
            },
            {
                path: 'casino/SLOT',
                element: <SlotGames />
            },
            {
                path: 'casino/:gameType',
                element: <GameList />
            },
            {
                path: 'game/:gameCode',
                element: <GamePage />
            },
            {
                path: 'ag-game/:gameCode',
                element: <AgGamePage />
            },
            {
                path: 'gamelist/Slots',
                element: <SlotGames />
            },
            {
                path: 'gamelist/Hot Game',
                element: <HotGames />
            },
            {
                path: 'gamelist/recommended-games',
                element: <RecommendGameList />
            },
            {
                path: 'gamelist/your-games',
                element: <YourGames />
            },
            {
                path: 'gamelist/:gameType',
                element: <GameList />
            },
            {
                path: 'wallet',
                element: <WalletPage />,
                children: [
                    {
                        path: 'balance',
                        element: <BallancePage />
                    },
                    {
                        path: 'deposit',
                        element: <DepositPage />
                    },
                    {
                        path: 'withdraw',
                        element: <WithdrawPage />
                    },
                    {
                        path: 'bonus',
                        element: <PlayerBonusPage />
                    },
                    {
                        path: 'transaction',
                        element: <TransactionPage />
                    },
                    {
                        path: 'bet-history',
                        element: <BetHistoryPage />
                    }
                ]
            },
            {
                path: 'vip',
                element: <VipPage />
            },
            {
                path: 'settings',
                element: <SettingPage />,
                children: [
                    {
                        path: 'account-info',
                        element: <AccountInfoPage />
                    },
                    {
                        path: 'security',
                        element: <SecurityPage />
                    },
                    {
                        path: 'preferences',
                        element: <PreferencesPage />
                    },
                    {
                        path: 'verification',
                        element: <PersonalVerification />
                    }
                ]
            },
            {
                path: 'bonus',
                element: <BonusPage />
            },
            {
                path: 'bonus/:id',
                element: <BonusDetailPage />
            },
            {
                path: 'affiliate',
                children: [
                    {
                        path: ':tab',
                        element: <AffiliateDashboard />
                    }
                ]
            },
            {
                path: '/help-center',
                element: <HelpCenter />
            }
        ]
    },
    {
        path: '/sports/game',
        element: <SportsLayout />,
        children: [
            {
                path: ':product_code/:currency',
                element: <SportsGame />
            }
            // {
            //     path: '1164/:currency',
            //     element: <DigitainPlay />
            // }
        ]
    }
];
