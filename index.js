const axios = require('axios')
const dotenv = require('dotenv')
var http = require('http')

const teams = [
    {name: "The Salt Shakers", img: "saltshakers.png" },
    {name: "FGIF", img: "fgif.png" },
    {name: "Northern Lights", img: "northern.png" },
    {name: "#breathe", img: "breathe.png"},
    {name: "Culpable Gaming", img: "culpable.jpg"},
    {name: "exc!tement", img: "excitement.png"},
    {name: "Clurd Nern ErSpurts", img: "Clurd_Nern_Logo.png"},
    {name: "Ronin Gold", img: "ronin.png.png"},
    {name: "Team Worm", img: "Team Worm.png"},
    {name: "Aeronautics", img: "aeronautics.jpeg"}
]

dotenv.config()

const port = process.env.PORT
const username = process.env.CH_USERNAME
const api_key = process.env.CH_API_KEY
const api = `https://${username}:${api_key}@api.challonge.com/v1/tournaments`


let users = []

console.log(username)
console.log(api_key)

const start = async (req, res) => {
    const full_api = `${api}${req.url}`
    if(req.url === '/favicon.ico')
    {
        return res.end('stop it')
    }
    const match_api = `${full_api}/matches.json`
    const user_api = `${full_api}/participants.json`

    const matches_res = await axios.get(match_api)
    const matches = matches_res.data

    const users_res = await axios.get(user_api)
    users = users_res.data
    
    const results = matches.map(row => {
        row.match.player1_win_1 = "c://rllogo//empty pip.png"
        row.match.player1_win_2 = "c://rllogo//empty pip.png"
        row.match.player1_win_3 = "c://rllogo//empty pip.png"        
        row.match.player1_win_4 = "c://rllogo//empty pip.png"
        row.match.player2_win_1 = "c://rllogo//empty pip.png"
        row.match.player2_win_2 = "c://rllogo//empty pip.png"
        row.match.player2_win_3 = "c://rllogo//empty pip.png"
        row.match.player2_win_4 = "c://rllogo//empty pip.png"

        if(row.match.scores_csv != "")
        {
            let scores = row.match.scores_csv.split(",")
            player1wins = 1
            player2wins = 1
            for(let i = 0; i < scores.length; i++)
            {
                player1 = Number(scores[i].split("-")[0])
                player2 = Number(scores[i].split("-")[1])
                if(player1 > player2)
                {
                    row.match["player1_win_" + (player1wins++)] = "c://rllogo//win pip.png"
                }
                else if (player2 > player1)
                {
                    row.match["player2_win_" + (player2wins++)] = "c://rllogo//win pip.png"
                }
            }
        }
        row.match.player1_name = get_name(row.match.player1_id)
        row.match.player1_logo = get_logo(row.match.player1_name)
        row.match.player2_name = get_name(row.match.player2_id)
        row.match.player2_logo = get_logo(row.match.player2_name)
        return row.match
    })

        
    res.end(JSON.stringify(results))
}

const get_logo = name => {
    const logo = teams.find(x => x.name === name)
    if(logo === null || logo === undefined)
    {
        return 'c:\\rllogo\\default.png'
    }
    return (`c:\\rllogo\\` + logo.img)
}

const get_name = id => {
    const participant = users.find(x => x.participant.id === id)
    if(participant === null || participant === undefined)
    {
        return null
    }
    return participant.participant.name
}

http.createServer(start).listen(port, (err) => {
    if (err) {
        return console.log("POOP", err)
    }
    
    console.log(`Listening on ${port}`)
})
