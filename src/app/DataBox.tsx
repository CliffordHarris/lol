import { useState, useEffect, useMemo } from 'react';
import { getMatchesForUser, getMatchData, getPlayerInfo } from './api-calls';
import { Container, Row, Col, Card, Button } from 'react-bootstrap/';
import * as status from './constants';
import { atom, useAtom } from 'jotai';
import { allMatchesAtom, matchesDetailsAtom, fullMatchesAtom } from './app';
import { hasChanges } from './MainPage';
import DataCard from "./DataCard";
import DataTable from './DataTable';


interface MatchDataLookup {
  [key: string]: any
}

interface PlayerName {
  playerName: string
}

function DataBox({ playerName }: PlayerName) {
  // const nameAtom = atom(playerName);
  // const [name] = useAtom(
  //   useMemo(() => atom((get) => get(nameAtom)), [])
  // );
  const [matchIdsForAllUsers, setMatchIdsForAllUsers] = useAtom(allMatchesAtom);
  const [matchDetailsForAllUsers, setMatchDetailsForAllUsers] = useAtom(matchesDetailsAtom);
  const [matches, setMatches] = useState<string[]>([]);
  const [matchInfo, setMatchInfo] = useState({}); // maybe delete
  const [matchesLookup, setMatchesLookup] = useState<MatchDataLookup>({});
  const [allMatches, setAllMatches] = useState<any>([]);
  const [localMatches, setLocalMatches] = useAtom(fullMatchesAtom);
  const [, setHasChanged] = useAtom(hasChanges);

  useEffect(() => {
    getPlayerObject();
    console.log('local',localMatches)
  }, []);

  useEffect(() => {
    getAllMatches()
  }, [matches]);

  useEffect(() => {
    createLookupObj();
}, [allMatches])

  const getPlayerObject = async () => {
    const playerObject = await getPlayerInfo(playerName)
    getMatchIds(playerObject.puuid);
  }

  const getMatchIds = async (userId: any) => {
    if(!userId) return;

    let matchIdsForUser = await getMatchesForUser(userId);
    setMatches(matchIdsForUser);
    setMatchIdsForAllUsers(existing => Array.from(new Set([...existing, ...matchIdsForUser])));
    // setMatchesForAllUsers(existing => {
    //   return Array.from(new Set([...existing, ...matchIdsForUser]));
    // });
  }
  interface MatchId {
    matchId: string
  }
  const getAllMatches = async () => {
    if(matchIdsForAllUsers.length === 0) return;
    let allMatchesForUser: any[] = [];
    console.log(matchIdsForAllUsers);
    console.log(matches);

    let existing = localStorage.getItem('fullMatches') || '[]';
    let getThese = Object.keys(JSON.parse(existing));
    let missing = matchIdsForAllUsers.filter(item => getThese.indexOf(item) < 0);
    missing.forEach(async (matchId: string) => {
      console.log('matchDetailsForAllUsers', Object.keys(matchDetailsForAllUsers).length)
      let matchInfo = localMatches[matchId] || await getMatchData(matchId);
      allMatchesForUser.push(matchInfo);
      setAllMatches((currData: any) => [...currData, matchInfo]);
      setHasChanged(true);
    })
    if(missing.length === 0) {
      setAllMatches(localMatches);
    }
  }

  const createLookupObj = () => {
    if(allMatches.length === 0) return; 

    let dictionary: MatchDataLookup = {};
    Object.values(allMatches).forEach((match: any) => {
      if(match !== status.API_ERR) {
        dictionary[match.metadata.matchId] = match;
        // setMatchDetailsForAllUsers({...matchDetailsForAllUsers, [match.metadata.matchId]: match.info})
      }
    })
    setMatchDetailsForAllUsers({...matchDetailsForAllUsers, ...dictionary})
    // console.log('Atom', matchDetailsForAllUsers);
    // console.log('Dict', dictionary);
    setMatchesLookup(dictionary);
    
    let current = {...localMatches, ...matchDetailsForAllUsers};
    let hasChanges = Object.keys(current).length > Object.keys(localMatches).length;
    if (hasChanges) {
      localStorage.setItem('fullMatches', JSON.stringify(current));
    };
  }

  interface DisplayedData {
    id: string;
    date: string;
    result: boolean;
    champion: string;
    kda: number;
    level: number;
    alive: string;
    timeAway: string;
  }

  const prepareDataForTable = (data: any)  => {
    if (matches.length === 0 || Object.keys(matchesLookup).length === 0) return [];

    const playerData = matches.filter(matchId => {
      return matchesLookup[matchId];
    }).map(matchId => {
      let data = matchesLookup[matchId];
      let playerInGameData = data.info.participants.find((x: any) => x.summonerName === playerName)
      return {
        id: matchId,
        date: formatDate(data.info.gameCreation),
        result: playerInGameData.win ? 'W' : 'L',
        // champion: `${playerInGameData.championName}${playerInGameData.individualPosition[0]}`,
        champion: `${playerInGameData.championName}`,
        kda: `${playerInGameData.kills}/${playerInGameData.deaths}/${playerInGameData.assists}`,
        level: playerInGameData.champLevel,
        alive: formatMinutes(playerInGameData.longestTimeSpentLiving),
        timeAway: formatMinutes(playerInGameData.totalTimeSpentDead)
      }
    })
    return playerData;
  }

  const formatMinutes = (seconds: number) => (seconds/60).toFixed() + "'" 

  const formatDate = (date: string): string => {
    let d = new Date(date);
    // return `${d.getMonth()+1}/${d.getDate()} ${d.toLocaleTimeString()}`
    return `${d.getMonth()+1}/${d.getDate()}`
  };
  return (
    <Col xs={12} md={6} className="pb-3">
      <Card border="info">
        <Card.Header className='bg-info text-white' as="h5">{playerName.toUpperCase()}</Card.Header>
        <Card.Body>
          {/* <Card.Title>Past {status.GAMES_TO_SHOW} games</Card.Title>
          <Card.Text>Showing game id and wins</Card.Text> */}
            <DataTable data={prepareDataForTable(matchesLookup)}></DataTable>
          {/* <Button variant="primary">Get Data</Button> */}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DataBox;
