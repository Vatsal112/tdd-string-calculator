import { useState } from "react";

function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (input.trim() === "") {
      setResult(0);
      return;
    }

    let numbersString = input;
    let delimiter = ",";

    // Check for custom delimiter
    if (input.startsWith("//")) {
      const parts = input.split("\\n");
      if (parts.length >= 2) {
        delimiter = parts[0].substring(2); // Get the delimiter after //
        numbersString = parts.slice(1).join(); // Get the rest of the string
      }
    }
    // Replace newlines and custom delimiter with commas
    const processedInput = numbersString
      .replace(/\\n/g, ",")
      .split(delimiter)
      .join(",");

    // Convert to numbers and sum
    const numbers = processedInput.split(",").map((num) => {
      const parsed = parseInt(num.trim());
      return isNaN(parsed) ? 0 : parsed;
    });

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
