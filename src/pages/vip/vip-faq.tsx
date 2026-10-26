import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Collapse, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const VipFaq = () => {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <Stack direction="column" gap={{ xs: 1.5, sm: 3 }}>
            <Typography sx={{ fontSize: { xs: 16, sm: 20 }, fontWeight: 600 }}>Frequently Asked Questions</Typography>

            <Stack direction="column" gap={1} sx={{ px: 1.5, pt: 1, bgcolor: 'background.card', borderRadius: 3 }}>
                <Stack direction="column" gap={1}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setOpen(open === 1 ? null : 1)}
                    >
                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                            What is ‘Level-up Bonus’?
                        </Typography>
                        <Button sx={{ p: 0.2, minWidth: 'auto', bgcolor: 'background.layer3' }}>
                            {open === 1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                    </Stack>
                    <Collapse in={open === 1}>
                        <Typography
                            sx={{
                                fontSize: { xs: 14, sm: 16 },
                                fontWeight: 600,
                                color: 'text.secondary',
                                lineHeight: '1.5rem'
                            }}
                        >
                            Showcasing our appreciation for players, we reward them with a Level Up bonus upon reaching
                            the next level. Once players reach Level 38 and higher, we have boosted the level-up bonus
                            to be slightly higher than the regular level-up bonus available at lower levels.
                        </Typography>
                    </Collapse>
                </Stack>

                <Stack direction="column" gap={1}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setOpen(open === 2 ? null : 2)}
                    >
                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                            What is ‘Raining’?
                        </Typography>
                        <Button sx={{ p: 0.2, minWidth: 'auto', bgcolor: 'background.layer3' }}>
                            {open === 2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                    </Stack>
                    <Collapse in={open === 2}>
                        <Stack direction="column">
                            <Typography
                                sx={{
                                    fontSize: { xs: 14, sm: 16 },
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    lineHeight: '1.5rem'
                                }}
                            >
                                Engage in chat conversations throughout the day to receive free coins as part of the
                                Constant Chat Rains bonus.
                            </Typography>

                            <Typography sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 600, color: 'text.secondary' }}>
                                Rules:
                            </Typography>
                            <Stack component="ol" sx={{ pl: 2 }}>
                                <Typography
                                    component="li"
                                    sx={{
                                        fontSize: { xs: 14, sm: 16 },
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        lineHeight: '1.5rem'
                                    }}
                                >
                                    Six players level higher than 4 will be randomly selected and rewarded in chat room
                                    every 6 hours.
                                </Typography>
                                <Typography
                                    component="li"
                                    sx={{
                                        fontSize: { xs: 14, sm: 16 },
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        lineHeight: '1.5rem'
                                    }}
                                >
                                    Bonus will be different according to the currencies.
                                </Typography>
                                <Typography
                                    component="li"
                                    sx={{
                                        fontSize: { xs: 14, sm: 16 },
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        lineHeight: '1.5rem'
                                    }}
                                >
                                    Players will be randomly selected by Rain algorithm. The players who send more
                                    messages have the higher probability to get rewarded.
                                </Typography>
                                <Typography
                                    component="li"
                                    sx={{
                                        fontSize: { xs: 14, sm: 16 },
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        lineHeight: '1.5rem'
                                    }}
                                >
                                    But even if the user has sent only one message, there is still a chance that they
                                    can receive the rain bonus.
                                </Typography>
                                <Typography
                                    component="li"
                                    sx={{
                                        fontSize: { xs: 14, sm: 16 },
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        lineHeight: '1.5rem'
                                    }}
                                >
                                    Rain information will be sent to the chat room by robots.
                                </Typography>
                                <Typography
                                    component="li"
                                    sx={{
                                        fontSize: { xs: 14, sm: 16 },
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        lineHeight: '1.5rem'
                                    }}
                                >
                                    Having more than one account per user is prohibited. You will get the lower
                                    possibility of receiving rain and Betthrob will suspend your withdrawals for a
                                    manual review in the fraud prevention system which may take up to 24 hrs. We do not
                                    guarantee withdraw processing and may ban account with your balance in it. If you
                                    have already had more than one account please self-surrender by contacting Live
                                    Support.
                                </Typography>
                            </Stack>

                            <Typography sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 600, mt: 0.5 }}>
                                For example:
                            </Typography>

                            <Stack sx={{ bgcolor: 'background.layer5', p: 2, mt: 1, borderRadius: 2 }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <img
                                        src="/assets/avatar-example-270fd554.webp"
                                        alt="avatar"
                                        style={{ width: 40, height: 40 }}
                                    />
                                    <Typography sx={{ fontWeight: 600 }}>Bet Throb</Typography>
                                </Stack>
                                <Stack sx={{ gap: 1, ml: 5, bgcolor: 'background.default', p: 2, borderRadius: 3 }}>
                                    <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                                        Raining, the people who received the rain:
                                    </Typography>
                                    <Stack sx={{ color: 'primary.main' }}>
                                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                                            @Jachk: 888TRX
                                        </Typography>
                                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                                            @Blrr: 888TRX
                                        </Typography>
                                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                                            @Pokiuutt: 888TRX
                                        </Typography>
                                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                                            @Liisdt: 888TRX
                                        </Typography>
                                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                                            @Yoiohu: 888TRX
                                        </Typography>
                                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                                            @Loidr: 888TRX
                                        </Typography>
                                    </Stack>
                                    <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                                        Congratulations!
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Collapse>
                </Stack>

                <Stack direction="column" gap={1}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setOpen(open === 3 ? null : 3)}
                    >
                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                            What is ‘Coin Drop’?
                        </Typography>
                        <Button sx={{ p: 0.2, minWidth: 'auto', bgcolor: 'background.layer3' }}>
                            {open === 3 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                    </Stack>
                    <Collapse in={open === 3}>
                        <Stack direction="column" gap={1}>
                            <Typography
                                sx={{
                                    fontSize: { xs: 14, sm: 16 },
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    lineHeight: '1.5rem'
                                }}
                            >
                                If you haven’t reached VIP Level 7 and unlocked ‘Coin Drop’, you need to be active and
                                quick in order to grab the coins when it happens in Public Chat. The rewards go to the
                                fastest participants.
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: 14, sm: 16 },
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    lineHeight: '1.5rem'
                                }}
                            >
                                Once you have reached VIP Level 7, you may create your own ‘Coin Drop’ and customize the
                                amount and quantity of recipients before you share your good luck and generosity with
                                other players in Public Chat.
                            </Typography>
                        </Stack>
                    </Collapse>
                </Stack>

                <Stack direction="column" gap={1}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setOpen(open === 4 ? null : 4)}
                    >
                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>What are ‘Tips’?</Typography>
                        <Button sx={{ p: 0.2, minWidth: 'auto', bgcolor: 'background.layer3' }}>
                            {open === 4 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                    </Stack>
                    <Collapse in={open === 4}>
                        <Typography
                            sx={{
                                fontSize: { xs: 14, sm: 16 },
                                fontWeight: 600,
                                color: 'text.secondary',
                                lineHeight: '1.5rem'
                            }}
                        >
                            You may tip other players once you reach VIP Level 8. Tipping is how you show appreciation
                            and share your generosity with other players in Bet-Throb. You can decide how much you want
                            to send to the other players.
                        </Typography>
                    </Collapse>
                </Stack>

                <Stack direction="column" gap={1}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setOpen(open === 5 ? null : 5)}
                    >
                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                            What is ‘Recharge’?
                        </Typography>
                        <Button sx={{ p: 0.2, minWidth: 'auto', bgcolor: 'background.layer3' }}>
                            {open === 5 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                    </Stack>
                    <Collapse in={open === 5}>
                        <Stack direction="column" gap={1}>
                            <Typography
                                sx={{
                                    fontSize: { xs: 14, sm: 16 },
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    lineHeight: '1.5rem'
                                }}
                            >
                                ‘Recharge’ is a unique and exciting feature that rewards players with split bonuses
                                (Recharges) throughout the week based on their gaming activities. Players can set
                                different intervals to claim these bonuses, providing them with an added incentive to
                                keep playing. This article will guide you through everything you need to know about
                                Recharge, including eligibility, how to claim, frequency options, calculation, and the
                                latest updates to the Recharge reward structure.
                            </Typography>

                            <Typography sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 600, color: 'text.secondary' }}>
                                In basic terms, ‘Recharge’ means that players receive split bonuses (Recharges)
                                throughout the week at different intervals set by the player themselves. This feature
                                not only keeps players engaged but also adds an extra layer of excitement to the gaming
                                experience.
                            </Typography>

                            <Stack direction="column">
                                <Typography
                                    sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 600, color: 'text.secondary' }}
                                >
                                    Eligibility for Recharge Activation
                                </Typography>

                                <Typography
                                    sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 600, color: 'text.secondary' }}
                                >
                                    To be eligible for Recharge Activation, players must meet the following criteria:
                                </Typography>

                                <Stack component="ol" sx={{ pl: 2 }}>
                                    <Typography
                                        component="li"
                                        sx={{
                                            fontSize: { xs: 14, sm: 16 },
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                            lineHeight: '1.5rem'
                                        }}
                                    >
                                        Have a VIP level of 22 and above
                                    </Typography>
                                    <Typography
                                        component="li"
                                        sx={{
                                            fontSize: { xs: 14, sm: 16 },
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                            lineHeight: '1.5rem'
                                        }}
                                    >
                                        Have wagered a minimum of $1,000 in the past 7 days (24/7)
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Typography sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 600, color: 'text.secondary' }}>
                                Once a player meets these requirements, they can request Recharge Activation. Upon
                                activation, their Recharge will be redeemable for the next 7 days.
                            </Typography>
                        </Stack>
                    </Collapse>
                </Stack>

                <Stack direction="column" gap={1}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setOpen(open === 6 ? null : 6)}
                    >
                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                            What is ‘Weekly Cashback’?
                        </Typography>
                        <Button sx={{ p: 0.2, minWidth: 'auto', bgcolor: 'background.layer3' }}>
                            {open === 6 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                    </Stack>
                    <Collapse in={open === 6}>
                        <Typography
                            sx={{ fontSize: 16, fontWeight: 600, color: 'text.secondary', lineHeight: '1.5rem' }}
                        >
                            The ‘Weekly Cashback’ is an exclusive perk on our platform designed for VIP 22+ players. As
                            the name suggests, this bonus is issued once a week. It is an automatic bonus paid out every
                            Friday to players at VIP level 22 and above. The size of the bonus depends on how much a
                            player has wagered during the past week with a minimum wager requirement of $1000 between
                            the period Friday-Thursday. The calculation for the weekly cashback remains the same, and
                            the only difference is that it may not align with your Recharge renewals.
                        </Typography>
                    </Collapse>
                </Stack>

                <Stack direction="column" gap={1}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setOpen(open === 7 ? null : 7)}
                    >
                        <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600 }}>
                            What is ‘Sports Weekly Bonus’?
                        </Typography>
                        <Button sx={{ p: 0.2, minWidth: 'auto', bgcolor: 'background.layer3' }}>
                            {open === 7 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                    </Stack>
                    <Collapse in={open === 7}>
                        <Stack direction="column" sx={{ pb: 1 }}>
                            <Typography
                                sx={{
                                    fontSize: { xs: 14, sm: 16 },
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    lineHeight: '1.5rem'
                                }}
                            >
                                In addition to our existing Weekly Bonus for VIP level 22+ players, we are now
                                introducing the Betthrob Sports Club weekly bonus as an additional perk for sports
                                bettors. The new Sport bonus is specific only to Sport Wager and is calculated based on
                                the player's wagering amount from Saturday to Friday, and distributed automatically
                                every Saturday. With the introduction of the Betthrob Sports Club bonuses, our VIP level
                                22+ players can now enjoy even more rewards and a thrilling sports betting experience!
                            </Typography>

                            <Typography sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 600, color: 'text.secondary' }}>
                                Betthrob Sports Club offers a range of weekend bonuses based on your weekly wager amount
                                in our Sportsbook.
                            </Typography>

                            <Stack component="ul" sx={{ pl: 2 }}>
                                <Typography
                                    component="li"
                                    sx={{
                                        fontSize: { xs: 14, sm: 16 },
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        lineHeight: '1.5rem'
                                    }}
                                >
                                    Wager $500 or more from Saturday to Friday and receive a $5 Weekend Bonus!
                                </Typography>
                                <Typography
                                    component="li"
                                    sx={{
                                        fontSize: { xs: 14, sm: 16 },
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        lineHeight: '1.5rem'
                                    }}
                                >
                                    Wager $2,500 or more and receive a $30 Weekend Bonus!
                                </Typography>
                                <Typography
                                    component="li"
                                    sx={{
                                        fontSize: { xs: 14, sm: 16 },
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        lineHeight: '1.5rem'
                                    }}
                                >
                                    Wager $5,000 or more and receive a $70 Weekend Bonus!
                                </Typography>
                                <Typography
                                    component="li"
                                    sx={{
                                        fontSize: { xs: 14, sm: 16 },
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        lineHeight: '1.5rem'
                                    }}
                                >
                                    Wager $10,000 or more and receive a $150 Weekend Bonus!
                                </Typography>
                            </Stack>

                            <Typography sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 600, color: 'text.secondary' }}>
                                These bonuses apply to all markets and odds in our Sportsbook, giving you more
                                opportunities to win big!
                            </Typography>

                            <Typography sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 600, color: 'text.secondary' }}>
                                The weekly wager is calculated from the previous Saturday 00:00hrs to Friday 23:59hrs
                                (UTC).
                            </Typography>
                        </Stack>
                    </Collapse>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default VipFaq;
