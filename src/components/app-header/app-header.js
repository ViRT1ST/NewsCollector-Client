import './app-header.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

function AppHeader() {

  const navData = [
    { to: '/nc/unreaded', label: 'Unreaded' },
    { to: '/nc/saved', label: 'Saved' },
    { to: '/nc/profile', label: 'Profile' },
    { to: '/logout', label: 'Logout' },
  ];

  const NavItems = navData.map(({ to, label }) => {
    return (
      <li key={label} className="nav-item">
        <NavLink className="nav-link" to={to}>{label}</NavLink>
      </li>
    );
  });

  return (
    <header>
      <div className="navigation sticky-top">
        <nav className="navbar navbar-expand-md navbar-light bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">News Collector</a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" />
              <ul className="navbar-nav">{NavItems}</ul>
            </div>

          </div>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;



