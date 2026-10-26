import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { Box, MenuItem, Paper, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { _statisticsDetails } from '_mock';
import EmptyData from 'components/empty-data';
import { RHFSelect } from 'components/hook-form';
import { AuthContext } from 'context/auth/auth-context';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const commonPaperStyles = {
    p: 1.5,
    bgcolor: 'background.layer2',
    borderRadius: 3
};

const commonHeaderStyles = {
    mb: 1.5,
    fontSize: 16
};

const commonStatBoxStyles = {
    height: '4.375rem',
    bgcolor: 'background.layer5',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    pt: 1,
    overflow: 'hidden'
};

const stats = [
    { icon: '/assets/icons/wins.svg', label: 'Total Wins', value: '0' },
    { icon: '/assets/icons/bet.svg', label: 'Total Bets', value: '0' },
    { icon: '/assets/icons/wagered.svg', label: 'Total Wagered', value: 'RUB&nbsp;0.00' }
];

const StatisticsDetails = () => {
    const auth = useContext(AuthContext);
    const user = auth?.user;

    const defaultValues = {
        detail: _statisticsDetails[0].value
    };

    const methods = useForm({
        defaultValues
    });

    return (
        <Stack direction="column" gap={1}>
            <FormProvider {...methods}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
                    <RHFSelect
                        name="detail"
                        size="small"
                        PaperPropsSx={{
                            bgcolor: 'background.layer1',
                            '& .MuiMenuItem-root': {
                                fontSize: 14,
                                padding: '8px 16px',
                                '&:hover': {
                                    bgcolor: 'action.hover'
                                }
                            }
                        }}
                        sx={{
                            '& .MuiInputBase-input': {
                                bgcolor: 'background.layer1'
                            }
                        }}
                    >
                        {_statisticsDetails.map((item, index) => (
                            <MenuItem key={index} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </RHFSelect>

                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <Avatar
                            src={user?.avatar}
                            alt={user?.name}
                            sx={{
                                width: 40,
                                height: 40,
                                border: (theme) => `solid 2px ${theme.palette.background.default}`
                            }}
                        >
                            {user?.name?.charAt(0).toUpperCase()}
                        </Avatar>

                        <Typography variant="body2" fontWeight="bold">
                            {user?.name}
                        </Typography>
                    </Stack>
                </Stack>

                <Paper sx={commonPaperStyles}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={commonHeaderStyles}>
                        <Stack direction="row" alignItems="center" gap={0.5}>
                            <AutoGraphIcon sx={{ fontSize: 20 }} />
                            <Typography variant="inherit" fontWeight="bold" ml={0.5}>
                                Statistics
                            </Typography>
                        </Stack>
                    </Stack>
                    <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', opacity: 0.2 }} />

                    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1.5 }}>
                        {stats.map((stat, index) => (
                            <Box
                                key={index}
                                sx={{
                                    ...commonStatBoxStyles,
                                    width: index === 2 ? '100%' : 'calc(50% - 0.5rem)'
                                }}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ width: '100%' }}
                                >
                                    <Box
                                        component="img"
                                        src={stat.icon}
                                        sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
                                    />
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                                        {stat.label}
                                    </Typography>
                                </Stack>
                                <Typography
                                    sx={{ textAlign: 'center', fontWeight: 600, fontSize: '1.125rem', mt: 0.5 }}
                                    dangerouslySetInnerHTML={{ __html: stat.value }}
                                />
                            </Box>
                        ))}
                    </Stack>
                </Paper>

                <Paper sx={commonPaperStyles}>
                    <EmptyData />
                </Paper>
            </FormProvider>
        </Stack>
    );
};

export default StatisticsDetails;
