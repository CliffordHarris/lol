// import * as api from './ApiCalls';
// import { atom, useAtom } from 'jotai';
// import { allMatchesAtom, matchesDetailsAtom, fullMatchesAtom } from './DataBoxState';

// export const GetAllData = async () => {
//     const [localMatches,] = useAtom(fullMatchesAtom);

//     // 1. get all names
//     const userNames = JSON.parse(localStorage["names"] || JSON.parse(import.meta.env.VITE_USERS) || "[]");

//     const arrOfUserObj = await userNames.map(async (u: string) => {
//         let data = await api.getPlayerInfo(u);
//         return await data;
//     });
//     const users = await Promise.all(arrOfUserObj);

//     // 2. get all puuids
//     const allUserIds = users.map(i => i.puuid);

//     // 3. get all matches
//     const arrOfMatchIds = await allUserIds.map(async (u: string) => {
//         let data = await api.getMatchesForUser(u);
//         return await data;
//     });
//     const matchIds = await Promise.all(arrOfMatchIds);

//     const apiMatchIds = Array.from(new Set(matchIds.flat()));
//     const existingMatchIds = Object.keys(localMatches);
//     console.log(apiMatchIds.length, existingMatchIds.length);

//     // 4. compare locally stored matches to newly fetched
//     const newMatchIds = apiMatchIds.filter((i: string) => !existingMatchIds.includes(i));

//     // 5. get data for reduced match ids
//     const arrOfMatchDetails = await newMatchIds.map(async (u: string) => {
//         let data = await api.getMatchData(u);
//         return await data;
//     });

//     // 6. add to new variable
//     const matchDetails = await Promise.all(arrOfMatchDetails);


//     const matchLookup: any = {};
//     matchDetails.filter(md => !!md).forEach((m: any) => matchLookup[m.metadata.matchId] = m)

//     // 7. Save to local
//     let current = { ...localMatches, ...matchLookup };
//     let hasChanges = Object.keys(current).length > Object.keys(localMatches).length;
//     if (hasChanges) {
//         localStorage.setItem('fullMatches', JSON.stringify(current));
//     };

//     console.log("FIRST DATA LOAD!")
//     // 7. return to front end once complete
//     return matchDetails;
// }
// GetAllData();