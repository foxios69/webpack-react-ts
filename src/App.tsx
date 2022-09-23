import React from 'react';

import './index.scss';
import './index.css';
import avatar from './assets/image.png';
import parrot from './assets/detailed-parrot-polyprismatic.svg';

export const App = () => {
  return (
    <>
      {' '}
      <h1>My React and TypeScript App!</h1>
      <p>kek</p>
      <img src={avatar}></img>
      <img src={parrot}></img>
    </>
  );
};
