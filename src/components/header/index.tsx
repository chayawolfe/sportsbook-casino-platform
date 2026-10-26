import { useRef, useState } from 'react';
// @mui
import { Box, Button, Stack, Typography, useTheme, IconButton, Popover, Badge } from '@mui/material';
// hook
import { useRouter } from 'routes/hook';
import { useAuth } from 'hooks/use-auth-context';
import { useResponsive } from 'hooks/use-responsive';
// locales
import { useTranslate } from 'locales';
// icons
import { SearchIcon, WorldIcon } from 'icons';
import { Add } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
// components
import ColorButton from 'components/ColorButton';
import { useSettingsContext } from 'components/settings';
// store
import { useSelector } from 'store/store';
// utils
import { fBalance } from 'utils/format-balance';
//
import AccountPopover from './account-popover';

const Header = ({
    onHandleNav,
    onHandleNotification
}: {
    onHandleNav: () => void;
    onHandleNotification: () => void;
}) => {
    const theme = useTheme();
    const router = useRouter();
    const { t } = useTranslate();
    const { isLogined, user } = useAuth();
    const isMobile = useResponsive('down', 'sm');
    const { onToggleModal } = useSettingsContext();
    const balance = useSelector((state: any) => state.balance);
    const notification = useSelector((state: any) => state.notification);
    const anchorBalanceEl2 = useRef<HTMLDivElement | null>(null);
    const [showBalance, setShowBalance] = useState(false);

    const anchorBalanceOpen = (event: any) => {
        if (showBalance) {
            setShowBalance(false);
        } else {
            setShowBalance(true);
        }
    };

    const handleBalanceClose = () => {
        setShowBalance(false);
    };

    const commonButtonStyle = {
        padding: 0,
        minWidth: 0,
        width: { xs: '2rem', sm: '2.5rem' },
        height: { xs: '2rem', sm: '2.5rem' },
        borderRadius: '.5rem',
        bgcolor: 'background.layer5'
    };

    return (
        <Stack
            component="header"
            direction="row"
            sx={{
                width: 1,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1201,
                height: '3.5rem',
                alignItems: 'center',
                boxShadow: '#0000000d 0px 4px 8px 0px',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'background.default' : '#fff')
            }}
        >
            <Stack
                sx={{
                    width: 1,
                    height: '3.5rem',
                    alignItems: 'center',
                    boxShadow: '#0000000d 0px 4px 8px 0px',
                    background:
                        'radial-gradient(99.96% 100% at 3.74% 100%, rgba(34, 233, 167, 0.25) 0%, rgba(155, 232, 73, 0) 100%);'
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: 1, height: 1, flex: 1, px: { xs: '0.5rem', sm: '1rem' } }}
                >
                    <Stack direction="row" sx={{ flex: '0 0 auto', alignItems: 'center' }}>
                        <Button sx={commonButtonStyle} onClick={onHandleNav}>
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    transform: 'scale(0.75)',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: theme.palette.mode === 'dark' ? '-160px 0px' : '-128px -128px',
                                    backgroundImage: 'url(/assets/icons/icons-1.webp)'
                                }}
                            />
                        </Button>
                        <Box
                            component="img"
                            src="/logo.svg"
                            onClick={() => router.push('/')}
                            sx={{
                                ml: { xs: 0, sm: '1.25rem' },
                                height: { xs: '40px', sm: '2rem' },
                                width: 'auto',
                                cursor: 'pointer'
                            }}
                        />
                    </Stack>

                    <Stack direction="row" justifyContent="center" alignItems="center" width={1}>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ width: 1, maxWidth: 1248, px: { xs: 0, sm: 2 } }}
                        >
                            <Stack
                                direction="row"
                                spacing={{ xs: 0.5, sm: 1.5 }}
                                alignItems="center"
                                justifyContent="flex-end"
                                sx={{ flex: 1, width: 1 }}
                            >
                                {isLogined && (
                                    <>
                                        {!isMobile && (
                                            <Button sx={commonButtonStyle}>
                                                <SearchIcon
                                                    sx={{ color: 'text.secondary' }}
                                                    onClick={() => onToggleModal('EXPLORE')}
                                                />
                                            </Button>
                                        )}
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            spacing={0.5}
                                            ref={anchorBalanceEl2}
                                            sx={(theme) => ({
                                                p: { md: '3px', xs: '2px' },
                                                height: { md: '40px', xs: '38px' },
                                                border: `2px solid ${theme.palette.divider}`,
                                                borderRadius: 2,
                                                width: { md: '16.5rem', xs: '7.5rem' }
                                            })}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                sx={{ flex: 1 }}
                                                spacing={{ md: 1, xs: 0.5 }}
                                                onClick={anchorBalanceOpen}
                                            >
                                                <Box
                                                    component="img"
                                                    src={balance.icon || null}
                                                    alt="usd"
                                                    sx={{ width: { md: 22, xs: '18px' }, height: { md: 20, xs: 16 } }}
                                                />
                                                <Typography
                                                    sx={{ fontWeight: 600, fontSize: { md: '18px', xs: '12px' } }}
                                                >
                                                    {balance.amount.toFixed(2)}
                                                </Typography>
                                                <ArrowDropDownIcon sx={{ ml: 'auto' }} />
                                            </Stack>
                                            <ColorButton
                                                onClick={() => onToggleModal('DEPOSIT')}
                                                sx={{
                                                    height: '1.8rem',
                                                    fontSize: { md: '14px', xs: '10px' },
                                                    px: { md: 2, xs: 0 },
                                                    minWidth: { md: '64px', xs: '30px' },
                                                    width: 'auto'
                                                }}
                                            >
                                                {isMobile ? <Add /> : t('deposit')}
                                            </ColorButton>
                                            {anchorBalanceEl2.current && (
                                                <Popover
                                                    open={showBalance}
                                                    anchorEl={anchorBalanceEl2.current}
                                                    onClose={handleBalanceClose}
                                                    sx={{
                                                        top: 2,
                                                        '& .MuiPopover-paper': {
                                                            bgcolor: 'background.layer3',
                                                            minWidth: 250,
                                                            width: anchorBalanceEl2.current?.clientWidth + 4,
                                                            p: 1
                                                        }
                                                    }}
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                                >
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography variant="body2">Main :</Typography>
                                                        <Typography variant="body2">
                                                            {`${fBalance(balance.amount)} ${user?.currency}`}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography variant="body2">Bonus :</Typography>
                                                        <Typography variant="body2">
                                                            {`${fBalance(balance.bonus)} ${user?.currency}`}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography variant="body2">Withdrawable :</Typography>
                                                        <Typography variant="body2">
                                                            {`${fBalance(balance.withdrawable)} ${user?.currency}`}
                                                        </Typography>
                                                    </Stack>
                                                    {!!balance.pending && (
                                                        <Stack direction="row" justifyContent="space-between">
                                                            <Typography variant="body2">Pending :</Typography>
                                                            <Typography variant="body2">
                                                                {`${fBalance(balance.pending)} ${user?.currency}`}
                                                            </Typography>
                                                        </Stack>
                                                    )}
                                                </Popover>
                                            )}
                                        </Stack>
                                    </>
                                )}
                                {!isLogined && (
                                    <>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                color: 'text.primary',
                                                border: '2px solid #e4eaf019',
                                                px: '1rem',
                                                height: { xs: '2.25rem', sm: '2.5rem' },
                                                textTransform: 'uppercase',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                    borderColor: '#e4eaf019',
                                                    boxShadow: 'none'
                                                }
                                            }}
                                            onClick={() => onToggleModal('SIGNIN')}
                                        >
                                            {t('login')}
                                        </Button>
                                        <ColorButton
                                            sx={{ height: { xs: '2.25rem', sm: '2.5rem' } }}
                                            onClick={() => onToggleModal('SIGNUP')}
                                        >
                                            {t('register')}
                                        </ColorButton>
                                    </>
                                )}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: 2,
                                        gap: { md: 1, xs: 0.5 }
                                    }}
                                >
                                    {!isMobile && (
                                        <IconButton sx={commonButtonStyle} onClick={() => onToggleModal('LANGUAGE')}>
                                            <WorldIcon sx={{ color: 'text.secondary' }} />
                                        </IconButton>
                                    )}
                                    {isLogined && (
                                        <IconButton sx={commonButtonStyle} onClick={onHandleNotification}>
                                            <Badge badgeContent={notification.count} color="error">
                                                <NotificationsIcon sx={{ color: 'text.secondary' }} />
                                            </Badge>
                                        </IconButton>
                                    )}
                                </Box>
                                {isLogined && <AccountPopover />}
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Header;
