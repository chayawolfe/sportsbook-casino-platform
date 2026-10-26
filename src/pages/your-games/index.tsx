import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, Typography, Grid, Skeleton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// components
import GameCard from 'components/game-card';
// utils
import { ASSETS } from 'utils/axios';
// locales
import { useTranslate } from 'locales';
import { useAuth } from 'hooks/use-auth-context';
import { playerApi } from 'api/player.api';

const YourGames = () => {
    const { t } = useTranslate();
    const navigate = useNavigate();
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

    return (
        <>
            <Stack flexDirection="row" gap={2} alignItems="center">
                <IconButton
                    size="small"
                    sx={{ bgcolor: 'background.button1', borderRadius: 2 }}
                    onClick={() => navigate(-1)}
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <Typography variant="h6">{t(`your-games`)}</Typography>
            </Stack>
            <Grid
                container
                spacing={1}
                sx={{
                    mt: 4,
                    display: games.length > 0 || loading ? 'grid' : 'flex',
                    gridTemplateColumns: {
                        xs: 'repeat(3, 1fr)',
                        sm: 'repeat(5, 1fr)',
                        md: 'repeat(8, 1fr)'
                    }
                }}
            >
                {loading ? (
                    new Array(40).fill(null).map((_, index: number) => (
                        <Skeleton
                            key={index}
                            width="100%"
                            height="162px"
                            sx={{
                                bgcolor: 'background.button1'
                            }}
                        />
                    ))
                ) : games.length > 0 ? (
                    games.map((item: any, index: number) => (
                        <GameCard
                            key={index}
                            image={
                                item.gameDetails.ownImg
                                    ? ASSETS(item.gameDetails.ownImg)
                                    : item.gameDetails.image_url || ASSETS(`${item.gameDetails.gameCode}.webp`)
                            }
                            name={item.gameDetails.game_name || item.gameDetails.gameName}
                            href={
                                item.gameDetails.gameCode
                                    ? `/ag-game/${item.gameDetails.gameCode}`
                                    : `/game/${item.gameDetails.game_code}`
                            }
                        />
                    ))
                ) : (
                    <Stack
                        sx={{
                            py: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 1
                        }}
                    >
                        No Items
                    </Stack>
                )}
            </Grid>
        </>
    );
};

export default YourGames;
