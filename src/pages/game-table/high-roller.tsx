import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

interface BetData {
    gameId: string;
    gameName: string;
    gameIcon: string;
    player: {
        id?: string;
        name: string;
        isHidden?: boolean;
    };
    betAmount: string;
    currency: string;
    currencyIcon: string;
    multiplier: string;
    profit: string;
    isWin: boolean;
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    fontSize: '14px',
    backgroundColor: theme.palette.background.layer2,
    '& .MuiTableCell-root': {
        padding: '12px 16px',
        border: '1px solid transparent',
        backgroundColor: 'transparent'
    },
    '& .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.layer3
    }
}));

const StyledLink = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
        textDecoration: 'underline'
    }
}));

const GameIcon = styled('img')({
    width: '20px',
    height: '20px',
    marginRight: '4px'
});

const CurrencyIcon = styled('img')({
    width: '20px',
    height: '20px',
    marginLeft: '4px',
    flexShrink: 0
});

const HighRoller = ({ data }: { data: BetData[] }) => {
    return (
        <Box
            sx={{
                borderRadius: 2,
                height: '525px',
                mt: 1.5,
                color: 'text.secondary',
                overflow: 'hidden'
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <StyledTableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: { xs: '30%', sm: 'auto' } }}>Game</TableCell>
                                <TableCell>Player</TableCell>
                                <TableCell>Bet Amount</TableCell>
                                <TableCell sx={{ width: { xs: '96px', sm: 'auto' } }}>Multiplier</TableCell>
                                <TableCell sx={{ textAlign: 'right' }}>Profit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ width: { xs: '30%', sm: 'auto' } }}>
                                        <StyledLink to={`/game-detail/${item.gameId}`}>
                                            <GameIcon src={item.gameIcon} alt={item.gameName} />
                                            <Typography variant="inherit" noWrap>
                                                {item.gameName}
                                            </Typography>
                                        </StyledLink>
                                    </TableCell>
                                    <TableCell>
                                        {item.player.isHidden ? (
                                            <Typography variant="inherit" color="text.secondary">
                                                Hidden
                                            </Typography>
                                        ) : (
                                            <StyledLink to={`/user/profile/${item.player.id}`}>
                                                {item.player.name}
                                            </StyledLink>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="inherit" noWrap>
                                                {item.betAmount}
                                            </Typography>
                                            <CurrencyIcon src={item.currencyIcon} alt={item.currency} />
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ width: { xs: '96px', sm: 'auto' } }}>{item.multiplier}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end',
                                                color: item.isWin ? 'success.main' : 'text.secondary'
                                            }}
                                        >
                                            <Typography variant="inherit" noWrap>
                                                {item.profit}
                                            </Typography>
                                            <CurrencyIcon src={item.currencyIcon} alt={item.currency} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            </Box>
        </Box>
    );
};

export default HighRoller;
