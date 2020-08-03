import React from "react";
import { 
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';
import FindFriends from './FindFriends';
import Settings from './Settings';
import NewPost from "./NewPost";
import Timeline from "./Timeline";

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postsArray: []
    }
    this.handleUpdateTimeline = this.handleUpdateTimeline.bind(this);
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
  }
  handleUpdateTimeline(data){
    this.setState({
      postsArray: data
    })
  }
  handleSubmitPost(data){
    this.setState({
      ...this.state.postsArray.unshift(data)
    })
  }
  render() {
    const isAuth = this.props.isAuth;
    const postsArray = this.state.postsArray;
    return (
      <div className="flex-container">
        <Switch>
          <PrivateRoute exact path="/" isAuth={isAuth}>
            <NewPost {...this.props} onSubmitPost={this.handleSubmitPost}/>
            <Timeline postsArray={postsArray} onUpdateTimeline={this.handleUpdateTimeline}/>
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