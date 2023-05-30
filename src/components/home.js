import { useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
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
    <Container
      fluid
      className="d-flex justify-content-center align-items-center m-4"
    >
      <Container className="m-3 p-3 text-center">
        <h1>Two Bet Hedge Calculator</h1>
        <p className="mt-3 text-start">
          This calculator is for hedging an initial bet with multiple hedge
          bets. For example, if you place a bet of $50 with +500, a hedge 1 of $60 with -300, and hedge 2 has -400, then you will need to place a $176 hedge bet to guarantee $14.
        </p>
        <Container className="m-3 p-3">
          {inputFields.map((f) => (
            <InputField {...f} />
          ))}
        </Container>
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
    </Container>
  );
};

export default Home;
