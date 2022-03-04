//use npm run build (check package.json for this command) after making changes
//this file might be deprecated, index.ejs loads server.js
const RiotKey = 'RGAPI-052aabec-45ff-4aaa-bccd-fb539765d534'
const sp = '%20'
const fetch = require("node-fetch")

async function GetSummonerByName(name){
  //turns name into link format
  while (name.includes(" ")){
    let spaceSpot = name.indexOf(" ")
    name = name.substring(0, spaceSpot) + sp + name.substring(spaceSpot + 1);
  }

  const link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${RiotKey}`
  const response = await fetch(link);
  let data = await response.json();
  let Append = document.getElementById('SummonerName');
  Append.innerHTML += ('Summoner name: ' + data.name + ' ' + '\nSummoner level: ' + data.summonerLevel);
}

async function GetChallengers(){
  const link = `https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${RiotKey}`
  const response = await fetch(link);
  let data = await response.json();
  let Append = document.getElementById('SummonerName');
  data.entries.sort((a, b) => (a.leaguePoints < b.leaguePoints) ? 1 : -1) //<--- this sorts it from highest to lowest
  for (i = 0; i < data.entries.length; i++){
    query = data.entries[i].summonerName
    Append.innerHTML += ('Rank #' + (i+1) + `: <a href="http://127.0.0.1:5500/${query}">`+  data.entries[i].summonerName + '</a> ' + 'Rank: ' + 'Challenger ' + data.entries[i].leaguePoints + ' LP<br />')
  }

}



GetChallengers()
