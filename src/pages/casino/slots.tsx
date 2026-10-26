import { useEffect, useState, useMemo } from 'react';
import { Grid, Skeleton, Stack } from '@mui/material';
import { _games } from '_mock';
import GameCard from 'components/game-card';
import { MultiSelect } from 'components/multi-select';
import Pagination from 'components/pagination';
import { SortSelect } from 'components/sort-select';
import { categoryType } from 'types/game';
import { getAgCategory, getSlotGames } from 'api';
import { ASSETS } from 'utils/axios';

const sortList = ['Popular', 'A-Z', 'Z-A', 'New'];

const Slots = ({ gameType }: { gameType: string }) => {
    const [selectedSort, setSelectedSort] = useState<string>(sortList[0]);
    const [provider, setProvider] = useState<string[]>(['All']);
    const [providerList, setProviderList] = useState<categoryType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [games, setGames] = useState<any>([]);

    const selectList = useMemo(() => {
        return providerList.map((item: any) => ({
            value: item.categoryCode,
            label: item.categoryName.replace('AG_', '')
        }));
    }, [providerList]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getCategories = async () => {
        const response = await getAgCategory();
        setProviderList(response);
    };

    const getGameList = async () => {
        try {
            setLoading(true);
            if (provider) {
                const processed = provider.length === 1 && provider[0] === 'All' ? [] : provider;

                const response = await getSlotGames({
                    currentPage: currentPage,
                    perPage: 40,
                    categoryCodes: gameType === 'SLOT' ? processed : ['AG_HOT_PG']
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

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Stack direction="column" spacing={2}>
            <Stack flexDirection="row" gap={2} alignItems="center" sx={{ mt: 2 }}>
                <SortSelect
                    size="small"
                    value={selectedSort}
                    sortList={sortList}
                    width={300}
                    setSelectedValue={setSelectedSort}
                />
                {gameType === 'SLOT' && (
                    <MultiSelect
                        size="small"
                        placeholder="Providers"
                        selectedValues={provider}
                        selectValues={setProvider}
                        list={selectList}
                    />
                )}
            </Stack>
            <Grid
                container
                spacing={1}
                sx={{
                    mt: 4,
                    display: games.length > 0 || loading ? 'grid' : 'flex',
                    gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)', md: 'repeat(8, 1fr)' }
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
        </Stack>
    );
};

export default Slots;
