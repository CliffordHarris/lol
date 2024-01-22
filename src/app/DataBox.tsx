import { useState, useEffect, useMemo } from 'react';
// import { getMatchesForUser, getMatchData, getPlayerInfo } from './ApiCalls';
import { Container, Row, Col, Card, Button } from 'react-bootstrap/';
import { atom, useAtom } from 'jotai';
import { allMatchesAtom, matchesDetailsAtom, fullMatchesAtom } from './DataBoxState';
import { hasChanges } from './MainPage';
// import DataCard from "./DataCard";
import DataTable from './DataTable';
import * as constants from './constants';

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
  const [data, setData] = useState<any | null>();

  useEffect(() => {
    doData();
  }, [localMatches])

  const doData = () => {
    let latest = prepareDataForTable2(localMatches);
    latest = latest.sort((a: any, b: any) => a.time < b.time ? 1 : -1).slice(0, constants.GAMES_TO_SHOW);
    setData(latest);
  }

  const prepareDataForTable2 = (datas: any)  => {
    console.log('prepareDataForTable', Object.keys(datas).length, Object.keys(JSON.parse(localStorage.fullMatches)).length, Object.keys(localMatches).length);
    // console.log('----------', localMatches)
    if (Object.keys(localMatches).length === 0) return [];

    const playerData = Object.keys(localMatches).filter(matchId => {
      let playerInGameData = localMatches[matchId].info.participants.find((x: any) => x.summonerName === playerName);
      return localMatches[matchId] && playerInGameData;
    }).map(matchId => {
      let data = localMatches[matchId];
      let playerInGameData = data.info.participants.find((x: any) => x.summonerName === playerName);
      const teamId = data.info.teams.find((x: any) => x.teamId === playerInGameData?.teamId)?.teamId;
      if (!playerInGameData) return {};
      return {
        id: matchId,
        date: formatDate(data.info.gameCreation),
        time: new Date(data.info.gameCreation).toISOString(),
        result: playerInGameData.win ? 'W' : 'L',
        champion: `${playerInGameData.championName}`,
        kda: `${playerInGameData.kills}/${playerInGameData.deaths}/${playerInGameData.assists}`,
        level: playerInGameData.champLevel,
        alive: formatMinutes(playerInGameData.longestTimeSpentLiving),
        timeAway: formatMinutes(playerInGameData.totalTimeSpentDead),
        surrender: playerInGameData.gameEndedInEarlySurrender || playerInGameData.gameEndedInSurrender ? 'Yes' : '',
        firstKill: playerInGameData.firstBloodKill ? 'Yes' : '',
        teamFirstTower: getTeamDataForProp(data.info.participants.filter((x: any) => x.teamId === teamId), "firstTowerKill"),
        pings: getSumOfSingleProperty(playerInGameData, "ping"),
        // baronKills: getTeamDataForProp(data.info.participants.filter((x: any) => x.teamId === teamId), "baronKills"),
        // dragonKills: getTeamDataForProp(data.info.participants.filter((x: any) => x.teamId === teamId), "dragonKills"),

        baronKills: getNumberOfMonsterKills(data.info.participants.filter((x: any) => x.teamId === teamId), "baronKills"),
        dragonKills: getNumberOfMonsterKills(data.info.participants.filter((x: any) => x.teamId === teamId), "dragonKills"),
      }
    })
    return playerData;
  }

  const getTeamDataForProp = (data: any, prop: string) => {
    return data.some((x: any) => x[prop]) ? 'Yes': '';
  }
  // create a func for TEAM Baron dragpn  kills

  const getNumberOfMonsterKills = (data: any, prop: string) => {
    const monsterKillCount = data.map((x: any) => x[prop]).reduce((a: number, b: number) => a+b, 0);
    return monsterKillCount;
  };

  const getSumOfSingleProperty = (data: any, propString: string): number => {
    const datas: { [key: string]: any } = {};
    let typeOfProp: string[] = [];

    switch (propString) {
      case "ping":
        typeOfProp = constants.PINGS;
        break;
      case "baron":
      typeOfProp = ["baronKills"]
        break;
      case "dragon":
        typeOfProp = ["dragonKills"]
        break;
    }

    typeOfProp.forEach((prop: string) => datas[prop] = data[prop]);
    // todo log which value is undefined and remove from constants.ping
    const num = typeOfProp.map(x => datas[x]).filter(x => x !== undefined);
    const sum = num.reduce((a,b) => a+b, 0);
    return sum;
  }

  const formatMinutes = (seconds: number) => (seconds/60).toFixed() + "'" 

  const formatDate = (date: string): string => {
    let d = new Date(date);
    return `${d.getMonth()+1}/${d.getDate()}`
  };

  return (
    <Col xs={12} md={12} className="pb-3">
      <Card border="info">
        <Card.Header className='bg-info text-white' as="h5">{playerName.toUpperCase()}</Card.Header>
        <Card.Body>
          {/* <Card.Title>Past {status.GAMES_TO_SHOW} games</Card.Title>
          <Card.Text>Showing game id and wins</Card.Text> */}
            <DataTable data={data} key={data?.info?.gameCreation}></DataTable>
          {/* <Button variant="primary">Get Data</Button> */}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DataBox;
