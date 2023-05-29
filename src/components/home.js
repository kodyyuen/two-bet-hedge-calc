import { useRef, useState } from "react";
import { Container, InputGroup, Form, Button } from "react-bootstrap";

const Home = () => {
  const [betOneValue, setBetOneValue] = useState(100);
  const [betOneLine, setBetOneLine] = useState(-110);

  const [hedgeOneValue, setHedgeOneValue] = useState(100);
  const [hedgeOneLine, setHedgeOneLine] = useState(-110);

  const [hedgeTwoLine, setHedgeTwoLine] = useState(-110);
  const [hedgeTwoValue, setHedgeTwoValue] = useState(0);

  const [betOneWinnings, setBetOneWinnings] = useState(0);
  const [hedgeOneWinnings, setHedgeOneWinnings] = useState(0);
  const [hedgeTwoWinnings, setHedgeTwoWinnings] = useState(0);

  const [calculated, setCalculated] = useState(false);

  const betOneValRef = useRef();
  const betOneLineRef = useRef();
  const hedgeOneValRef = useRef();
  const hedgeOneLineRef = useRef();
  const hedgeTwoLineRef = useRef();

  const refs = [
    [betOneValRef, setBetOneValue],
    [betOneLineRef, setBetOneLine],
    [hedgeOneValRef, setHedgeOneValue],
    [hedgeOneLineRef, setHedgeOneLine],
    [hedgeTwoLineRef, setHedgeTwoLine]
  ];

  const handleValue = (value, setValue) => {
    const parsedVal = parseInt(value);
    setValue(isNaN(parsedVal) ? 0 : parsedVal);
  };

  const americanToDecimal = (odds) => {
    return odds > 0 ? odds / 100 + 1 : 1 - 100 / odds;
  };

  const calculateWinnings = (value, odds) => {
    return value * (americanToDecimal(odds) - 1);
  };

  const handleLine = (value, setLine) => {
    setLine(value);
  };

  const appendOddsSign = (odds) => {
    return odds > 0 ? `+${odds}` : odds;
  };

  const parseInput = (ref) => {
    const val = parseInt(ref.current.value)
    return isNaN(val) ? 0 : val;
  }

  const calculateValues = () => {
    const betOneVal = betOneValRef.current.value;

    const betOneWin = calculateWinnings(parseInput(betOneValRef), parseInput(betOneLineRef));
    console.log(betOneWin)
    console.log(parseInput(betOneValRef))
    console.log(parseInput(betOneLineRef))
    const hedgeOneWin = calculateWinnings(parseInput(hedgeOneValRef), parseInput(hedgeOneLineRef));
    const hedgeTwoVal =
      (betOneWin + parseInput(betOneValRef) - (hedgeOneWin + parseInput(hedgeOneValRef))) /
      americanToDecimal(parseInput(hedgeTwoLineRef));
    const hedgeTwoWin = calculateWinnings(hedgeTwoVal, parseInput(hedgeTwoLineRef));
    // const betOneWin = calculateWinnings(betOneValue, betOneLine);
    // const hedgeOneWin = calculateWinnings(hedgeOneValue, hedgeOneLine);
    // const hedgeTwoVal =
    //   (betOneWin + betOneValue - (hedgeOneWin + hedgeOneValue)) /
    //   americanToDecimal(hedgeTwoLine);
    // const hedgeTwoWin = calculateWinnings(hedgeTwoVal, hedgeTwoLine);

    setBetOneWinnings(betOneWin);
    setHedgeOneWinnings(hedgeOneWin);
    setHedgeTwoValue(hedgeTwoVal);
    setHedgeTwoWinnings(hedgeTwoWin);
    setCalculated(true);
  };

  const parseValue = (input, setValue) => {
    const parsedVal = parseInt(input.current.value);
    setValue(isNaN(parsedVal) ? 0 : parsedVal);
  }

  const calcValues = () => {
    parseValue(betOneValRef, setBetOneValue);
    parseValue(betOneLineRef, setBetOneLine);
    parseValue(hedgeOneValRef, setHedgeOneValue);
    parseValue(hedgeOneLineRef, setHedgeOneLine);
    parseValue(hedgeTwoLineRef, setHedgeTwoLine);

    calculateValues();
    // setBetOneValue(parseInt(betOneValRef.current.value));
    // setBetOneLine(parseInt(betOneLineRef.current.value));
    // setHedgeOneValue(parseInt(hedgeOneValRef.current.value));
    // setHedgeOneLine(parseInt(hedgeOneLineRef.current.value));
    // setHedgeTwoLine(parseInt(hedgeTwoLineRef.current.value));
    //console.log(betOneValRef.current.value);
    //console.log(refs[0][0].current)
    //setCalculated(true);
  };

  return (
    <Container>
      <p>
        This calculator is for hedging an initial bet with multiple hedge bets.
        For example, i
      </p>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Bet #1</InputGroup.Text>
        <Form.Control
          aria-label="Bet #1 Value"
          aria-describedby="basic-addon1"
          ref={betOneValRef}
          placeholder="Enter a value"
          //value={betOneValue}
          //onChange={(event) => handleValue(event.target.value, setBetOneValue)}
          //onChange={calcValues}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon2">Bet Line #1</InputGroup.Text>
        <Form.Control
          aria-label="Bet #1 Line"
          aria-describedby="basic-addon2"
          ref={betOneLineRef}
          placeholder="Enter odds"
          // value={betOneLine}
          // onChange={(event) => handleLine(event.target.value, setBetOneLine)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">Hedge #1</InputGroup.Text>
        <Form.Control
          aria-label="Hedge #1 Value"
          aria-describedby="basic-addon3"
          ref={hedgeOneValRef}
          placeholder="Enter a value"
          // value={hedgeOneValue}
          // onChange={(event) =>
          //   handleValue(event.target.value, setHedgeOneValue)
          // }
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon4">Hedge Line #1</InputGroup.Text>
        <Form.Control
          aria-label="Hedge #1 Line"
          aria-describedby="basic-addon4"
          ref={hedgeOneLineRef}
          placeholder="Enter odds"
          // value={hedgeOneLine}
          // onChange={(event) => handleLine(event.target.value, setHedgeOneLine)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon5">Hedge Line #2</InputGroup.Text>
        <Form.Control
          aria-label="Hedge #2 Line"
          aria-describedby="basic-addon5"
          ref={hedgeTwoLineRef}
          placeholder="Enter odds"
          // value={hedgeTwoLine}
          // onChange={(event) => handleLine(event.target.value, setHedgeTwoLine)}
        />
      </InputGroup>
      <Button onClick={() => calcValues()}>Calculate</Button>
      {/* {calculated && <p>{betOneValue.toFixed(2)}</p>} */}
      {calculated && 
      <p>
        With your bet 1 of ${betOneValue.toFixed(2)} with {appendOddsSign(betOneLine)}, hedge 1 of ${hedgeOneValue.toFixed(2)} with {appendOddsSign(hedgeOneLine)}, and hedge 2 with {appendOddsSign(hedgeTwoLine)}, you will need to bet ${hedgeTwoValue.toFixed(2)}.<br/>
        If you win bet 1, you will profit ${betOneWinnings.toFixed(2)} - ${hedgeOneValue.toFixed(2)} - ${hedgeTwoValue.toFixed(2)} = ${(betOneWinnings - hedgeOneValue - hedgeTwoValue).toFixed(2)}.<br/>
        If you win the hedge bet, you will profit ${hedgeOneWinnings.toFixed(2)} + ${hedgeTwoWinnings.toFixed(2)} - ${betOneValue.toFixed(2)} = ${(hedgeOneWinnings + hedgeTwoWinnings - betOneValue).toFixed(2)}.
      </p>}
    </Container>
  );
};

export default Home;
