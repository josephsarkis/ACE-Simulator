const TEAMS_DATA = [
    {
        "name": "AFC Bournemouth",
        "price": 4.81,
        "win_prob": 0.345252774352651,
        "lose_prob": 0.3884093711467324,
        "draw_prob": 0.26633785450061653,
        "win_gain": 0.879,
        "lose_loss": 0.481
    },
    {
        "name": "Arsenal FC",
        "price": 10.21,
        "win_prob": 0.762188444522318,
        "lose_prob": 0.07748915852643566,
        "draw_prob": 0.16032239695124628,
        "win_gain": 0.541,
        "lose_loss": 1.0210000000000001
    },
    {
        "name": "Aston Villa FC",
        "price": 8.79,
        "win_prob": 0.3884093711467324,
        "lose_prob": 0.345252774352651,
        "draw_prob": 0.26633785450061653,
        "win_gain": 0.481,
        "lose_loss": 0.879
    },
    {
        "name": "Brentford FC",
        "price": 4.45,
        "win_prob": 0.2457791309161362,
        "lose_prob": 0.498200941046222,
        "draw_prob": 0.25601992803764184,
        "win_gain": 0.431,
        "lose_loss": 0.44500000000000006
    },
    {
        "name": "Brighton & Hove Albion FC",
        "price": 4.25,
        "win_prob": 0.47646057855927393,
        "lose_prob": 0.25808281338627337,
        "draw_prob": 0.2654566080544527,
        "win_gain": 0.326,
        "lose_loss": 0.42500000000000004
    },
    {
        "name": "Burnley FC",
        "price": 1.4,
        "win_prob": 0.2860022170714502,
        "lose_prob": 0.4323289327824247,
        "draw_prob": 0.2816688501461251,
        "win_gain": 0.259,
        "lose_loss": 0.13999999999999999
    },
    {
        "name": "Chelsea FC",
        "price": 6.36,
        "win_prob": 0.5468942289008356,
        "lose_prob": 0.21471597901418485,
        "draw_prob": 0.23838979208497957,
        "win_gain": 0.094,
        "lose_loss": 0.6360000000000001
    },
    {
        "name": "Crystal Palace FC",
        "price": 3.26,
        "win_prob": 0.25808281338627337,
        "lose_prob": 0.47646057855927393,
        "draw_prob": 0.2654566080544527,
        "win_gain": 0.42500000000000004,
        "lose_loss": 0.326
    },
    {
        "name": "Everton FC",
        "price": 5.42,
        "win_prob": 0.2552721430006025,
        "lose_prob": 0.4482827877083752,
        "draw_prob": 0.2964450692910223,
        "win_gain": 0.45599999999999996,
        "lose_loss": 0.542
    },
    {
        "name": "Fulham FC",
        "price": 4.56,
        "win_prob": 0.4482827877083752,
        "lose_prob": 0.2552721430006025,
        "draw_prob": 0.2964450692910223,
        "win_gain": 0.542,
        "lose_loss": 0.45599999999999996
    },
    {
        "name": "Leeds United FC",
        "price": 3.65,
        "win_prob": 0.4248366013071895,
        "lose_prob": 0.2875816993464052,
        "draw_prob": 0.2875816993464053,
        "win_gain": 0.31400000000000006,
        "lose_loss": 0.365
    },
    {
        "name": "Liverpool FC",
        "price": 5.89,
        "win_prob": 0.40399918384003264,
        "lose_prob": 0.3378902264843909,
        "draw_prob": 0.25811058967557643,
        "win_gain": 0.8119999999999999,
        "lose_loss": 0.589
    },
    {
        "name": "Manchester City FC",
        "price": 8.12,
        "win_prob": 0.3378902264843909,
        "lose_prob": 0.40399918384003264,
        "draw_prob": 0.25811058967557643,
        "win_gain": 0.589,
        "lose_loss": 0.8119999999999999
    },
    {
        "name": "Manchester United FC",
        "price": 8.77,
        "win_prob": 0.5728314238952538,
        "lose_prob": 0.20621931260229137,
        "draw_prob": 0.2209492635024548,
        "win_gain": 0.367,
        "lose_loss": 0.877
    },
    {
        "name": "Newcastle United FC",
        "price": 4.31,
        "win_prob": 0.498200941046222,
        "lose_prob": 0.2457791309161362,
        "draw_prob": 0.25601992803764184,
        "win_gain": 0.44500000000000006,
        "lose_loss": 0.431
    },
    {
        "name": "Nottingham Forest FC",
        "price": 3.14,
        "win_prob": 0.2875816993464052,
        "lose_prob": 0.4248366013071895,
        "draw_prob": 0.2875816993464053,
        "win_gain": 0.365,
        "lose_loss": 0.31400000000000006
    },
    {
        "name": "Sunderland AFC",
        "price": 5.41,
        "win_prob": 0.07748915852643566,
        "lose_prob": 0.762188444522318,
        "draw_prob": 0.16032239695124628,
        "win_gain": 1.0210000000000001,
        "lose_loss": 0.541
    },
    {
        "name": "Tottenham Hotspur FC",
        "price": 3.67,
        "win_prob": 0.20621931260229137,
        "lose_prob": 0.5728314238952538,
        "draw_prob": 0.2209492635024548,
        "win_gain": 0.877,
        "lose_loss": 0.367
    },
    {
        "name": "West Ham United FC",
        "price": 2.59,
        "win_prob": 0.4323289327824247,
        "lose_prob": 0.2860022170714502,
        "draw_prob": 0.2816688501461251,
        "win_gain": 0.13999999999999999,
        "lose_loss": 0.259
    },
    {
        "name": "Wolverhampton Wanderers FC",
        "price": 0.94,
        "win_prob": 0.21471597901418485,
        "lose_prob": 0.5468942289008356,
        "draw_prob": 0.23838979208497957,
        "win_gain": 0.6360000000000001,
        "lose_loss": 0.094
    }
];