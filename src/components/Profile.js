import React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { ProfileCard, PostListData, PostList, Friends } from './index';
import { _arrayBufferToUrl } from '../utils/helpers';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.fetchProfile = this.fetchProfile.bind(this);
  }
  fetchProfile = async () => {
    try {
      const response = await axios.get('/profile');
      this.props.onUpdateUser(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  componentDidMount() {
    this.fetchProfile();
  }
  render() {
    const { user, match: { path } } = this.props;
    return (
      <Switch>
        <Route exact path={path}>
          <Grid centered>
            <Grid.Column width={4}>
              <ProfileCard user={user} />
            </Grid.Column>
            <Grid.Column width={8}>
              <PostListData user={user} url={'posts'} render={({ ...props }) => <PostList {...props} />} />
            </Grid.Column>
          </Grid>
        </Route>
        <Route path={`${path}/friends`}>
          <Friends user={user} />
        </Route>
      </Switch>
    );
  }
}
export default Profile;