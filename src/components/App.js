import React from 'react';
import { 
  Route,
  NavLink,
  BrowserRouter,
  Redirect,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Login from './Login';
import Signup from './Signup'
import Profile from './Profile';
import FindFriends from './FindFriends';
import Settings from './Settings';
import Footer from './Footer';

function PrivateRoute({ isAuth, children, ...rest}){
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? ( children ) : (
          <Redirect to={{ 
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      isAuth: true,
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        birthday: '',
        gender: ''
      }
    }
    this.handleSignUpInputChange = this.handleSignUpInputChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleLogInInputChange = this.handleLogInInputChange.bind(this);
    this.handleLogInSubmit = this.handleLogInSubmit.bind(this);
  }

  // fetch(event, input, reqMethod, url, )

  handleSignUpInputChange(name, value) {
    this.setState({
      user: {
        ...this.state.user,
        [name]: value  
      }
    });
  }

  handleGenderChange(gender) {
    this.setState({ user: { ...this.state.user, gender }});
  }

  async handleSignUpSubmit(event) {
    event.preventDefault();
    let userInput = this.state.user;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInput)
    };
    const response = await fetch('http://localhost:3001/signup', requestOptions);
    const data = await response.json();
    this.setState({ 
      ...this.state,
      token: data.token, 
      isAuth: true,
      user: data.user 
    });
  }

  handleLogInInputChange(name, value) {
    this.setState({ user: { ...this.state.user, [name]: value}});
  }

  async handleLogInSubmit(event) {
    event.preventDefault();
    const user = this.state.user;
    let email = user.email;
    let password = user.password;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    const response = await fetch('http://localhost:3001/login', requestOptions);
    const data = await response.json();
    this.setState({ 
      ...this.state,
      token: data.token, 
      isAuth: true,
      user: data.user 
    });
  }

  render() {
    const token = this.state.token;
    const isAuth = this.state.isAuth;
    const user = this.state.user;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" 
            render={(props) => !isAuth
              ? <Login 
                  user={user}
                  onLogInInputChange={this.handleLogInInputChange}
                  onLogInSubmit={this.handleLogInSubmit}
                  />
              : <Redirect to={{ pathname: "/", state: { from: props.location }}}/>
            }
          />
          <Route exact path="/signup" 
            render={(props) => !isAuth 
              ? <Signup 
                  user={user} 
                  onSignUpInputChange={this.handleSignUpInputChange}
                  onGenderChange={this.handleGenderChange} 
                  onSignUpSubmit={this.handleSignUpSubmit} /> 
              : <Redirect to={{ pathname: "/", state: { from: props.location }}}/>
            }
          />
          <PrivateRoute exact path="/" isAuth={isAuth}>
            <Home/>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

{/* <BrowserRouter>
  <div className="main">
    <div className="main-header">
      <ul className="menu">
        <li><NavLink to="/">Social Network</NavLink></li>
        { isAuth && 
          <React.Fragment>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/profile">Your Name</NavLink></li>
            <li><NavLink to="/findfriends">Find Friends</NavLink></li>
            <li><NavLink to="/settings">Settings</NavLink></li>
          </React.Fragment>
        }
      </ul>
    </div>          
    <div className="main-content">
      <div className="flex-container">
        <Switch>
          <Route exact path="/login" 
            render={(props) => !isAuth
              ? <Login 
                  user={user}
                  onLogInInputChange={this.handleLogInInputChange}
                  onLogInSubmit={this.handleLogInSubmit}
                  />
              : <Redirect to={{ pathname: "/", state: { from: props.location }}}/>
            }
          />
          <Route exact path="/signup" 
            render={(props) => !isAuth 
              ? <Signup 
                  user={user} 
                  onSignUpInputChange={this.handleSignUpInputChange}
                  onGenderChange={this.handleGenderChange} 
                  onSignUpSubmit={this.handleSignUpSubmit} /> 
              : <Redirect to={{ pathname: "/", state: { from: props.location }}}/>
            }
          />
          <PrivateRoute exact path="/" isAuth={isAuth}>
            <Home/>
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
              <NavLink to="/">Return home</NavLink>
            </div> 
          </Route>
        </Switch>             
      </div>
    </div>
    <Footer />
  </div>
</BrowserRouter> */}