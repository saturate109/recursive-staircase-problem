import { render, screen, fireEvent } from '@testing-library/react';
import Staircase from './Staircase';

const sets = [
  [1, 2],
  [2, 3],
  [1, 2, 3],
];

const steps = [
  { numSteps: 1, answers: [1, 0, 1] },
  { numSteps: 2, answers: [2, 1, 2] },
  { numSteps: 3, answers: [3, 1, 4] },
  { numSteps: 4, answers: [5, 1, 7] },
  { numSteps: 5, answers: [8, 2, 13] },
  { numSteps: 10, answers: [89, 7, 274] },
];

test('Check test cases', () => {
  const { rerender } = render(<Staircase />);
  sets.forEach((set, setIndex) => {
    rerender(<Staircase stepSet={set} />);
    const input = screen.getByTestId('number-of-steps');
    const button = screen.getByTestId('check-button');
    const answer = screen.getByTestId('answer');

    steps.forEach((currentStep) => {
      fireEvent.change(input, { target: { value: currentStep.numSteps } });
      fireEvent.click(button);
      expect(answer).toHaveTextContent(
        currentStep.answers[setIndex].toString()
      );
    });
  });
});
