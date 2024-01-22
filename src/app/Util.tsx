import { useAtom } from "jotai";
import { allMatchesAtom, fullMatchesAtom } from "./DataBoxState";

export const getMyData = (user: number) => {
    const [matchIdsForAllUsers] = useAtom(allMatchesAtom);
    console.log("matchIdsForAllUsers", matchIdsForAllUsers[user]);

    const allGames = getAllMatches();
    const myGames = allGames.flat().filter((p: any) => p.summonerName === matchIdsForAllUsers[user]);
    return myGames.slice(0,3);
}

export const getDataForA = () => {
    return getMyData(2);
}

export const getDataForN = () => {
    return getMyData(3);
}

const getAllMatches = () => {
    const [localMatches, setLocalMatches] = useAtom(fullMatchesAtom);
    const keys = Object.keys(localMatches);
    const allGames = keys.map(k => localMatches[k].info.participants);
    return allGames;
}

const formatDate = (date: string): string => {
    let d = new Date(date);
    return `${d.getMonth()+1}/${d.getDate()}`
  };