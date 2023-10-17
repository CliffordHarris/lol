import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function DenseTable(props: any) {
    useEffect(() => {
        if(props.data.length === 0) return;
        let r = Object.keys(props.data[0]);
        let colList = r.filter(col => !['id', 'date'].includes(col) );
        console.log(colList);
        setCols(colList)
    }, [props.data])

    const [cols, setCols] = useState<string[]>([]);
    const cap = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const getRows = (props: any) => {
        console.log('table', props)
        if(props.data) return props.data;
    }
  return (
    <TableContainer component={Card}>
      {/* <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table"> */}
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            {
                cols.map(c => (
                    <TableCell align="right">{cap(c)}</TableCell>
                ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {getRows(props).map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              {
                 cols.map(c => (
                    <TableCell align="right">{row[c]}</TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}