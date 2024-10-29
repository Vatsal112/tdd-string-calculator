import { useState } from "react";

function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (input.trim() === "") {
      setResult(0);
      return;
    }

    //single input value
    if (input.length === 1) {
      if (!isNaN(parseInt(input))) {
        setResult(parseInt(input));
        return;
      }
      setResult(0);
      return;
    }

    const numbers = input.split(",").map((num) => Number(num.trim()));
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    setResult(sum);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter comma-separated numbers"
        value={input}
        data-testid="calculator-input"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
}

export default StringCalculator;
