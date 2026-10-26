import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
    Stack,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
// locales
import { useTranslate } from 'locales';
// hooks
import { useSocket } from 'hooks/use-socket-context';
import { useResponsive } from 'hooks/use-responsive';

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

type IBet = {
    game: {
        game_code: string;
        image_url: string;
        game_name: string;
    };
    currencyIcon: string;
    username: string;
    currency: string;
    betAmount: number;
    profitAmount: number;
};

const LatestBet = () => {
    const { t } = useTranslate();
    const { socket } = useSocket();

    const [bets, setBets] = useState<IBet[]>([]);
    const isMobile = useResponsive('down', 'sm');

    useEffect(() => {
        if (socket) {
            socket.on('recent-bet', (data) => {
                setBets((pre) => [data, ...pre].slice(0, 10));
            });
        }

        return () => {
            if (socket) {
                socket.off('recent-bet');
            }
        };
    }, [socket]);

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
                <StyledTableContainer sx={{ overflow: 'hidden' }}>
                    <Table sx={{ tableLayout: 'fixed' }}>
                        <TableHead sx={{ width: 1 }}>
                            <TableRow
                                sx={{
                                    width: 1,
                                    bgcolor: 'background.tableContainer',
                                    '& th': {
                                        color: 'text.secondary',
                                        fontWeight: 700,
                                        fontSize: { md: 16, xs: 12 },
                                        borderBottom: 'none',
                                        p: { md: '12px 16px', xs: '4px 8px' }
                                    }
                                }}
                            >
                                <TableCell sx={{ width: { xs: '35%', sm: 'auto' } }}>{t('game.title')}</TableCell>
                                <TableCell sx={{ minWidth: { md: 170 }, width: { md: 'auto', xs: '25%' } }}>
                                    {t('player')}
                                </TableCell>
                                {!isMobile && <TableCell sx={{ minWidth: 170 }}>{t('betAmount')}</TableCell>}
                                {/* <TableCell sx={{ width: { xs: '96px', sm: 'auto' } }}>{t('multiplier')}</TableCell> */}
                                <TableCell sx={{ textAlign: 'right' }}>{t('profit')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ width: 1 }}>
                            {bets.map((item, index) => (
                                <TableRow key={index} sx={{ width: 1 }}>
                                    <TableCell
                                        sx={(theme) => ({
                                            width: { xs: '35%', sm: 'auto' },
                                            borderBottom: '1px solid!important',
                                            borderBottomColor: `${theme.palette.background.layer3}!important`
                                        })}
                                    >
                                        <StyledLink to={`/game/${item.game.game_code}`}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <GameIcon
                                                    src={item.game.image_url}
                                                    alt={item.game.game_name}
                                                    sx={{ mr: 1 }}
                                                />
                                                <Typography variant="inherit" noWrap>
                                                    {item.game.game_name}
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
                                        {/* {item.player.isHidden ? (
                                            <Typography variant="inherit" color="text.secondary">
                                                {t('hidden')}
                                            </Typography>
                                        ) : (
                                            <StyledLink to={`/user/profile/${item.player.id}`}>
                                                {item.player.name}
                                            </StyledLink>
                                        )} */}
                                        <Typography variant="inherit" color="text.secondary">
                                            {item.username}
                                        </Typography>
                                    </TableCell>
                                    {!isMobile && (
                                        <TableCell
                                            sx={(theme) => ({
                                                borderBottom: '1px solid!important',
                                                borderBottomColor: `${theme.palette.background.layer3}!important`
                                            })}
                                        >
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Typography variant="inherit" noWrap>
                                                    {item.currency}
                                                </Typography>
                                                <Typography variant="inherit" noWrap>
                                                    {item.betAmount}
                                                </Typography>
                                                <Box
                                                    component="img"
                                                    src={item.currencyIcon}
                                                    sx={{ width: 20, height: 20 }}
                                                />
                                            </Stack>
                                        </TableCell>
                                    )}
                                    <TableCell
                                        align="right"
                                        sx={(theme) => ({
                                            fontWeight: 600,
                                            borderBottom: '1px solid!important',
                                            borderBottomColor: `${theme.palette.background.layer3}!important`
                                        })}
                                    >
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="flex-end"
                                            spacing={1}
                                            sx={{ width: 1 }}
                                        >
                                            <Typography variant="inherit" noWrap>
                                                {item.currency}
                                            </Typography>
                                            <Typography variant="inherit" noWrap>
                                                {item.profitAmount}
                                            </Typography>
                                            <Box
                                                component="img"
                                                src={item.currencyIcon}
                                                sx={{ width: 20, height: 20 }}
                                            />
                                        </Stack>
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

export default LatestBet;
