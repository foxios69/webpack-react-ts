import React from 'react';

import './index.scss';
import './index.css';
import avatar from './assets/image.png';
import parrot from './assets/detailed-parrot-polyprismatic.svg';

export const App = () => {
  // const titleMessage = process.env.appTitle;
  // console.log(titleMessage);

  return (
    <>
      {' '}
      <h1>{process.env.APP_TITLE}</h1>
      <p>kek</p>
      <img src={avatar}></img>
      <img src={parrot}></img>
    </>
  );
};
