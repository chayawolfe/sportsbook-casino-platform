import { Box, Typography, Paper } from '@mui/material';

const GameDescription = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: '20rem' }}>
            <Paper
                id="description"
                elevation={0}
                sx={{
                    p: 3,
                    color: 'text.primary',
                    bgcolor: 'background.layer2',
                    '&.MuiPaper-root': {
                        bgcolor: 'background.layer2'
                    },
                    '&.MuiPaper-root.dark': {
                        bgcolor: 'background.layer4'
                    },
                    borderRadius: 2
                }}
            >
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Introduction To Mahjong Ways at Bet-Throb
                </Typography>

                <Typography paragraph>
                    Mahjong is traditionally played with tiles, whereby the person able to match fourteen tiles of the
                    same suit will be victorious. However, Mahjong Ways at Bet-Throb is played much differently; there
                    are a number of traditional Mahjong tiles, each with its own payouts and a few of them even have
                    their own special features. Players can enjoy an increased winning potential through cascading
                    reels, wild symbols, scatter symbols that activate the bonus round, and even a vast number of
                    winning ways with up to 1024 paylines.
                </Typography>

                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    About Mahjong Ways at Bet-Throb
                </Typography>

                <Typography paragraph>
                    The 5-reel by 4-row grid of Mahjong Ways at Bet-Throb is placed atop a rustic and felt table with
                    wood borders. The classic Mahjong symbols are accompanied by a catchy Chinese soundtrack that draws
                    players deep into the game, it'll almost feel as though you're in the heart of China enjoying a
                    classic game of Mahjong in a bustling park or city street. Beyond the captivating atmosphere,
                    Mahjong Ways also offers players an alluring maximum winning potential of 25,000x the initial stake,
                    this alone should be reason enough for a few spins on this wondrous video slot.
                </Typography>

                <Typography paragraph>
                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        Mahjong Tiles
                    </Typography>{' '}
                    are the symbols within this video slot; each is based on the traditional tiles that have been used
                    for centuries. The low-pay symbols can include tiles with two bamboo sticks, two medallions, five
                    bamboo sticks, and five medallions offering payouts of 10x, 10x, 20x, and 20x the initial stake,
                    respectively. The medium-pay symbols can include a red and purple Chinese symbol as well as a purple
                    picture frame, bringing payouts of 40x and 60x the initial bet. The high-pay symbols consist of a
                    red and green Chinese symbol awarding generous payouts of 80x and 100x the initial stake. Players
                    should keep in mind that these payouts are awarded when landing up to five symbols of a kind either
                    horizontally or diagonally; smaller payouts can also be achieved when landing a minimum of 3 symbols
                    of a kind.
                </Typography>

                <Typography paragraph>
                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        Golden Plated Tiles
                    </Typography>{' '}
                    can occur and act as wild symbols. The gold-plated symbols are, in fact, regular pay symbols.
                    However, they act as wild symbols under the condition that these symbols have participated in
                    cascading reels. With cascading reels each time a winning combination is formed, the symbols that
                    have triggered the win will then make place for new symbols to land. Gold-plated symbols can only
                    appear on reels 2, 3, and 4. The symbols within winning positions will not be gold-plated. However,
                    each time a winning combination has formed, the value of the symbols is remembered, and once the
                    same symbol lands on the specified reels they will be gold-plated and act as a wild.
                </Typography>

                <Typography paragraph>
                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        Wild Symbols
                    </Typography>{' '}
                    of Mahjong Ways at Bet-Throb is seen as a golden ingot. The wild symbol will then substitute for all
                    regular pay symbols. This will help players form more frequent winning combinations and can even
                    increase the winning potential on each spin.
                </Typography>

                <Typography paragraph>
                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        Multipliers
                    </Typography>{' '}
                    reside atop the reels of Mahjong at Bet-Throb, this feature goes hand in hand with the cascading
                    reels feature. With each cascade of the reels, the multiplier atop the reels will increase; the
                    multiplier starts at 1x, then increases by one for each cascade, and the multiplier can reach a
                    maximum of 5x. Altogether this can help players achieve far larger wins once several winning
                    combinations land in succession.
                </Typography>

                <Typography paragraph>
                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        Mahjong Free Spins
                    </Typography>{' '}
                    are achieved once players land a minimum of three scatter symbols anywhere across the reels; players
                    will then be awarded 12 free spins. During the free spins feature, the multiplier above the reels
                    will be doubled and therefore equal 2x, 4x, 6x, and 10x respectively. Furthermore, the feature can
                    be retriggered when landing an additional 2 scatter symbols whilst the feature is active.
                </Typography>

                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Strategy For Mahjong at Bet-Throb
                </Typography>

                <Typography paragraph>
                    While the regular pay symbols of Mahjong at Bet-Throb offer far larger payouts than most modern
                    video slots. However, the most lucrative wins will still appear within the free spins round.
                    Furthermore, the multipliers placed atop the reels will also be doubled during the free spins round;
                    the opportunity for gold-plated wild symbols and regular wilds is also an option within this
                    feature. Therefore, players will find the most success once the free spins round is active. However,
                    players are recommended to stick to the middle betting ranges as it can take a while for the free
                    spins round to activate; once the feature is activated with medium bet ranges, players will be
                    stumbling upon extremely attractive wins.
                </Typography>

                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Summary
                </Typography>

                <Typography paragraph>
                    Mahjong may be a traditional and extremely old gambling game. However, PG Soft has managed to
                    introduce a new spark of life within this title through a modern slot. Mahjong Ways at Bet-Throb
                    offers many of the most popular features found within recent slot titles, from cascading reels and
                    free spins to increased winning ways up to 1024 paylines. These features together bring a breath of
                    fresh air to a timeless gambling game. Along with the maximum winning potential of 25,000x the
                    initial bet, players will find themselves spinning these reels over and over.
                </Typography>
            </Paper>
        </Box>
    );
};

export default GameDescription;
