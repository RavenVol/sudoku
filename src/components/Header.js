import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/header.css';

const Header = ({rerander}) => {
  return (
    <header className="header">
      <div className="menu">
        <NavLink
          to='/about'
          exact
          className="menuBtn"
          activeClassName="active"
          onClick={() => rerander()}
        >
          About
        </NavLink>
        <NavLink
          to='/sudoku'
          exact
          className="menuBtn"
          activeClassName="active"
          onClick={() => rerander()}
        >
          Sudoku
        </NavLink>
        <NavLink
          to='/solver'
          exact
          className="menuBtn"
          activeClassName="active"
          onClick={() => rerander()}
        >
          Solver
        </NavLink>
      </div>
    </header>
  )
}

export default Header;



