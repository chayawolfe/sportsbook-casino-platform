import { Stack } from '@mui/material';
import { _wagerContest } from '_mock';
import Contest from './contest';
import ContestTable from './contest-table';

const WagerContest = () => {
    return (
        <Stack direction="column">
            <Contest
                prizePool={_wagerContest.prizePool}
                timeRemaining={_wagerContest.timeRemaining}
                lastChampion={_wagerContest.lastChampion}
            />

            <ContestTable />
        </Stack>
    );
};

export default WagerContest;
