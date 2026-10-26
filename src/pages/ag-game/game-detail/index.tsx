// @mui
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import { _gameDetail } from '_mock';

const GameDetailContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2.5),
    backgroundColor: theme.palette.background.layer3,
    borderRadius: theme.shape.borderRadius * 2
}));

const GameTitle = styled(Typography)(() => ({
    fontSize: '1.125rem',
    fontWeight: 800
}));

const GameDetail = ({ gameData }: { gameData: any }) => {
    return (
        <GameDetailContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <GameTitle>{gameData?.gameName}</GameTitle>
                    {gameData.provider && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap', mr: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                By
                            </Typography>
                            <Typography color="primary" sx={{ fontWeight: 600 }}>
                                {gameData.provider.replace('AG_', '')}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </GameDetailContainer>
    );
};

export default GameDetail;
