import { useEffect, useState } from 'react';
import { useParams } from 'routes/hook';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// api
import { getAgGameDetails } from 'api';
// pages
import DashTable from 'pages/dash-table';
// components
import RecommendSlider from 'components/recommend-game';
//
import GameDetail from './game-detail';
import GameContainer from './game-container';

const CERTIFICATIONS = [
    '/assets/images/certification/18.png',
    '/assets/images/certification/crypto-gambling.png',
    '/assets/images/certification/itech.png',
    '/assets/images/certification/gcb.png',
    '/assets/images/certification/pci.png'
];

const AgGamePage = () => {
    const { gameCode } = useParams();
    const [gameData, setGameData] = useState<any>({});

    const getDetail = async () => {
        try {
            const response = await getAgGameDetails(`${gameCode}`);
            setGameData(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (gameCode) {
            getDetail();
        }
    }, [gameCode]);

    return (
        <Stack direction="column" spacing={3}>
            <GameContainer gameData={gameData} gameCode={`${gameCode}`} />

            <GameDetail gameData={gameData} />

            <RecommendSlider />

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
        </Stack>
    );
};

export default AgGamePage;
