import '../App.css';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PartyInput({ name, electorateSeatsNo, onPartyUpdate }) {
  function electorateChangeHandler(event) {
    if (event.target.value < 0) {
      alert('Voting cannot be less than 0');
      event.target.value = 0;
    } else if (event.target.value > electorateSeatsNo) {
      alert(`Voting cannot exceed ` + electorateSeatsNo);
      event.target.value = electorateSeatsNo;
    } else {
      onPartyUpdate({ name, event });
    }
  }

  function percentChangeHandler(event) {
    if (event.target.value < 0) {
      alert('Voting cannot be less than 0%');
      event.target.value = 0;
    } else if (event.target.value > 100) {
      alert('Voting cannot exceed 100%');
      event.target.value = 100;
    } else {
      onPartyUpdate({ name, event });
    }
  }

  return (
    <Form.Group as={Row}>
      <Col>
        <Form.Label>{name}</Form.Label>
      </Col>
      <Col>
        <InputGroup>
          <Form.Control
            type="number"
            defaultValue="0"
            name="votePercentage"
            min="0"
            max="100"
            onBlur={percentChangeHandler}></Form.Control>
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </Col>
      <Col>
        <Form.Control
          type="number"
          defaultValue="0"
          name="electorates"
          min="0"
          max={electorateSeatsNo}
          onBlur={electorateChangeHandler}></Form.Control>
      </Col>
    </Form.Group>
  );
}

export default PartyInput;
