const { query } = require('express')
const express = require('express')
const app = express()
const RiotKey = 'RGAPI-052aabec-45ff-4aaa-bccd-fb539765d534'
const sp = '%20'
const fetch = require("node-fetch")

app.set('view engine', 'ejs')

app.use(express.static( "emblems" ));

//Loads main page with 300 players
app.get("/", async (req, res, next) => {
    const link = `https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${RiotKey}`
    const response = await fetch(link);
    let data = await response.json();
    data.entries.sort((a, b) => (a.leaguePoints < b.leaguePoints) ? 1 : -1)
    res.render('index', {data: data}); //<---
    
    });
/*
//Loads individual username routes
fetch(`https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${RiotKey}`)
    .then(res => res.json())
    .then((data) => {
        for(i = 0; i < data.entries.length; i++){
            const sumName = data.entries[i].summonerName;
            app.get(`/${sumName}`, (req, res) => {
                //if you need to, fetch the data again like you did in the above app.get()
                res.send("Summoner name: ");
            });
        }
    })
     //.catch(handleErrors);*/


const summonerRouter = require('./routes/summoners')
app.use("/summoners", summonerRouter)


app.listen(3000)