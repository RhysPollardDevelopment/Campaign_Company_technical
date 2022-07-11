import { Table } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ResultsController({ results }) {
  return (
    <div>
      <h2 className="white my-3">Results</h2>
      <Table className="white my-3 mx-2">
        <thead>
          <tr>
            <th>#</th>
            {results.map(({ name }) => (
              <th>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Party Votes %</td>
            {results.map(({ percentVotes }) => (
              <th>{percentVotes}</th>
            ))}
          </tr>
          <tr>
            <td>Seats Won</td>
            {results.map(({ seatsWon }) => (
              <th>{seatsWon}</th>
            ))}
          </tr>
          <tr>
            <td>Overhang Seats</td>
            {results.map(({ overhang }) => (
              <th>{overhang}</th>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ResultsController;
