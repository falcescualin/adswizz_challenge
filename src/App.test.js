import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AdsWizzTestForm from "./App";

const name = "JC";
const age = "10";

test("The user submits the form with JC as name;", () => {
  const renderedApp = render(<AdsWizzTestForm />);
  const nameInput = renderedApp.getByLabelText("Name");
  const submitButton = renderedApp.getByText("Submit");

  fireEvent.change(nameInput, { target: { value: name } });

  expect(nameInput.value).toBe(name);

  submitButton.click();

  const summaryName = renderedApp.getByText(name);
  const summaryAge = renderedApp.getByText(age);

  expect(summaryName.textContent).toBe(name);
  expect(summaryAge.textContent).toBe(age);
});

test("The user submits the form with JC as name, 10 as age;", () => {
  const renderedApp = render(<AdsWizzTestForm />);
  const nameInput = renderedApp.getByLabelText("Name");
  const ageInput = renderedApp.getAllByLabelText("Age")[1];
  const submitButton = renderedApp.getByText("Submit");

  fireEvent.change(nameInput, { target: { value: name } });
  fireEvent.change(ageInput, { target: { value: age } });

  expect(nameInput.value).toBe(name);
  expect(ageInput.value).toBe(age);

  submitButton.click();

  const summaryName = renderedApp.getByText(name);
  const summaryAge = renderedApp.getByText(age);

  expect(summaryName.textContent).toBe(name);
  expect(summaryAge.textContent).toBe(age);
});
