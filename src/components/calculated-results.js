import { useState } from "react";

const CalculatedResults = ({
  betOneValue,
  betOneLine,
  hedgeOneValue,
  hedgeOneLine,
  hedgeTwoLine,
}) => {
  const [betOneWinnings, setBetOneWinnings] = useState(0);
  const [hedgeOneWinnings, setHedgeOneWinnings] = useState(0);
  const [hedgeTwoWinnings, setHedgeTwoWinnings] = useState(0);
  const [hedgeTwoValue, setHedgeTwoValue] = useState(0);
  const b1v = betOneValue;

  const appendOddsSign = (odds) => {
    return odds > 0 ? `+${odds}` : odds;
  };

  const americanToDecimal = (odds) => {
    return odds > 0 ? odds / 100 + 1 : 1 - 100 / odds;
  };

  const calculateWinnings = (value, odds) => {
    return value * (americanToDecimal(odds) - 1);
  };

  const calculateValues = () => {
    const betOneWin = calculateWinnings(betOneValue, betOneLine);
    const hedgeOneWin = calculateWinnings(hedgeOneValue, hedgeOneLine);
    const hedgeTwoVal =
      (betOneWin + betOneValue - (hedgeOneWin + hedgeOneValue)) /
      americanToDecimal(hedgeTwoLine);
    const hedgeTwoWin = calculateWinnings(hedgeTwoVal, hedgeTwoLine);

    setBetOneWinnings(betOneWin);
    setHedgeOneWinnings(hedgeOneWin);
    setHedgeTwoValue(hedgeTwoVal);
    setHedgeTwoWinnings(hedgeTwoWin);
  };

  return (
    <p>
      With your bet 1 of ${b1v.toFixed(2)} with{" "}
      {appendOddsSign(betOneLine)}, hedge 1 of ${hedgeOneValue.toFixed(2)} with{" "}
      {appendOddsSign(hedgeOneLine)}, and hedge 2 with{" "}
      {appendOddsSign(hedgeTwoLine)}, you will need to bet $
      {hedgeTwoValue.toFixed(2)}.<br />
      If you win bet 1, you will profit ${betOneWinnings.toFixed(2)} - $
      {hedgeOneValue.toFixed(2)} - ${hedgeTwoValue.toFixed(2)} = $
      {(betOneWinnings - hedgeOneValue - hedgeTwoValue).toFixed(2)}.<br />
      If you win the hedge bet, you will profit ${hedgeOneWinnings.toFixed(2)} +
      ${hedgeTwoWinnings.toFixed(2)} - ${betOneValue.toFixed(2)} = $
      {(hedgeOneWinnings + hedgeTwoWinnings - betOneValue).toFixed(2)}.
    </p>
  );
};

export default CalculatedResults;