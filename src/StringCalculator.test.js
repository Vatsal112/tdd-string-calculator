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

  test("it should return number itself when there is only single number in string", () => {
    render(<StringCalculator />);

    const input = screen.getByTestId("calculator-input");
    const button = screen.getByRole("button", { name: /calculate/i });

    fireEvent.change(input, { target: { value: "3" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 3")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "6" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 6")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "9" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 9")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 0")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "g" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 0")).toBeInTheDocument();
  });
});
