import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/home.css';

const Home = ({setFirstTime, firstTime}) => {
  !firstTime && setFirstTime(true);
  return (
    <div className="homePage">
      <div className="curtain">
        <div className="title">
          <h1 className="gameName">SUDOKU</h1>
          <p className="author">by Raven</p>
        </div>
        <div className="homeMenu">
          <NavLink
            to='/about'
            exact
            className="homeMenuBtn1"
            activeClassName="active"
            onClick={() => setFirstTime(false)}
          >
            About
          </NavLink>
          <NavLink
            to='/sudoku'
            exact
            className="homeMenuBtn2"
            activeClassName="active"
            onClick={() => setFirstTime(false)}
          >
            New Game
          </NavLink>
          <NavLink
            to='/solver'
            exact
            className="homeMenuBtn3"
            activeClassName="active"
            onClick={() => setFirstTime(false)}
          >
            Solver
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
