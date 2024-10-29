import { useState } from "react";

function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (input.trim() === "") {
      setResult(0);
      return;
    }

    //handle new line delimiters and invalid inputs.
    const numbers = input
      .replace(/\\n/g, ",") // Convert all \n to commas
      .split(",") // Split into array
      .map((num) => parseInt(num.trim()) || 0); // Convert to numbers, handle invalid as 0
    let sum = 0;

    sum += numbers.reduce((acc, num) => acc + num, 0);

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
