import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Staircase({ stepSet = [1, 2] }) {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState();

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const answer = numWays(input, stepSet);
    setAnswer(answer);
  };

  const numWays = (NumberOfSteps, stepSet) => {
    if (NumberOfSteps === 0) return 1;
    const nums = Array(Number(NumberOfSteps) + 1);
    nums[0] = 1;
    for (let i = 1; i <= NumberOfSteps; i++) {
      let total = 0;
      stepSet.forEach((j) => {
        if (i - j >= 0) {
          total += nums[i - j];
        }
      });
      nums[i] = total;
    }
    return nums[NumberOfSteps];
  };

  return (
    <>
      Staircase calculator
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={input}
            onChange={onChange}
            data-testid="number-of-steps"
          />
          <button data-testid="check-button">Check</button>
        </form>
        <div data-answer data-testid="answer">
          {answer}
        </div>
      </div>
    </>
  );
}

Staircase.propTypes = {
  stepSet: PropTypes.arrayOf(PropTypes.number),
};
