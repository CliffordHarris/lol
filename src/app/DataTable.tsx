import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { matchesDetailsAtom, fullMatchesAtom } from './DataBoxState';


export default function DenseTable(props: any) {
  const columnsToHideInGrid = ['id', 'date', 'time', 'result'];
  useEffect(() => {
    if (!props.data || props?.data?.length === 0) return;
    let r = Object.keys(props.data[0]);
    let listOfColumnsToShow = r.filter(col => !columnsToHideInGrid.includes(col));
    setCols(listOfColumnsToShow) // todo add totalDamageDealt to grid and maybe colors too
  }, [props.data, props.key])

  const [cols, setCols] = useState<string[]>([]);
  const [matchDetailsForAllUsers, setMatchDetailsForAllUsers] = useAtom<any>(matchesDetailsAtom);
  const [localMatches, setLocalMatches] = useAtom(fullMatchesAtom);

  const cap = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const getRows = (props: any) => {
    if (props.data) return props.data;
    return [];
  }

  const setChartData = (id: string) => { // ON ROW CLICKED!!
    const chartData = localMatches[id];
    const p = chartData.info.participants;


    // RESEARCH VIEW aka ADVANCED STATS
    const particip = chartData.info.participants.map((singleParticipant: any) => {
      return {
        summonerName: singleParticipant.summonerName,
        championName: singleParticipant.championName,
        lane: singleParticipant.teamPosition,
        teamId: singleParticipant.teamId,
        maxCsAdv: singleParticipant.challenges?.maxCsAdvantageOnLaneOpponent || 0,
        result: singleParticipant.win ? 'W' : 'L',
        goldEarned: singleParticipant.goldEarned,
        goldSpent: singleParticipant.goldSpent,
        quickFirstTurret: singleParticipant.challenges?.quickFirstTurret || 0,
        ultimateCount: singleParticipant.spell4Casts,
        champExperience: singleParticipant.champExperience,
        // baronKills: singleParticipant.baronKills,
        // dragonKills: singleParticipant.dragonKills
      }
    });
    const team1 = particip.filter((part: any) => part.teamId === 100);
    const team2 = particip.filter((part: any) => part.teamId === 200);

    const team1GoldEarned = getGold(team1, "goldEarned");
    const team2GoldEarned = getGold(team2, "goldEarned");

    const team1GoldSpent = getGold(team1, "goldSpent");
    const team2GoldSpent = getGold(team2, "goldSpent");

    // console.log(particip, p, chartData)
    console.log('Team 1', id);
    console.table(team1)    
    let diff = team1GoldEarned - team2GoldEarned;
    console.log('gold EARNED', team1GoldEarned, diff > 0 ? "+" + diff : diff);
    console.log('UNSPENT', team1GoldEarned - team1GoldSpent);
    console.log('XP', getGold(team2, "champExperience"));
    console.log(' - - - - - - -  - - - - - - -  - - - - - - -  - - - - - - -  - - - - - - - ');
    console.log('Team 2', id);
    console.table(team2)    
    console.log('gold EARNED', team2GoldEarned, team2GoldEarned - team1GoldEarned);
    console.log('UNSPENT', team2GoldEarned - team2GoldSpent);
    console.log('XP', getGold(team1, "champExperience"));


    // console.table(particip);
  }

  const getGold = (team: any, goldProp: string) => {
    const teamGoldSpent = team.map((p: any) => p[goldProp]).reduce((x: number, y: number) => x + y, 0); // new improved code
      // p.goldSpent
      // p["goldSpent"]
      // goldProp = 'goldSpent'
      // p[goldProp]
    return teamGoldSpent;
  };

  return (
    <TableContainer component={Card} key={props.key}>
      {/* <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table"> */}
      <Table size="small" aria-label="a dense table" key={props.key}>
        <TableHead key={props.key}>
          <TableRow key={props.key}>
            <TableCell key="date">Date</TableCell>
            {
              cols.map((c, i) => (
                <TableCell align="right" key={i}>{cap(c)}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody key={props.key}>
          {getRows(props).map((row: any, i: number) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => setChartData(row.id)}
              style={{background: row.result === 'W' ? "#d4edda" : ""}}
            >
              <TableCell component="th" scope="row" key={row.key}>
                {row.date}
              </TableCell>
              {
                cols.map(c => (
                  <TableCell key={c} align="right">{row[c]}</TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}