import React from "react";
import "./ScoreTable.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function ScoreTable({ results }) {
  return (
    <div className='table-container'>
      <TableContainer component={Paper} className='score-table'>
        <Table className='table' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Round</TableCell>
              <TableCell align='right'>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component='th' scope='row'>
                1.
              </TableCell>
              <TableCell align='right'>{results[0]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                2.
              </TableCell>
              <TableCell align='right'>{results[1]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                3.
              </TableCell>
              <TableCell align='right'>{results[2]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                4.
              </TableCell>
              <TableCell align='right'>{results[3]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                5.
              </TableCell>
              <TableCell align='right'>{results[4]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                Total:
              </TableCell>
              <TableCell align='right'>
                {results
                  .filter((num) => num !== Math.max(...results))
                  .reduce((a, b) => {
                    return parseFloat((a + b).toFixed(2));
                  }, 0)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
