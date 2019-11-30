import React from 'react';
import axios from 'axios';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MockAxios from 'axios-mock-adapter';
import JokeGenerator from './JokeGenerator';

const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });

test('JokeGenerator component fetches random joke ane renders it', async () => {
  mock.onGet().replyOnce(200, {
    value: {
      joke: 'Really funny joke!',
    },
  });

  const { getByText, queryByText, queryByTestId } = render(<JokeGenerator />);

  expect(getByText(`You haven't loaded any joke yet!`)).toBeTruthy();

  fireEvent.click(getByText('Load a random joke'));

  expect(
    queryByText(`You haven't loaded any joke yet!`),
  ).not.toBeInTheDocument();

  expect(queryByText('Loading...')).toBeInTheDocument();

  await wait(() => expect(queryByText('Loading...')).toBeNull());

  expect(queryByTestId('joke-text')).toBeInTheDocument();
});
