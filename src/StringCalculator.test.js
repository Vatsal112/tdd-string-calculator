import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import StringCalculator from "./StringCalculator";

describe("Testcase for String Calculator", () => {
  let input, button;

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<StringCalculator />);
    input = screen.getByTestId("calculator-input");
    button = screen.getByRole("button", { name: /calculate/i });
  });

  test("it should renders input box and calculate button", () => {
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("it should return 0 when input is empty", () => {
    fireEvent.click(button);

    expect(screen.getByText("Result: 0")).toBeInTheDocument();
  });

  test("it should return number itself when there is only single number in string", () => {
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

  test("it should give sum of comma separated values", () => {
    fireEvent.change(input, { target: { value: "3,5" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 8")).toBeInTheDocument();
  });

  test("it should handle new line delimiter in input and give sum of comma separated values", () => {
    fireEvent.change(input, { target: { value: "1\\n2,3" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 6")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "1\\n2\\n3" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 6")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "1,2\\n3,4\\n5" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 15")).toBeInTheDocument();
  });

  test("it should handle custom delimeter", () => {
    fireEvent.change(input, { target: { value: "//;\\n1;2" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 3")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "//|\\n1|2|3" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 6")).toBeInTheDocument();
  });

  test("is should handle negative numbers", () => {
    fireEvent.change(input, { target: { value: "-1,-2,-3" } });
    fireEvent.click(button);
    expect(
      screen.getByText("Error: negative numbers not allowed -1,-2,-3")
    ).toBeInTheDocument();
  });

  test("it should ignore numbers greater than 1000", () => {
    fireEvent.change(input, { target: { value: "1001,2,3" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 5")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "//;\\n1001;10;20" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 30")).toBeInTheDocument();
  });

  test("it should handle delimeters of any length", () => {
    fireEvent.change(input, { target: { value: "//[***]\\n1***2***3" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 6")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "//[+++]\\n1+++2+++3" } });
    fireEvent.click(button);
    expect(screen.getByText("Result: 6")).toBeInTheDocument();
  });
});
