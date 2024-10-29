import { useState } from "react";

function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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
        // Handle multi-character delimiter within brackets
        if (parts[0].includes("[") && parts[0].includes("]")) {
          delimiter = parts[0].substring(
            parts[0].indexOf("[") + 1,
            parts[0].indexOf("]")
          );
          // Escape special characters if they exist in delimiter
          delimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        } else {
          // Handle single character delimiter
          delimiter = parts[0].substring(2);
        }
        numbersString = parts.slice(1).join(); // Get the rest of the string
      }
    }
    const delimiterRegex = new RegExp(delimiter);
    // Replace newlines and custom delimiter with commas
    const processedInput = numbersString
      .replace(/\\n/g, ",")
      .split(delimiterRegex)
      .join(",");

    //to handle negative numbers
    const negativeNumbers = processedInput
      .split(",")
      .filter((n) => parseInt(n) < 0);

    if (negativeNumbers.length > 0) {
      setError(`negative numbers not allowed ${negativeNumbers.toString()}`);
      return;
    }
    // Convert to numbers and sum
    const numbers = processedInput.split(",").map((num) => {
      const parsed = parseInt(num.trim());
      return isNaN(parsed) ? 0 : parsed <= 1000 ? parsed : 0;
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
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
}

export default StringCalculator;
