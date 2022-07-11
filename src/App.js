import './App.css';
import { useState } from 'react';
import VoteContoller from './components/votes';
import ResultsController from './components/result';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [threshold, setThreshold] = useState(5);
  const electorateSeatsNo = 72;
  const [results, setResults] = useState([]);

  function startElection(partyState) {
    const currentElectionParties = partyState.map((x) => ({ ...x }));
    let eligible = [];
    let ineligible = [];

    function checkEligibility() {
      currentElectionParties.forEach((party) => {
        if (party.votePercent >= threshold || party.electedSeats !== 0) {
          eligible.push(party);
        } else {
          ineligible.push(party);
        }
      });
    }

    function redistributeWastedVotes() {
      let wastedVotes = 0;
      let totalVote = 0;

      ineligible.forEach((party) => {
        wastedVotes += parseFloat(party.votePercent);
      });

      eligible.forEach((party) => {
        let partyPercentage = parseFloat(party.votePercent) / 100;
        parseFloat((party.votePercent += wastedVotes * partyPercentage));
        totalVote += party.votePercent;
      });

      // Using largest remainder method to remove unequal remainder.
      if (totalVote !== 100) {
        let remainder = 100 - totalVote;
        let largestPartyVote = eligible.reduce((max, party) =>
          max.votePercent > party.votePercent ? max : party,
        );
        largestPartyVote.votePercent += remainder;
      }
    }

    function calculateSeats() {
      let quotients = [];
      for (let qv = 1; qv < 121; qv += 2) {
        eligible.forEach((party) => {
          let quotient = { value: party.votePercent / qv, name: party.name };
          quotients.push(quotient);
        });
      }

      // Sort quotients and collect top 120.
      quotients.sort((a, b) => b.value - a.value);
      let top120 = [];
      for (let index = 0; index < 120; index++) {
        top120.push(quotients[index]);
      }

      let results = [];
      eligible.forEach((party) => {
        const count = top120.filter((obj) => obj.name === party.name).length;
        let extraSeats = 0;
        if (party.electedSeats > count) {
          extraSeats = party.electedSeats - count;
        }
        results.push({
          name: party.name,
          seatsWon: count,
          overhang: extraSeats,
          percentVotes: party.votePercent,
        });
      });

      setResults(results);
    }

    checkEligibility();
    redistributeWastedVotes();
    calculateSeats();
  }

  return (
    <Container fluid className="App">
      <Row className="App-header">
        <Col>
          <h2 className="pt-5">New Zealand Election Calculator</h2>
        </Col>
        <VoteContoller
          threshold={threshold}
          electorateSeatsNo={electorateSeatsNo}
          setThreshold={setThreshold}
          generateElection={startElection}
        />
      </Row>
      <Row>
        <Col>
          <ResultsController results={results} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
