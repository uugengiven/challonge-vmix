## BRACKET READER

This is a small shim to gather challonge API data in a single call, rather than two separate calls (one for the matches of a tournament, one for the participants). This will be used by vMix as a datasource so participants can be listed properly on screen.

This is still untested in vMix itself, but now flattens the matches some and updates players names so they exist. If other info must be added/stripped, it should be easy to do. Guess we'll see in vmix.

Don't forget to update your .env file to include the needful.

How Challonge sends matches
```
[
    {match: ...matchinfo},
    {match: ...matchinfo},
    {match: ...matchinfo}
]
```

How this shim sends matches
```
[
    {
        match_id: ...,
        player1_id: ...,
        player2_id: ...,
        player1_name: ...
    },
    {
        match_id: ...,
        player1_id: ...,
        player2_id: ...,
        player1_name: ...
    }
]
```