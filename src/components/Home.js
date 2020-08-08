import React from "react";
import { 
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';
import FindFriends from './FindFriends';
import FriendRequest from './FriendRequest';
import Settings from './Settings';
import Timeline from "./Timeline";

class Home extends React.Component {
  render() {
    const isAuth = this.props.isAuth;
    return (
      <div className='home'>
        <Switch>
          <PrivateRoute exact path="/" isAuth={isAuth}>
            <Timeline user={this.props.user} />
            <FriendRequest user={this.props.user} />
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
    );
  }
}
export default Home;