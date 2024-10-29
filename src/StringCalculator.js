import { useState } from "react";
import "./StringCalculator.css";

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
    let delimiters = [","];

    // Check for custom delimiter
    if (input.startsWith("//")) {
      const parts = input.split("\\n");
      if (parts.length >= 2) {
        const delimiterPart = parts[0].substring(2);
        numbersString = parts[1];

        // Handle multiple delimiters in brackets
        if (delimiterPart.startsWith("[")) {
          delimiters = [];
          let bracketContent = delimiterPart;

          while (bracketContent.includes("[")) {
            const startIndex = bracketContent.indexOf("[");
            const endIndex = bracketContent.indexOf("]");
            if (startIndex === -1 || endIndex === -1) break;

            const delimiter = bracketContent.substring(
              startIndex + 1,
              endIndex
            );
            delimiters.push(delimiter);
            bracketContent = bracketContent.substring(endIndex + 1);
          }
        } else {
          // Handle single character delimiter
          delimiters = [delimiterPart];
        }
      }
    }

    // Escape special characters in delimiters
    delimiters = delimiters.map((d) =>
      d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    // Create regex pattern for all delimiters
    const delimiterPattern = delimiters.join("|");
    const delimiterRegex = new RegExp(delimiterPattern);

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
      setResult(null);
      return;
    }
    // Convert to numbers and sum
    const numbers = processedInput.split(",").map((num) => {
      const parsed = parseInt(num.trim());
      return isNaN(parsed) ? 0 : parsed <= 1000 ? parsed : 0;
    });

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    setResult(sum);
    setError(null);
  };

  return (
    <div className="calculator-container">
      <h1 className="calculator-header">String Calculator</h1>
      <input
        type="text"
        placeholder="Enter comma-separated numbers"
        value={input}
        data-testid="calculator-input"
        onChange={(e) => setInput(e.target.value)}
        className="calculator-input"
      />
      <button onClick={handleCalculate} className="calculator-button">
        Calculate
      </button>
      {error && <p className="calculator-error">Error: {error}</p>}
      {result !== null && <p className="calculator-result">Result: {result}</p>}
    </div>
  );
}

export default StringCalculator;
