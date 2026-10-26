import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, IconButton, Paper, Stack, Typography } from '@mui/material';
// api
import { getBonusById } from 'api';
// routes
import { useParams } from 'routes/hook';
// utils
import { ASSETS } from 'utils/axios';
// components
import { LoadingScreen } from 'components/loading-screen';
import { useSettingsContext } from 'components/settings';
// types
import { IBonusData } from 'types/bonus';

export default function BonusDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { onToggleModal } = useSettingsContext();

    const [loading, setLoading] = useState(false);
    const [bonusData, setBonusData] = useState<IBonusData | null>(null);

    const getBonus = async () => {
        if (id) {
            try {
                setLoading(true);
                const response = await getBonusById(id);
                setBonusData(response);
            } catch (error: any) {
                console.log('Get Bonus by ID Error:', error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (id) {
            getBonus();
        }
    }, [id]);

    return (
        <Stack sx={{ width: '100%' }} alignItems="center" justifyContent="center">
            <Stack justifyContent="start" alignItems="center" flexDirection="row" width="100%">
                <IconButton onClick={() => navigate('/bonus')}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography color="primary" variant="h4">
                    Details
                </Typography>
            </Stack>
            {loading ? (
                <Stack sx={{ minHeight: 400, width: '100%' }}>
                    <LoadingScreen />
                </Stack>
            ) : (
                <Paper
                    sx={{
                        width: '100%',
                        maxWidth: 800,
                        margin: '32px 0',
                        bgcolor: 'background.layer3',
                        borderRadius: 3,
                        overflow: 'hidden',
                        color: '#fff',
                        boxShadow: 6
                    }}
                >
                    <Box
                        component="img"
                        src={bonusData ? ASSETS(bonusData?.banner) : ''}
                        alt="Returning Deposit Bonus"
                        sx={{
                            width: '100%',
                            height: 300,
                            objectFit: 'cover',
                            display: 'block'
                        }}
                    />
                    <Box sx={{ p: 4, color: 'text.primary' }}>
                        {parse(bonusData?.description || '')}
                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            sx={{
                                color: '#23262F',
                                fontWeight: 700,
                                fontSize: 16,
                                textTransform: 'none',
                                boxShadow: 'none'
                            }}
                            onClick={() => onToggleModal('DEPOSIT')}
                        >
                            Deposit Now
                        </Button>
                    </Box>
                </Paper>
            )}
        </Stack>
    );
}
