import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Joke from './Joke';

test('Joke component receives props and then renders text', () => {
  // Renders Joke component with some text prop.
  const { getByTestId, getByText, container } = render(
    <Joke text='The funniest joke this year.' />,
  );

  // Expects Joke component to render correct text.
  expect(getByTestId('joke-text')).toHaveTextContent(
    'The funniest joke this year.',
  );
});
