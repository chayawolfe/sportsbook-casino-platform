import { useEffect, useState } from 'react';
import { getSlotGames } from 'api';
import { Box } from '@mui/material';

import CustomSwiper from 'components/swiper';
import GameCard from 'components/game-card';
import { ASSETS } from 'utils/axios';

interface CustomSwiperProps {
    category: string;
    categoryName: string;
    viewCount?: number;
}

export const SlotGames = ({ category, categoryName, viewCount }: CustomSwiperProps) => {
    const [games, setGames] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getGameList = async () => {
        try {
            setLoading(true);
            const query: any = {
                currentPage: 1,
                perPage: 30
            };
            if (category == 'HOT_GAME') {
                query.categoryCodes = ['AG_HOT_PG'];
            } else {
                query.categoryCodes = ['AG_PP'];
            }

            const gameList = await getSlotGames(query);
            setGames(gameList.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getGameList();
    }, []);
    return (
        <CustomSwiper
            index={category}
            category={categoryName}
            loading={loading}
            data={games.map((item: any, index: number) => (
                <Box
                    key={index}
                    sx={{
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}
                >
                    <GameCard
                        key={index}
                        image={ASSETS(item.ownImg ? item.ownImg : `${item.gameCode}.webp`)}
                        name={item.gameName}
                        href={`/ag-game/${item.gameCode}`}
                    />
                </Box>
            ))}
            title={categoryName}
            viewCount={viewCount ? viewCount : 6}
        />
    );
};
