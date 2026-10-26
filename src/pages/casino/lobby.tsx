import { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// config
import { swiperArray } from 'config/constant';
// pages
import { SlotGames } from 'pages/home/slot-games';
// components
import ShortGames from 'components/short-games';
// api
import { playerApi } from 'api/player.api';
// hooks
import { useAuth } from 'hooks/use-auth-context';
//
import DashTable from '../dash-table';
import PlayerGames from 'components/player-games';

const CERTIFICATIONS = [
    '/assets/images/certification/18.png',
    '/assets/images/certification/crypto-gambling.png',
    '/assets/images/certification/itech.png',
    '/assets/images/certification/gcb.png',
    '/assets/images/certification/pci.png'
];

const Lobby = () => {
    const { isLogined } = useAuth();

    const [playerGames, setPlayerGames] = useState<any[]>([]);

    const loadPlayerGames = async () => {
        try {
            const data = await playerApi.getPlayerGames();
            console.log('---your game---');
            console.log(data);
            console.log('---your game---');
            setPlayerGames(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isLogined) {
            loadPlayerGames();
        }
        // eslint-disable-next-line
    }, [isLogined]);

    return (
        <Box>
            <PlayerGames viewCount={7} />

            {swiperArray.map((category, index) => {
                return category.key === 'SLOT' || category.key === 'HOT_GAME' ? (
                    <SlotGames key={index} category={category.key} categoryName={category.value} viewCount={7} />
                ) : (
                    <ShortGames key={index} category={category.key} categoryName={category.value} viewCount={7} />
                );
            })}
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

export default Lobby;
