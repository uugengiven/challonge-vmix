const axios = require('axios')
const dotenv = require('dotenv')
var http = require('http')

dotenv.config()

const port = process.env.PORT
const tournament = 'replayfx20190531'
const username = process.env.CH_USERNAME
const api_key = process.env.CH_API_KEY
const api = `https://${username}:${api_key}@api.challonge.com/v1/tournaments/${tournament}`

const match_api = `${api}/matches.json`
const user_api = `${api}/participants.json`

let users = []

console.log(username)
console.log(api_key)

const start = async (req, res) => {
    const matches_res = await axios.get(match_api)
    const matches = matches_res.data

    const users_res = await axios.get(user_api)
    users = users_res.data
    
    const results = matches.map(row => {
        row.match.player1_name = get_name(row.match.player1_id)
        row.match.player2_name = get_name(row.match.player2_id)
        return row.match
    })

    res.end(JSON.stringify(results))
}

const get_name = id => {
    const participant = users.find(x => x.participant.id === id)
    return participant.participant.name
}

http.createServer(start).listen(port, (err) => {
    if (err) {
        return console.log("POOP", err)
    }
    
    console.log(`Listening on ${port}`)
})
