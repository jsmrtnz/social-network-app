import React from 'react';
import { 
  Route,
  BrowserRouter,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';

import { ReactComponent as UserIcon } from './icons/user.svg';
import { ReactComponent as UsersIcon } from './icons/users.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as LogoutIcon } from './icons/logout.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { useState } from 'react';

const initialState = {
  isAuth: false,
  token: '',
  user: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    birthday: '',
    gender: ''
  },
  newPost: ''
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.resetState = this.resetState.bind(this);
  }
  resetState() {
    const keys = Object.keys(this.state);
    const stateReset = keys.reduce((acc, v) => ({ ...acc, [v]: undefined }), {});
    this.setState({ ...stateReset, ...initialState });
  }
  handleSubmit(data) {
    this.setState({
      ...this.state,
      isAuth: true,
      token: data.token,
      user: data.user,
    });
  }
  handleSubmitPost(data) {
    this.setState({
      ...this.state,
      newPost: data
    });
  }
  handleLogOut = async () => {
    try {
      const response = await axios.post('/logout');
      this.resetState();
    } catch(e) {
      console.log(e);
    }
  }
  componentDidMount(){
    const validateCookie = async () => {
      try {
        const response = await axios.get('/validate_cookie');
        if(response){
          this.setState({
            ...this.state,
            isAuth: true,
            token: response.data.token,
            user: response.data.user,
          });
        }
      } catch(e) {
        console.log(e);
      }
    };
    validateCookie();
  }
  render() {
    const {isAuth, user } = this.state;
    return (
      <BrowserRouter>
        <div className="main">
          { isAuth && 
            <Navbar>
              <span className="navbar-title">
                <NavLink to="/" className='link'>Social Network</NavLink>
              </span>
              <NavItem icon={<UserIcon />} text={user.firstname} />
              <NavItem text={"Home"} />
              <NavItem icon={<UsersIcon />} />
              <NavItem icon={<CaretIcon />}>
                <DropdownMenu user={user} onLogOut={this.handleLogOut}/>
              </NavItem>
            </Navbar>
          }
          <div className="main-content">
            <Switch>
              <Route exact path="/login" 
                render={() => !isAuth ? <Login onSubmit={this.handleSubmit}/> : <Redirect to="/"/> }
              />
              <Route exact path="/signup" 
                render={() => <Signup onSubmit={this.handleSubmit}/>}
              />
              <PrivateRoute exact path="/" isAuth={isAuth}>
                <Home {...this.state} onSubmitPost={this.handleSubmitPost}/>
              </PrivateRoute>
              <PrivateRoute path="*" isAuth={isAuth}>
                <Home {...this.state}/>
              </PrivateRoute>
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
      <a href="#" className="link" onClick={() => setOpen(!open)}>
        {props.icon && <span className="icon-button">{props.icon}</span>}
        {props.text}
      </a>
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