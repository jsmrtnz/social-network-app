import React from 'react';
import axios from 'axios';
import { Route, BrowserRouter, Switch, Redirect, Link } from 'react-router-dom';
import { Navbar, Home, Login, Signup, Profile, FindFriends, Settings, PrivateRoute } from './components/index';

const initialState = {
  user: {
    firstname: '',
    lastname: '',
    email: '',
    birthday: '',
    gender: '',
    friends: [],
    requests: []
  },
  users: [],
  isAuth: false,
  token: '',
  activeItem: 'home'
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleResetState = this.handleResetState.bind(this);
    // this.handleUser = this.handleUser.bind(this);
    this.handleUsers = this.handleUsers.bind(this);
    this.handleRequests = this.handleRequests.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleResetState = () => {
    const keys = Object.keys(this.state);
    const stateReset = keys.reduce((accumulator, value) => ({ ...accumulator, [value]: undefined }), {});
    this.setState({ ...stateReset, ...initialState });
  }
  // handleUser = (user) => {
  //   this.setState({ user: {...this.state.user, ...user }});
  // }
  handleUsers = (usersArray) => {
    this.setState({ ...this.state, users: usersArray });
  }
  handleRequests = (requestsArray) => {
    this.setState({ ...this.state, user: { 
      ...this.state.user, requests: requestsArray } });
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
        this.handleLogIn(response.data);
      } catch(e) {
        console.log(e);
      }
    })();
  }
  render() {
    const { isAuth, user, users, activeItem } = this.state;
    return (
      <BrowserRouter>
        <div className="main">
          { isAuth && 
            <Navbar user={user} activeItem={activeItem} onLogout={this.handleLogOut} onItemClick={this.handleItemClick}/>
          }
          <div className="main-content">
            <Switch>
              <Route exact path="/login" 
                render={() => !isAuth ? <Login onSubmit={this.handleLogIn}/> : <Redirect to="/"/> }
              />
              <Route exact path="/signup" 
                render={() => <Signup onSubmit={this.handleLogIn}/>}
              />
              <PrivateRoute exact path="/" isAuth={isAuth} component={Home} user={user} 
                users={users} onUpdateUsers={this.handleUsers} onUpdateRequests={this.handleRequests} />
              <PrivateRoute path="/user/:id" isAuth={isAuth} component={Profile} user={user} />
              <PrivateRoute path="/findfriends" isAuth={isAuth} component={FindFriends} />
              <PrivateRoute path="/settings" isAuth={isAuth} component={Settings} />
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

export default App;