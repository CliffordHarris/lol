import axios from "axios";
import * as status from './constants';

const apiKey = "RGAPI-d7de0d8b-5c76-4342-9fb8-7cf3f91ac8c3";


export const getPlayerInfo = async (user: string) => {
  if (!user) return;

  let url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
  let apiPrefix = "?api_key=";

  try {
    let resp = await axios.get(url + user + apiPrefix + apiKey);
    return resp.data;
  } 
  catch (error: any) {
    if (error['code'] === status.ERR_CODE) return status.CANT_FIND;
  }
}

export const getMatchesForUser = async (userId: string) => {
  if (!userId) return;

  let count = 3;
  let url = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"
  let option = "/ids?start=0&count="
  let apiPrefix = "&api_key=";

try {
    let resp = await axios.get(url + userId + option + count + apiPrefix + apiKey);
    return resp.data;
  } 
  catch (error: any) {
    if (error['code'] === status.ERR_CODE) return status.CANT_FIND;
  }
}

export const getMatchData = async (matchId: string) => {
  if (!matchId) return;

  let url = "https://americas.api.riotgames.com/lol/match/v5/matches/"
  let apiPrefix = "?api_key=";

try {
    let resp = await axios.get(url + matchId + apiPrefix + apiKey);
    return resp.data;
  } 
  catch (error: any) {
    if (error['code'] === status.ERR_CODE) return status.CANT_FIND;
  }
}




// user look up - https://na1.api.riotgames.com/lol/summoner/v4/summoners/u2NyuDUokoU7W3m4QT3zBUvJHgWTIkaLScXGrIQ3SgUlTBwUoWT6E9W_8g
// gets last 20 match ids - https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/CRChcIKo1N-X-8O47Lnp9pnJqiGDMae3QQGSgxqVXo6Vz_vP0yPh42N1s7vqVlxV7F8LG2-QA7r14A/ids?start=0&count=20
// gets match details - https://americas.api.riotgames.com/lol/match/v5/matches/NA1_4798830554
// status - https://na1.api.riotgames.com/lol/status/v4/platform-data
