import axios from "axios";
import * as status from './constants';
import { fullMatchesAtom } from "./DataBoxState";
import { useAtom } from "jotai";

const apiKey = import.meta.env.VITE_API_KEY;
const color = 'background: mediumvioletred; color: white; font-size: 24px'
let numOfCalls = 0;

export const getPlayerInfo = async (user: string) => {
  if (!user) return;

  let url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
  const apiPrefix = "?api_key=";
  console.log(`%c ${++numOfCalls} `, color);

  try {
    let resp = await axios.get(url + user + apiPrefix + apiKey);
    return resp.data;
  } 
  catch (error: any) {
    if (error['code'] === status.ERR_CODE) console.log(status.CANT_FIND);
    if (error['code'] === status.ERR_CODE) return status.CANT_FIND;
  }
}

export const getMatchesForUser = async (userId: string) => {
  if (!userId) return;

  let count = status.GAMES_TO_SHOW;
  let url = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"
  let option = "/ids?start=0&count="
  const apiPrefix = "&api_key=";
  console.log(`%c ${++numOfCalls} `, color);

try {
    let resp = await axios.get(url + userId + option + count + apiPrefix + apiKey);
    return resp.data;
  } 
  catch (error: any) {
    if (error['code'] === status.ERR_CODE) console.log(status.API_ERR);
    if (error['code'] === status.ERR_CODE) return status.API_ERR;
  }
}

export const getMatchData = async (matchId: string) => {
  if (!matchId) return;

  let url = "https://americas.api.riotgames.com/lol/match/v5/matches/"
  const apiPrefix = "?api_key=";
  console.log(`%c ${++numOfCalls} `, color);
try {
    let resp = await axios.get(url + matchId + apiPrefix + apiKey);
    return resp.data;
  } 
  catch (error: any) {
    if (error['code'] === status.ERR_CODE) console.log(status.API_ERR, matchId);
    // if (error['code'] === status.ERR_CODE) return status.API_ERR;
  }
}

export const GetAllData = async () => {
  console.log("Starting: DATA LOAD!")

  const [localMatches, setLocalMatches] = useAtom(fullMatchesAtom);

  // 1. get all names
  const userNames = JSON.parse(localStorage["names"] || import.meta.env.VITE_USERS || "[]");

  const arrOfUserObj = await userNames.map(async (u: string) => {
      let data = await getPlayerInfo(u);
      return await data;
  });
  const users = await Promise.all(arrOfUserObj);
  
  // 2. get all puuids
  const allUserIds = users.map(i => i.puuid);

  // 3. get all matches
  const arrOfMatchIds = await allUserIds.map(async (u: string) => {
      let data = await getMatchesForUser(u);
      return await data;
  });
  const matchIds = await Promise.all(arrOfMatchIds);

  const apiMatchIds = Array.from(new Set(matchIds.flat()));
  const existingMatchIds = Object.keys(localMatches);
  console.log(apiMatchIds.length, existingMatchIds.length);

  // 4. compare locally stored matches to newly fetched
  const newMatchIds = apiMatchIds.filter((i: string) => !existingMatchIds.includes(i));

  // 5. get data for reduced match ids
  const arrOfMatchDetails = await newMatchIds.map(async (u: string) => {
      let data = await getMatchData(u);
      return await data;
  });

  // 6. add to new variable
  const matchDetails = await Promise.all(arrOfMatchDetails);

  const matchLookup: any = {};
  matchDetails.filter(md => !!md).forEach((m: any) => matchLookup[m.metadata.matchId] = m)

  // 7. Save to local and REMOVE IF OLDER THAN 5 DAYS
  let fiveDaysAgo = new Date(new Date().setHours(24 * -5));
  existingMatchIds.forEach(x => {
    if (fiveDaysAgo > new Date(localMatches[x].info.gameCreation)) {
      delete localMatches[x];
    }
  })

  let current = {...localMatches, ...matchLookup};
  let hasChanges = Object.keys(current).length > Object.keys(localMatches).length;
  if (hasChanges) {
    localStorage.setItem('fullMatches', JSON.stringify(current));
    setLocalMatches(current);
  };

  // 7. return to front end once complete
  return matchDetails;
}

// status - https://na1.api.riotgames.com/lol/status/v4/platform-data