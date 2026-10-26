import { Box, Link, Container } from '@mui/material';

const GameProviders = () => {
    return (
        <Box sx={{ width: '100%', p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap',
                    gapX: '40px',
                    '& > div': {
                        flex: '1 1 auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        gapX: '24px'
                    },
                    '& > img': {
                        minWidth: '100%',
                        height: 'auto'
                    }
                }}
            >
                <Box>
                    <Link href="https://sigma.world/" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/images/game-provider/sigma-DzhjGPHa.webp" alt="Sigma" width={94} />
                    </Link>
                    <Link href="https://www.responsiblegambling.org/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/assets/images/game-provider/responsible-gambling--34MNE2A.webp"
                            alt="Responsible Gambling"
                            width={104}
                        />
                    </Link>
                    <Link href="https://www.gamcare.org.uk/" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/images/game-provider/gamcare-ocLkkk6e.webp" alt="GamCare" width={125} />
                    </Link>
                    <Link href="https://betblocker.org" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/images/game-provider/betblocker-DBd5sP60.webp" alt="BetBlocker" width={180} />
                    </Link>
                    <Link href="/help/protect-minors" target="_self">
                        <img src="/assets/images/game-provider/18-plus-DeAQLka0.webp" alt="18 Plus" width={50} />
                    </Link>
                </Box>
                <Box sx={{ borderLeft: '1px solid', borderColor: 'divider' }}>
                    <Link href="https://themiamipc.com/home" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/images/game-provider/miami-DYQMA9xx.webp" alt="Miami" width={52} />
                    </Link>
                    <Link href="https://www.lcfc.com/" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/images/game-provider/leicester-5bY-JKgX.png" alt="Leicester" width={52} />
                    </Link>
                    <Link href="https://www.jasonderulo.com/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/assets/images/game-provider/jason_derulo-fkEa4kAk.webp"
                            alt="Jason Derulo"
                            width={100}
                        />
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default GameProviders;
