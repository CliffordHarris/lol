import axios from "axios";
import * as status from './constants';

const apiKey = import.meta.env.VITE_API_KEY;

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

  let count = 5;
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

// status - https://na1.api.riotgames.com/lol/status/v4/platform-data