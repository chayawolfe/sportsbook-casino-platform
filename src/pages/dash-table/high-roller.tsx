import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { t } from 'i18next';
import { useTranslate } from 'locales';

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
    // backgroundColor: theme.palette.background.tableContainer,
    '& .MuiTableCell-root': {
        padding: '12px 16px',
        border: '1px solid transparent',
        backgroundColor: 'transparent'
    },
    '& .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd)': {
        // backgroundColor: theme.palette.background.layer5
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
    const { t } = useTranslate();
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
                            <TableRow
                                sx={{
                                    bgcolor: 'background.tableContainer',
                                    '& th': {
                                        color: 'text.secondary',
                                        fontWeight: 700,
                                        fontSize: '16px',
                                        borderBottom: 'none',
                                        padding: '12px 16px'
                                    }
                                }}
                            >
                                <TableCell sx={{ width: { xs: '30%', sm: 'auto' } }}>{t('game.title')}</TableCell>
                                <TableCell>{t('player')}</TableCell>
                                <TableCell>{t('betAmount')}</TableCell>
                                <TableCell sx={{ width: { xs: '96px', sm: 'auto' } }}>{t('multiplier')}</TableCell>
                                <TableCell sx={{ textAlign: 'right' }}>{t('profit')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        sx={(theme) => ({
                                            width: { xs: '30%', sm: 'auto' },
                                            borderBottom: '1px solid!important',
                                            borderBottomColor: `${theme.palette.background.layer3}!important`
                                        })}
                                    >
                                        <StyledLink to={`/game-detail/${item.gameId}`}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <GameIcon src={item.gameIcon} alt={item.gameName} sx={{ mr: 1 }} />
                                                <Typography variant="inherit" noWrap>
                                                    {item.gameName}
                                                </Typography>
                                            </Box>
                                        </StyledLink>
                                    </TableCell>
                                    <TableCell
                                        sx={(theme) => ({
                                            borderBottom: '1px solid!important',
                                            borderBottomColor: `${theme.palette.background.layer3}!important`
                                        })}
                                    >
                                        {item.player.isHidden ? (
                                            <Typography variant="inherit" color="text.secondary">
                                                {t('hidden')}
                                            </Typography>
                                        ) : (
                                            <StyledLink to={`/user/profile/${item.player.id}`}>
                                                {item.player.name}
                                            </StyledLink>
                                        )}
                                    </TableCell>
                                    <TableCell
                                        sx={(theme) => ({
                                            borderBottom: '1px solid!important',
                                            borderBottomColor: `${theme.palette.background.layer3}!important`
                                        })}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="inherit" noWrap>
                                                {item.betAmount}
                                            </Typography>
                                            <CurrencyIcon src={item.currencyIcon} alt={item.currency} sx={{ ml: 1 }} />
                                        </Box>
                                    </TableCell>
                                    <TableCell
                                        sx={(theme) => ({
                                            width: { xs: '96px', sm: 'auto' },
                                            borderBottom: '1px solid!important',
                                            borderBottomColor: `${theme.palette.background.layer3}!important`
                                        })}
                                    >
                                        {item.multiplier}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={(theme) => ({
                                            fontWeight: 600,
                                            borderBottom: '1px solid!important',
                                            borderBottomColor: `${theme.palette.background.layer3}!important`
                                        })}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <Typography variant="inherit" noWrap>
                                                {item.profit}
                                            </Typography>
                                            <CurrencyIcon src={item.currencyIcon} alt={item.currency} sx={{ ml: 1 }} />
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
