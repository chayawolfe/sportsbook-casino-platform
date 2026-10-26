import Image from 'components/image';

export const tabs = [
    {
        icon: <Image src="/assets/icons/lobby.svg" alt="lobby" width={18} height={18} />,
        value: '',
        label: 'lobby'
    },
    {
        icon: <Image src="/assets/icons/hot-games.svg" alt="hot games" width={18} height={18} />,
        value: 'HOT_GAME',
        label: 'Hot Game'
    },
    {
        icon: <Image src="/assets/icons/live-casino.svg" alt="live casino" width={18} height={18} />,
        value: 'LIVE_CASINO',
        label: 'Live Casino'
    },
    {
        icon: <Image src="/assets/icons/slots.svg" alt="slots" width={18} height={18} />,
        value: 'SLOT',
        label: 'Slots'
    },
    // {
    //     icon: <Image src="/assets/icons/bc-original.svg" alt="bc-original" width={18} height={18} />,
    //     value: 'LOTTERY',
    //     label: 'lottery'
    // },
    // {
    //     icon: <Image src="/assets/icons/lobby.svg" alt="lobby" width={18} height={18} />,
    //     value: 'QIPAI',
    //     label: 'Qipai'
    // },
    // {
    //     icon: <Image src="/assets/icons/slots.svg" alt="slots" width={18} height={18} />,
    //     value: 'P2P',
    //     label: 'P2P'
    // },
    {
        icon: <Image src="/assets/icons/hot-games.svg" alt="hot games" width={18} height={18} />,
        value: 'FISHING',
        label: 'Fishing'
    },
    // {
    //     icon: <Image src="/assets/icons/game-shows.svg" alt="game shows" width={18} height={18} />,
    //     value: 'COCK_FIGHTING',
    //     label: 'cock_fighting'
    // },
    // {
    //     icon: <Image src="/assets/icons/new-releases.svg" alt="new releases" width={18} height={18} />,
    //     value: 'BONUS',
    //     label: 'bonus.title'
    // },
    {
        icon: <Image src="/assets/icons/table-games.svg" alt="table games" width={18} height={18} />,
        value: 'POKER',
        label: 'Poker'
    },
    {
        icon: <Image src="/assets/icons/feature-buy-in.svg" alt="feature buy in" width={18} height={18} />,
        value: 'OTHER',
        label: 'others'
    }
    // {
    //     icon: <Image src="/assets/icons/providers.svg" alt="providers" width={18} height={18} />,
    //     value: 'LIVE_CASINO_PREMIUM',
    //     label: 'live_casino_premium'
    // }
];

export const casinoMenus = [
    {
        name: 'sports',
        icon: {
            path: '/assets/icons/icons-5.webp',
            active: '/assets/icons/icons-5.webp',
            x: -226,
            y: -225
        },
        path: '/sports'
    },
    {
        name: 'Casino',
        icon: {
            path: '/assets/icons/icons-1.webp',
            active: '/assets/icons/icons-1.webp',
            x: -96,
            y: 0
        },
        path: '/casino',
        children: [
            {
                name: 'Hot Game',
                icon: {
                    path: '/assets/icons/icons-5.webp',
                    active: '/assets/icons/icons-6.webp',
                    x: -194,
                    y: -32
                },
                path: '/gamelist/Hot Game'
            },
            {
                name: 'Live Casino',
                icon: {
                    path: '/assets/icons/icons-5.webp',
                    active: '/assets/icons/icons-6.webp',
                    x: -160,
                    y: -192
                },
                path: '/casino/LIVE_CASINO?type=Live Casino'
            },
            {
                name: 'Slots',
                icon: {
                    path: '/assets/icons/icons-5.webp',
                    active: '/assets/icons/icons-6.webp',
                    x: -128,
                    y: -224
                },
                path: '/casino/SLOT'
            },
            // {
            //     name: 'lottery',
            //     icon: {
            //         path: '/assets/icons/icons-5.webp',
            //         active: '/assets/icons/icons-6.webp',
            //         x: -64,
            //         y: -256
            //     },
            //     path: '/casino/LOTTERY'
            // },
            // {
            //     name: 'Qipai',
            //     icon: {
            //         path: '/assets/icons/icons-5.webp',
            //         active: '/assets/icons/icons-6.webp',
            //         x: -96,
            //         y: -162
            //     },
            //     path: '/casino/QIPAI'
            // },
            // {
            //     name: 'P2P',
            //     icon: {
            //         path: '/assets/icons/icons-5.webp',
            //         active: '/assets/icons/icons-6.webp',
            //         x: -96,
            //         y: -223
            //     },
            //     path: '/casino/P2P'
            // },
            {
                name: 'Fishing',
                icon: {
                    path: '/assets/icons/icons-5.webp',
                    active: '/assets/icons/icons-6.webp',
                    x: -194,
                    y: -32
                },
                path: '/casino/FISHING?type=Fishing'
            },
            // {
            //     name: 'cock_fighting',
            //     icon: {
            //         path: '/assets/icons/icons-5.webp',
            //         active: '/assets/icons/icons-6.webp',
            //         x: -66,
            //         y: -128
            //     },
            //     path: '/casino/COCK_FIGHTING'
            // },
            // {
            //     name: 'bonus.title',
            //     icon: {
            //         path: '/assets/icons/icons-5.webp',
            //         active: '/assets/icons/icons-6.webp',
            //         x: -226,
            //         y: 0
            //     },
            //     path: '/casino/BONUS'
            // },
            {
                name: 'Poker',
                icon: {
                    path: '/assets/icons/icons-5.webp',
                    active: '/assets/icons/icons-6.webp',
                    x: -256,
                    y: -64
                },
                path: '/casino/POKER?type=Poker'
            },
            {
                name: 'others',
                icon: {
                    path: '/assets/icons/icons-5.webp',
                    active: '/assets/icons/icons-6.webp',
                    x: -160,
                    y: -32
                },
                path: '/casino/OTHER?type=Others'
            }
            // {
            //     name: 'live_casino_premium',
            //     icon: {
            //         path: '/assets/icons/icons-5.webp',
            //         active: '/assets/icons/icons-6.webp',
            //         x: -160,
            //         y: -96
            //     },
            //     path: '/casino/LIVE_CASINO_PREMIUM'
            // }
        ]
    },
    {
        name: 'vip_club',
        icon: {
            path: '/assets/icons/icons-5.webp',
            active: '/assets/icons/icons-6.webp',
            x: 0,
            y: -256
        },
        path: '/vip'
    },
    {
        name: 'bonus.title',
        icon: {
            path: '/assets/icons/icons-5.webp',
            active: '/assets/icons/icons-6.webp',
            x: -128,
            y: -65
        },
        path: '/bonus'
    },
    {
        name: 'dropMenu.affiliate',
        icon: {
            path: '/assets/icons/icons-5.webp',
            active: '/assets/icons/icons-6.webp',
            x: 0,
            y: -32
        },
        path: '/affiliate/dashboard'
    },
    {
        name: 'helpCenter',
        icon: {
            path: '/assets/icons/icons-5.webp',
            active: '/assets/icons/icons-6.webp',
            x: -257,
            y: -160
        },
        path: '/help-center'
    }
];
