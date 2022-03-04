(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//use npm run build (check package.json for this command) after making changes
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

},{"node-fetch":2}],2:[function(require,module,exports){
(function (global){(function (){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
