import React from 'react';
import axios from 'axios';
import { Route, BrowserRouter, Switch, Redirect, Link } from 'react-router-dom';
import { Navbar, Home, Login, Signup, Profile, FindFriends, Settings, PrivateRoute } from './components/index';
import { AuthContext } from './state/auth-context';

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
  auth: {
    userId: '',
    loggedIn: false
  },
  token: '',
  users: [],
  activeItem: 'home'
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
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
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
  }
  handleLogIn = (data) => {
    this.setState({
      ...this.state,
      token: data.token,
      auth: { userId: data.user._id, loggedIn: true },
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
    const { auth, user, users, activeItem } = this.state;
    return (
      <BrowserRouter>
        <AuthContext.Provider value={this.state.auth}>
          <div className="main">
            { auth.loggedIn && 
              <Navbar user={user} activeItem={activeItem} onLogout={this.handleLogOut} onItemClick={this.handleItemClick}/>
            }
            <div className="main-content">
              <Switch>
                <Route exact path="/login" 
                  render={() => !auth.loggedIn ? <Login onSubmit={this.handleLogIn}/> : <Redirect to="/"/> }
                />
                <Route exact path="/signup" 
                  render={() => <Signup onSubmit={this.handleLogIn}/>}
                />
                <PrivateRoute exact path="/" component={Home} user={user} 
                  users={users} onUpdateUsers={this.handleUsers} onUpdateRequests={this.handleRequests} />
                <PrivateRoute path="/user/:id" component={Profile} />
                <PrivateRoute path="/findfriends" component={FindFriends} user={user} />
                <PrivateRoute path="/settings" component={Settings} user={user} />
                <Route path="*" >
                  <div>
                    <p>Page not found!</p>
                    <Link to="/">Return home</Link>
                  </div> 
                </Route>
              </Switch>
            </div>
          </div>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;