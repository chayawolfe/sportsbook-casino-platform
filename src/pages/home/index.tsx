// @mui
import { Box, Stack } from '@mui/material';
// mock
import { _gameProviders, _games, _liveSports, _upcomingLotteryDraw } from '_mock';
// components
import Banner from 'components/banner';
import ShortGames from 'components/short-games';
import PlayerGames from 'components/player-games';
// swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//
import GameLink from './game-link';
import DashTable from '../dash-table';
import GameLists from './gaem-lists';
import { SlotGames } from './slot-games';

const CERTIFICATIONS = [
    '/assets/images/certification/18.png',
    '/assets/images/certification/crypto-gambling.png',
    '/assets/images/certification/itech.png',
    '/assets/images/certification/gcb.png',
    '/assets/images/certification/pci.png'
];

const Home = () => {
    return (
        <Box sx={{ overflowX: 'hidden' }}>
            <Banner />

            <GameLists />

            <GameLink />

            <PlayerGames viewCount={6} />
            <SlotGames category="HOT_GAME" categoryName="Hot Game" viewCount={6} />
            <ShortGames category="LIVE_CASINO" categoryName="Live Casino" viewCount={6} />
            <SlotGames category="SLOT" categoryName="Slots" viewCount={6} />
            <ShortGames category="FISHING" categoryName="Fishing" viewCount={6} />
            <ShortGames category="POKER" categoryName="Poker" viewCount={6} />
            <ShortGames category="OTHER" categoryName="others" viewCount={6} />

            <DashTable />

            <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: 'space-between', md: 'flex-start' }}
                spacing={{ md: 10, xs: 2 }}
                sx={{
                    mt: 3,
                    pt: 5,
                    borderTop: '1px solid',
                    borderColor: 'divider'
                }}
            >
                {CERTIFICATIONS.map((link, i) => (
                    <Box
                        key={i}
                        component="img"
                        src={link}
                        sx={{
                            height: { md: 64, xs: 32 }
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default Home;
