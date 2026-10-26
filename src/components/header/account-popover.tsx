import { m } from 'framer-motion';

import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import { varHover } from 'components/animate';
import CustomPopover, { usePopover } from 'components/custom-popover';
import { useSnackbar } from 'components/snackbar';
import ProfileModal from 'pages/profile';
import { useState } from 'react';
import { useRouter } from 'routes/hook';
import { paths } from 'routes/paths';
import { useAuth } from 'hooks/use-auth-context';

import { ASSETS } from 'utils/axios';
import { useTranslate } from 'locales';

export default function AccountPopover() {
    const { user, logout } = useAuth();
    const { t } = useTranslate();

    const router = useRouter();

    const { enqueueSnackbar } = useSnackbar();

    const popover = usePopover();

    const [openProfile, setOpenProfile] = useState<string | null>(null);

    const handleLogout = async () => {
        try {
            logout();
            router.replace(paths.home.root);
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Unable to logout!', { variant: 'error' });
        }
    };

    const accountOptions = [
        {
            label: t('dropMenu.wallet'),
            icon: '/assets/icons/wallet.svg',
            linkTo: paths.wallet.balance
        },
        {
            label: t('dropMenu.deposit'),
            icon: '/assets/icons/deposit.svg',
            linkTo: paths.wallet.deposit
        },
        {
            label: t('dropMenu.withdraw'),
            icon: '/assets/icons/withdraw.svg',
            linkTo: paths.wallet.withdraw
        },
        {
            label: t('dropMenu.bonus_list'),
            icon: '/assets/icons/bonus.svg',
            linkTo: paths.wallet.bonus
        },
        {
            label: t('dropMenu.transactions'),
            icon: '/assets/icons/transaction.svg',
            linkTo: paths.wallet.transaction
        },
        {
            label: t('dropMenu.bet_history'),
            icon: '/assets/icons/history.svg',
            linkTo: paths.wallet.betHistory
        },
        {
            label: t('dropMenu.vip_club'),
            icon: '/assets/icons/vip.svg',
            linkTo: paths.vip.root
        },
        {
            label: t('dropMenu.my_profile'),
            icon: '/assets/icons/profile.svg',
            onClick: () => setOpenProfile('my-profile')
        },
        // {
        //     label: t('dropMenu.affiliate'),
        //     icon: '/assets/icons/affiliate.svg',
        //     linkTo: paths.affiliate.dashboard
        // },
        {
            label: t('dropMenu.global_settings'),
            icon: '/assets/icons/setting.svg',
            linkTo: paths.settings.accountInfo
        },
        {
            label: t('dropMenu.log_out'),
            icon: '/assets/icons/logout.svg',
            onClick: handleLogout
        }
    ];

    return (
        <>
            <IconButton
                component={m.button}
                whileTap="tap"
                whileHover="hover"
                variants={varHover(1.05)}
                onClick={popover.onOpen}
                sx={{
                    width: 40,
                    height: 40,
                    background: (theme) => alpha(theme.palette.grey[500], 0.08),
                    ...(popover.open && {
                        background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`
                    })
                }}
            >
                <Avatar
                    src={ASSETS(user?.avatar)}
                    alt={user?.username}
                    sx={{
                        width: 36,
                        height: 36,
                        border: (theme) => `solid 2px ${theme.palette.background.default}`
                    }}
                >
                    {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>

            <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 240, p: 0 }}>
                <Stack sx={{ p: { xs: 0.5, sm: 1 } }}>
                    {accountOptions.map((option) => (
                        <MenuItem
                            key={option.label}
                            sx={{ minHeight: { xs: '15px', sm: 'auto' } }}
                            onClick={() => {
                                option.linkTo && router.push(option.linkTo);
                                option.onClick && option.onClick();
                                popover.onClose();
                            }}
                        >
                            <Stack direction="row" alignItems="center" gap={1} p={{ xs: 0, sm: 0.3 }}>
                                <Box
                                    component="img"
                                    src={option.icon}
                                    alt={option.label}
                                    sx={{ width: 24, height: 24 }}
                                />
                                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                    {option.label}
                                </Typography>
                            </Stack>
                        </MenuItem>
                    ))}
                </Stack>
            </CustomPopover>

            <ProfileModal open={openProfile} setOpen={setOpenProfile} />
        </>
    );
}
