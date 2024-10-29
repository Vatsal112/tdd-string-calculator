import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import StringCalculator from "./StringCalculator";

describe("Testcase for String Calculator", () => {
  test("it should renders input box and calculate button", () => {
    render(<StringCalculator />);
    const input = screen.getByTestId("calculator-input");
    const button = screen.getByRole("button", { name: /Calculate/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("it should return 0 when input is empty", () => {
    render(<StringCalculator />);

    const button = screen.getByRole("button", { name: /calculate/i });
    fireEvent.click(button);

    expect(screen.getByText("Result: 0")).toBeInTheDocument();
  });
});
