import { useRef, useState } from "react";
import { Container, InputGroup, Form, Button } from "react-bootstrap";
import CalculatedResults from "./calculated-results";
import InputField from "./input-field";

const Home = () => {
  const [calculated, setCalculated] = useState(false);
  const [, setForceUpdate] = useState(Date.now());

  const betOneValueRef = useRef();
  const betOneLineRef = useRef();
  const hedgeOneValueRef = useRef();
  const hedgeOneLineRef = useRef();
  const hedgeTwoLineRef = useRef();

  const inputFields = [
    {
      type: "Bet",
      number: 1,
      value: true,
      ref: betOneValueRef,
    },
    {
      type: "Bet",
      number: 1,
      value: false,
      ref: betOneLineRef,
    },
    {
      type: "Hedge",
      number: 1,
      value: true,
      ref: hedgeOneValueRef,
    },
    {
      type: "Hedge",
      number: 1,
      value: false,
      ref: hedgeOneLineRef,
    },
    {
      type: "Hedge",
      number: 2,
      value: false,
      ref: hedgeTwoLineRef,
    },
  ];

  const parseInput = (ref) => {
    const val = parseInt(ref.current.value);
    return isNaN(val) ? 0 : val;
  };

  const renderResults = () => {
    setForceUpdate(Date.now());
    setCalculated(true);
  };

  return (
    <Container>
      <p>
        This calculator is for hedging an initial bet with multiple hedge bets.
        For example, i
      </p>
      {inputFields.map((f) => (
        <InputField {...f} />
      ))}
      {/* <InputGroup className="mb-3">
        <InputGroup.Text>Bet #1</InputGroup.Text>
        <Form.Control
          aria-label="Bet #1 Value"
          aria-describedby="basic-addon1"
          ref={betOneValueRef}
          placeholder="Enter a value"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon2">Bet Line #1</InputGroup.Text>
        <Form.Control
          aria-label="Bet #1 Line"
          aria-describedby="basic-addon2"
          ref={betOneLineRef}
          placeholder="Enter odds"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">Hedge #1</InputGroup.Text>
        <Form.Control
          aria-label="Hedge #1 Value"
          aria-describedby="basic-addon3"
          ref={hedgeOneValueRef}
          placeholder="Enter a value"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon4">Hedge Line #1</InputGroup.Text>
        <Form.Control
          aria-label="Hedge #1 Line"
          aria-describedby="basic-addon4"
          ref={hedgeOneLineRef}
          placeholder="Enter odds"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon5">Hedge Line #2</InputGroup.Text>
        <Form.Control
          aria-label="Hedge #2 Line"
          aria-describedby="basic-addon5"
          ref={hedgeTwoLineRef}
          placeholder="Enter odds"
        />
      </InputGroup> */}
      <Button onClick={() => renderResults()}>Calculate</Button>
      {calculated && (
        <CalculatedResults
          betOneValue={parseInput(betOneValueRef)}
          betOneLine={parseInput(betOneLineRef)}
          hedgeOneValue={parseInput(hedgeOneValueRef)}
          hedgeOneLine={parseInput(hedgeOneLineRef)}
          hedgeTwoLine={parseInput(hedgeTwoLineRef)}
        />
      )}
    </Container>
  );
};

export default Home;
