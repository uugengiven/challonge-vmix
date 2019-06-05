const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();

const tournament = 'replayfx20190531'
const username = process.env.CH_USERNAME
const api_key = process.env.CH_API_KEY
const api = `https://${username}:${api_key}@api.challonge.com/v1/tournaments/${tournament}`

const match_api = `${api}/matches.json`
const user_api = `${api}/participants.json`

let users = []

console.log(username)
console.log(api_key)

const start = async () => {
    const matches_res = await axios.get(match_api)
    const matches = matches_res.data

    const users_res = await axios.get(user_api)
    users = users_res.data
    
    for(let i = 0; i < matches.length; i++)
    {
        matches[i].match.player1_name = get_name(matches[i].match.player1_id)
        matches[i].match.player2_name = get_name(matches[i].match.player2_id)
    }

    console.log(matches)
}

const get_name = id => {
    const participant = users.find(x => x.participant.id === id)
    console.log(participant)
    return participant.participant.name
}

start();