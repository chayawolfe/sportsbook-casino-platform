import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { playerApi } from 'api/player.api';
import GameCard from 'components/game-card';
import CustomSwiper from 'components/swiper';
import { ASSETS } from 'utils/axios';
import { useAuth } from 'hooks/use-auth-context';

interface CustomSwiperProps {
    viewCount?: number;
}

export default function PlayerGames({ viewCount }: CustomSwiperProps) {
    const { isLogined } = useAuth();
    const [games, setGames] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getGameList = async () => {
        try {
            setLoading(true);
            const gameList = await playerApi.getPlayerGames();

            setGames(gameList);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLogined) {
            getGameList();
        }
        // eslint-disable-next-line
    }, [isLogined]);

    if (!games.length) return null;

    return (
        <CustomSwiper
            category={'your-games'}
            index={'your-games'}
            loading={loading}
            data={games.map((item: any, index: number) => (
                <Box key={index} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <GameCard
                        key={index}
                        image={
                            item.gameDetails.ownImg
                                ? ASSETS(item.gameDetails.ownImg)
                                : item.gameDetails.image_url || ASSETS(`${item.gameDetails.gameCode}.png`)
                        }
                        name={item.gameDetails.game_name || item.gameDetails.gameName}
                        href={
                            item.gameDetails.gameCode
                                ? `/ag-game/${item.gameDetails.gameCode}`
                                : `/game/${item.gameDetails.game_code}`
                        }
                    />
                </Box>
            ))}
            title={'your-games'}
            viewCount={viewCount ? viewCount : 8}
        />
    );
}
