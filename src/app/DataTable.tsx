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
  useEffect(() => {
    if (!props.data || props?.data?.length === 0) return;
    let r = Object.keys(props.data[0]);
    let colList = r.filter(col => !['id', 'date', 'time'].includes(col));
    setCols(colList)
  }, [props.data, props.key])

  const [cols, setCols] = useState<string[]>([]);
  const [matchDetailsForAllUsers, setMatchDetailsForAllUsers] = useAtom<any>(matchesDetailsAtom);
  const [localMatches, setLocalMatches] = useAtom(fullMatchesAtom);

  const cap = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const getRows = (props: any) => {
    // console.log('table', props)
    if (props.data) return props.data;
    return [];
  }

  const setChartData = (id: string) => {
    const chartData = localMatches[id];
    const p = chartData.info.participants;

    const particip = chartData.info.participants.map((singleParticipant: any) => {
      return {
        summonerName: singleParticipant.summonerName,
        championName: singleParticipant.championName,
        lane: singleParticipant.teamPosition,
        teamId: singleParticipant.teamId,
        maxCsAdv: singleParticipant.challenges.maxCsAdvantageOnLaneOpponent,
        result: singleParticipant.win ? 'W' : 'L',
        goldEarned: singleParticipant.goldEarned,
        goldSpent: singleParticipant.goldSpent,
        quickFirstTurret: singleParticipant.challenges.quickFirstTurret,
        ultimateCount: singleParticipant.spell4Casts
      }
    });
    const team1 = particip.filter((part: any) => part.teamId === 100);
    const team2 = particip.filter((part: any) => part.teamId === 200);

    const team1Gold = team1.map((p: any) => p.goldEarned).reduce((x: number, y: number) => x + y, 0);
    const team2Gold = team2.map((p: any) => p.goldEarned).reduce((x: number, y: number) => x + y, 0);

    // console.log(particip, p, chartData)
    console.table(team1)    
    console.log('gold', team1Gold, team1Gold - team2Gold);
    
    console.table(team2)    
    console.log('gold', team2Gold, team2Gold - team1Gold);

    // console.table(particip);
  }

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