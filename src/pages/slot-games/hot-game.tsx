import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, Typography, Grid, Skeleton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import GameCard from 'components/game-card';
import Pagination from 'components/pagination';
import { SortSelect } from 'components/sort-select';
import { getSlotGames } from 'api';
import { ASSETS } from 'utils/axios';

const sortList = ['Popular', 'A-Z', 'Z-A', 'New'];

const HotGames = () => {
    const navigate = useNavigate();
    const [selectedSort, setSelectedSort] = useState<string>(sortList[0]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(10);
    const [provider, setProvider] = React.useState<string[]>(['All']);
    const [games, setGames] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getGameList = async () => {
        try {
            setLoading(true);
            if (provider) {
                const response = await getSlotGames({
                    currentPage: currentPage,
                    perPage: 40,
                    categoryCodes: ['AG_HOT_PG']
                });

                setGames(response.data);
                setTotalPages(Math.ceil(response.count / 40));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getGameList();
    }, [provider, currentPage]);

    return (
        <>
            <Stack flexDirection="row" gap={2} alignItems="center">
                <IconButton
                    size="small"
                    sx={{ bgcolor: 'background.button1', borderRadius: 2 }}
                    onClick={() => navigate('/')}
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <Typography variant="h6">Hot Games</Typography>
            </Stack>

            <Stack flexDirection="row" gap={2} alignItems="center">
                <SortSelect
                    size="small"
                    value={selectedSort}
                    sortList={sortList}
                    width={300}
                    setSelectedValue={setSelectedSort}
                />
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
                            image={ASSETS(item.ownImg ? item.ownImg : `${item.gameCode}.webp`)}
                            name={item.gameName}
                            href={`/ag-game/${item.gameCode}`}
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

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
    );
};

export default HotGames;
