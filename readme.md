## BRACKET READER

This is a small shim to gather challonge API data in a single call, rather than two separate calls (one for the matches of a tournament, one for the participants). This will be used by vMix as a datasource so participants can be listed properly on screen.

This does not actually fully function yet, web hosting isn't enabled or an endpoint to spit out the json. This was a quick test to verify that the object creation is correct before adding hosting.

### Todo

Add a web hosting solution that will accept in a tournament id so this can spit out the right info

Possibly flatten the info some so vmix can get at it better (matches are an array of object with all info in the match object like this)

```
[
    {match: ...matchinfo},
    {match: ...matchinfo},
    {match: ...matchinfo}
]
```

Preferably, it will look more like this when done
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