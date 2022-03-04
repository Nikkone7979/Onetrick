const express = require('express')
const router = express.Router() //mini app

const RiotKey = 'RGAPI-052aabec-45ff-4aaa-bccd-fb539765d534'
const sp = '%20'
const fetch = require("node-fetch")

router.get("/", (req, res)=> {
    res.send("Empty user list")
})

//DYNAMIC PARAMETER
router.get("/:id", async (req, res) => {
    const response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.id}?api_key=${RiotKey}`);
    let data = await response.json()
    const response2 = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}?api_key=${RiotKey}`);
    let rankData = await response2.json();
    const response3 = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${data.puuid}/ids?start=0&count=20`,
    {   credentials: 'include',
        headers: {"X-Riot-Token": "RGAPI-052aabec-45ff-4aaa-bccd-fb539765d534"}})
    let matchHistory = await response3.json()
    console.log(matchHistory[0])
    res.render('summoners', {
        data: data,
        rankData: rankData})
    //res.send(`Get user with ${req.params.id}`)

})

/*router.param("id", async (req, res, next, id) => {
    const link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${id}?api_key=${RiotKey}`
    const response = await fetch(link);
    let data = await response.json();
    //console.log(data)
    res.send(data.name + " " + data.id)
})*/

module.exports = router