import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LogoutButton from './auth/LogoutButton';
// import DemoUserButton from './auth/DemoUserButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const profImage = user?.img_url
  let navContent = null;
  if(!user) {
    navContent = (
      <ul className='navbar'>
        <li>
          <img src='https://user-images.githubusercontent.com/73211975/127380259-8872d61e-851a-4aa5-8152-baec2618e00d.png' alt='logo' id='navbar__logo' />
        </li>
        <li className='navbar__link'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li className='navbar__link'>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li className='navbar__link'>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li className='navbar__link'>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        {/* <li className="navbar__button">
          <DemoUserButton />
        </li> */}
      </ul>
    )
  } else {
    navContent = (
        <ul className="navbar">
          <li>
            <img src='https://user-images.githubusercontent.com/73211975/127380259-8872d61e-851a-4aa5-8152-baec2618e00d.png' alt='logo' id='navbar__logo' />
          </li>
          <li className="navbar__link">
            <NavLink to='/discover' exact={true}  activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to={`/my/transaction/history`} exact={true} activeClassName='active'>
              Activity
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to={`/my/wallet`} exact={true} activeClassName='active'>
              Wallet
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to={`/my/SendNrequest`} exact={true} activeClassName='active'>
              Send and Request
            </NavLink>
          </li>
          {/* <li className="navbar__link">
            <NavLink to={`/users/${user.id}`} exact={true} activeClassName='active'>
              Profile
            </NavLink>
          </li> */}
          {/* <li className="navbar__link">
              <img alt="profile-pic" src={`${profImage}`} style={{height:'65px', width:'65px', 'borderRadius':'50%', margin: '5px', marginTop : '10px', objectFit: 'cover'}}/>
          </li> */}
          <li className="navbar__button">
            <LogoutButton />
          </li>
        </ul>
    )
  }
  return (
    // ask Tony about this tomorrow
    <nav>
      { user? <div className="nav-logo">
          <NavLink id="navbar__brand-home" to='/discover' exact={true} activeClassName='active'>
          </NavLink>
        </div> : <div className="nav-logo">
          <NavLink id="navbar__brand-home" to='/' exact={true} activeClassName='active'>
          </NavLink>
        </div>}
      {navContent}
    </nav>
  );
};

export default NavBar;
