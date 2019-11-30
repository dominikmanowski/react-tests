import React, { useState, useCallback, memo } from 'react';
import axios from 'axios';
import Joke from '../Joke/Joke';

const JokeGenerator = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLoadJoke = useCallback(async () => {
    setLoading(true);
    const {
      data: {
        value: { joke },
      },
    } = await axios.get('https://api.icndb.com/jokes/random');
    setJoke(joke);
    setLoading(false);
  }, []);

  return (
    <>
      {!joke && !loading && <p>You haven't loaded any joke yet!</p>}
      {loading && <p>Loading...</p>}
      {joke && !loading && <Joke text={joke} />}
      <button onClick={handleLoadJoke} type='button' data-testid='loading-joke'>
        Load a random joke
      </button>
    </>
  );
};

export default memo(JokeGenerator);
