import { useState } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import '../App.css';
import PartyInput from './party';
import 'bootstrap/dist/css/bootstrap.min.css';

const partiesInitial = [
  {
    name: 'ACT New Zealand',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'Labour Party',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'National Party',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'The Greens, The Green Party of Aotearoa/New Zealand',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'Maori Party',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'Aotearoa Legalise Cannabis Party',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'Heartland New Zealand Party',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'New Conservative',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'ONE Party',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'New Zealand First Party',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'NZ Outdoors & Freedom Party',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'The New Zealand Democratic Party for Social Credit',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'The New Zealand National Party',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'The Oppotunities Party (TOP)',
    votePercent: 0,
    electedSeats: 0,
  },
  {
    name: 'Vision New Zealand',
    votePercent: 0,
    electedSeats: 0,
  },
];

function VoteContoller({
  electorateSeatsNo,
  threshold,
  setThreshold,
  generateElection,
}) {
  const [partyState, setParty] = useState(partiesInitial);
  // move these two at least to upper layer.

  const [currentVotes, setVotes] = useState(0);
  const [currentElected, setElected] = useState(0);

  // set a state for button, apply property to button jsx as 'Disabled's and change it with state depending on updateVotes,updateElected, etc.

  function updateTotals() {
    let voteSum = 0;
    partyState.forEach((obj) => {
      voteSum += obj.votePercent;
    });
    setVotes(voteSum);

    let electedSum = 0;
    partyState.forEach((obj) => {
      electedSum += obj.electedSeats;
    });
    setElected(electedSum);
  }

  function validateInput(name, event) {
    // handle deleted or empty inputs
    if (event.target.value === '') {
      event.target.value = 0;
      handleUpdate({ name, event });
    }

    // Correct inputs so can't go over 100%
    let voteSum = 0;
    partyState.forEach((obj) => {
      voteSum += obj.votePercent;
    });
    if (voteSum > 100) {
      event.target.value -= voteSum - 100;
      handleUpdate({ name, event });
    }

    // Correct inputs so can't go over maximum number of electorate Seats.
    let electedSum = 0;
    partyState.forEach((obj) => {
      electedSum += obj.electedSeats;
    });
    if (electedSum > electorateSeatsNo) {
      event.target.value -= electedSum - electorateSeatsNo;

      handleUpdate({ name, event });
    }
  }

  const handleUpdate = ({ name, event }) => {
    // update stored party information.
    let i = partiesInitial.findIndex((x) => x.name === name);

    if (event.target.name === 'electorates') {
      partyState[i].electedSeats = parseFloat(event.target.value);
    } else if (event.target.name === 'votePercentage') {
      partyState[i].votePercent = parseFloat(event.target.value);
    } else return partyState;

    setParty(partyState);
    validateInput(name, event);
    updateTotals();
  };

  function changeThreshold(event) {
    setThreshold(event.target.value);
  }

  function handleSubmission() {
    generateElection(partyState);
  }

  return (
    <Row>
      <Col>
        <Form className="my-4">
          <Row className="pb-3">
            <Col>
              <h4>Party Name</h4>
            </Col>
            <Col>
              <h4>Party Votes Won %</h4>
            </Col>
            <Col>
              <h4>Electorate Seats Won</h4>
            </Col>
          </Row>
          {partiesInitial.map(({ name }) => (
            <PartyInput
              key={name}
              name={name}
              electorateSeatsNo={electorateSeatsNo}
              onPartyUpdate={handleUpdate}
            />
          ))}
          <Row>
            <Col>Totals</Col>
            <Col>
              <p>{currentVotes}/100%</p>
            </Col>
            <Col>
              <p>
                {currentElected}/{electorateSeatsNo}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                id="partySubmit"
                variant="success"
                disabled={
                  currentVotes !== 100 || currentElected !== electorateSeatsNo
                }
                onClick={handleSubmission}>
                Calculate Seats
              </Button>
            </Col>
            <Col>
              <InputGroup>
                <InputGroup.Text>Threshold</InputGroup.Text>
                <Form.Control
                  type="number"
                  defaultValue={threshold}
                  name="threshold"
                  min="0"
                  max="100"
                  onChange={changeThreshold}></Form.Control>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default VoteContoller;
