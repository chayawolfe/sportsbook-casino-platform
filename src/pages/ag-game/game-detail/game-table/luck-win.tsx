import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface WinPlayer {
    player: string;
    payout: number;
    wager: number;
    multi: number;
}

const StyledTableContainer = styled(TableContainer)({
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: '#323738',
    '& .MuiTableCell-root': {
        fontSize: 14,
        fontWeight: 600,
        padding: '12px 16px',
        border: '1px solid transparent',
        backgroundColor: 'transparent'
    },
    '& .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd)': {
        backgroundColor: '#3a4142'
    }
});

const LuckyWin = ({ data }: { data: WinPlayer[] }) => {
    const rankIcons = ['/assets/icons/rank-1.svg', '/assets/icons/rank-2.svg', '/assets/icons/rank-3.svg'];

    return (
        <Box
            sx={{
                borderRadius: 2,
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
                                <TableCell>Player</TableCell>
                                <TableCell>Payout</TableCell>
                                <TableCell>Wager</TableCell>
                                <TableCell>Multi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Stack direction="row" alignItems="center" gap={1}>
                                            <Box
                                                component="img"
                                                src={rankIcons[index]}
                                                alt={(index + 1).toString()}
                                                sx={{ width: 24, height: 24 }}
                                            />
                                            <Typography variant="inherit" noWrap>
                                                {item.player}
                                            </Typography>
                                        </Stack>
                                    </TableCell>

                                    <TableCell>
                                        <Stack direction="row" alignItems="center" gap={0.5}>
                                            <Box
                                                component="img"
                                                src="/assets/images/coins/NGN.webp"
                                                alt="currency"
                                                sx={{ width: 16, height: 16 }}
                                            />
                                            <Typography variant="inherit" color="primary.main" noWrap>
                                                +{item.payout}
                                            </Typography>
                                        </Stack>
                                    </TableCell>

                                    <TableCell>
                                        <Stack direction="row" alignItems="center" gap={0.5}>
                                            <Box
                                                component="img"
                                                src="/assets/images/coins/NGN.webp"
                                                alt="currency"
                                                sx={{ width: 16, height: 16 }}
                                            />
                                            <Typography variant="inherit" noWrap>
                                                {item.wager}
                                            </Typography>
                                        </Stack>
                                    </TableCell>

                                    <TableCell>
                                        <Stack direction="row" alignItems="center">
                                            <Typography variant="inherit" noWrap>
                                                {item.multi}X
                                            </Typography>
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

export default LuckyWin;
