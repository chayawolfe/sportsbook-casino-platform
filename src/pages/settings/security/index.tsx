import EmailIcon from '@mui/icons-material/Email';
import LaptopIcon from '@mui/icons-material/Laptop';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import WarningIcon from '@mui/icons-material/Warning';
import {
    Box,
    Button,
    Chip,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import ColorButton from 'components/ColorButton';
import { useState } from 'react';
import SettingModal from '../modal/verification';
import { useTranslate } from 'locales';

const SecurityPage = () => {
    const { t } = useTranslate();
    const [openSetting, setOpenSetting] = useState<string | null>(null);

    const securityItems = [
        {
            icon: <LockIcon />,
            title: t('set_password'),
            description: t('create_your_own_password_for_security'),
            buttonText: t('set_password'),
            warningIcon: true,
            onClick: () => setOpenSetting('set-password')
        },
        {
            icon: <EmailIcon />,
            title: 'Email Verification',
            description: 'Verify your email address is valid and accessible by you.',
            buttonText: 'Verify Email',
            warningIcon: true,
            onClick: () => setOpenSetting('email-verification')
        },
        {
            icon: <PhoneIcon />,
            title: 'Phone Number Verification',
            description: 'Verify your phone number is valid and accessible by you.',
            buttonText: 'Verify Phone Number',
            warningIcon: true,
            onClick: () => setOpenSetting('phone-verification')
        }
    ];

    const sessions = [
        {
            device: 'Windows 10 (Chrome 13)',
            location: 'RU',
            ip: '188.43.136.222',
            lastUsed: '9:36:33 AM'
        },
        {
            device: 'Windows 10 (Chrome 13)',
            location: 'RU',
            ip: '188.43.136.222',
            lastUsed: '3:08:17 AM'
        },
        {
            device: 'Windows 10 (Chrome 13)',
            location: 'RU',
            ip: '188.43.136.222',
            lastUsed: '3:05:49 AM'
        },
        {
            device: 'Windows 10 (Chrome 13)',
            location: 'RU',
            ip: '188.43.136.222',
            lastUsed: '3:05:11 AM'
        },
        {
            device: 'Windows 10 (Chrome 13)',
            location: 'RU',
            ip: '188.43.136.222',
            lastUsed: '4/18/2025'
        }
    ];

    return (
        <Box>
            <Paper sx={{ mb: 3, p: 3, bgcolor: 'background.layer4', borderRadius: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        pb: 2,
                        borderBottom: 1,
                        borderColor: 'divider'
                    }}
                >
                    <Typography fontWeight="bold" sx={{ fontSize: 16 }}>
                        {t('security_setup')}
                    </Typography>
                    <Chip label="Weak" color="error" size="small" sx={{ ml: 'auto' }} />
                </Box>

                <Grid container spacing={1.5}>
                    {securityItems.map((item, index) => (
                        <Grid container size={{ xs: 12, sm: 6 }} key={index} onClick={item.onClick}>
                            <Paper
                                sx={{
                                    p: 2,
                                    height: '100%',
                                    position: 'relative',
                                    width: '100%',
                                    borderRadius: 2,
                                    bgcolor: 'background.layer3'
                                }}
                            >
                                <Stack spacing={2}>
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                    >
                                        {item.icon}
                                        {item.warningIcon && <WarningIcon color="warning" />}
                                    </Box>
                                    <Typography fontWeight="bold" sx={{ fontSize: 18 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        fontWeight="bold"
                                        color="text.secondary"
                                        sx={{ fontSize: 14, minHeight: '50px' }}
                                    >
                                        {item.description}
                                    </Typography>
                                    <Box sx={{ mt: 'auto', pt: { xs: 0, sm: 2 } }}>
                                        <ColorButton sx={{ width: 1 }}>{item.buttonText}</ColorButton>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'background.layer4' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                        pb: 2,
                        borderBottom: 1,
                        borderColor: 'divider'
                    }}
                >
                    <Typography fontWeight="bold" sx={{ fontSize: 16 }}>
                        {t('sessions')}
                    </Typography>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('device')}</TableCell>
                                <TableCell>{t('location')}</TableCell>
                                <TableCell>{t('ip_address')}</TableCell>
                                <TableCell>{t('last_used')}</TableCell>
                                <TableCell align="right">{t('action')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sessions.map((session, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LaptopIcon color="primary" />
                                            <Typography fontWeight="medium">{session.device}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{session.location}</TableCell>
                                    <TableCell>{session.ip}</TableCell>
                                    <TableCell>{session.lastUsed}</TableCell>
                                    <TableCell align="right">
                                        <Button color="error">{t('remove')}</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <SettingModal open={openSetting} setOpen={setOpenSetting} />
        </Box>
    );
};

export default SecurityPage;
