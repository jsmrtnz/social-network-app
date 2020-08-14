import React, { useState } from 'react';
import { Route, BrowserRouter, Switch, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Home, Login, Signup, Profile, FindFriends, Settings, PrivateRoute } from './components/index';

import { ReactComponent as UserIcon } from './icons/user.svg';
import { ReactComponent as UsersIcon } from './icons/users.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as LogoutIcon } from './icons/logout.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';

const initialState = {
  isAuth: false,
  token: '',
  user: {
    firstname: '',
    lastname: '',
    email: '',
    birthday: '',
    gender: '',
    friends: [],
    requests: []
  },
  users: []
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleResetState = this.handleResetState.bind(this);
    this.handleUsers = this.handleUsers.bind(this);
    this.handleRequests = this.handleRequests.bind(this);
  }
  handleResetState = () => {
    const keys = Object.keys(this.state);
    const stateReset = keys.reduce((accumulator, value) => ({ ...accumulator, [value]: undefined }), {});
    this.setState({ ...stateReset, ...initialState });
  }
  handleUsers = (usersArray) => {
    this.setState({ ...this.state, users: usersArray });
  }
  handleRequests = (requestsArray) => {
    this.setState({ ...this.state, user: { 
      ...this.state.user, requests: requestsArray } });
      // [...this.state.user.requests, request]
  }
  handleLogIn = (data) => {
    this.setState({
      ...this.state,
      isAuth: true,
      token: data.token,
      user: { ...this.state.user, ...data.user }
    });
  }
  handleLogOut = async () => {
    try {
      await axios.post('/logout');
      this.handleResetState();
    } catch(e) {
      console.log(e);
    }
  }
  componentDidMount = () => {
    (async () => {
      try {
        const response = await axios.get('/validate_cookie');
        if(response) this.handleLogIn(response.data);
      } catch(e) {
        console.log(e);
      }
    })();
  }
  render() {
    const {isAuth, user } = this.state;
    return (
      <BrowserRouter>
        <div className="main">
          { isAuth && 
            <Navbar>
              <span className="navbar-title">
                <Link to="/" className='link'>Social Network</Link>
              </span>
              <NavItem icon={<UserIcon />} text={user.firstname} to="/profile" />
              <NavItem text={"Home"} to="/" />
              <NavItem icon={<UsersIcon/>}  to="/findfriends" />
              <NavItem icon={<CaretIcon/>} to="">
                <DropdownMenu user={user} onLogOut={this.handleLogOut}/>
              </NavItem>
            </Navbar>
          }
          <div className="main-content">
            <Switch>
              <Route exact path="/login" 
                render={() => !isAuth ? <Login onSubmit={this.handleLogIn}/> : <Redirect to="/"/> }
              />
              <Route exact path="/signup" 
                render={() => <Signup onSubmit={this.handleLogIn}/>}
              />
              <PrivateRoute exact path="/" isAuth={isAuth}>
                <Home {...this.state} onUpdateUsers={this.handleUsers} onUpdateRequests={this.handleRequests} />
              </PrivateRoute>
              <PrivateRoute path="/profile" isAuth={isAuth}>
                <Profile/>
              </PrivateRoute>
              <PrivateRoute path="/findfriends" isAuth={isAuth}>
                <FindFriends/>
              </PrivateRoute>
              <PrivateRoute path="/settings" isAuth={isAuth}>
                <Settings/>
              </PrivateRoute>
              <Route path="*" >
                <div>
                  <p>Page not found!</p>
                  <Link to="/">Return home</Link>
                </div> 
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <Link to={props.to} className="link" onClick={() => setOpen(!open)}>
        {props.icon && <span className="icon-button">{props.icon}</span>}
        {props.text}
      </Link>
      {open && props.children}
    </li>
  );
}

function DropdownMenu(props) {

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={props.onClick}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="nav-dropdown" > 
      <div className="menu">
        <DropdownItem
          leftIcon={<CogIcon />}>
          Settings
        </DropdownItem>
        <DropdownItem
         leftIcon={<LogoutIcon />} onClick={props.onLogOut}>
          Log Out
        </DropdownItem>
      </div>
    </div>
  );
}

export default App;