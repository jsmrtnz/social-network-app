import React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { ProfileCard, PostListData, PostList, Friends } from './index';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      profile: null
    }
    this.fetchProfile = this.fetchProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }
  updateProfile = (profile) => {
    this.setState({ profile });
  }
  fetchProfile = async () => {
    try {
      const { data } = await axios.get(`/user?id=${this.props.match.params.id}`);
      this.setState({ profile: data });
    } catch (e) {
      console.log(e);
    }
  }
  componentDidMount() {
    this.fetchProfile();
  }
  componentDidUpdate(){
    if (this.state.key.localeCompare(this.props.match.params.id) !== 0) {
      this.setState({ key: this.props.match.params.id }, () => this.fetchProfile());
    }
  }
  render() {
    const { match: { path } } = this.props;
    const { profile } = this.state;
    return (
      <Switch>
        <Route exact path={path}>
          <Grid centered>
            <Grid.Column width={4}>
              {profile && 
                <ProfileCard profile={profile} 
                onUpdateUser={this.props.onUpdateUser} 
                onUpdateProfile={this.updateProfile} />
              }
            </Grid.Column>
            <Grid.Column width={8}>
            {profile && 
              <PostListData user={profile} match={this.props.match} 
              render={({ ...props }) => <PostList {...props} />} />
            }
            </Grid.Column>
          </Grid>
        </Route>
        <Route path={`${path}/friends`}>
          <Friends user={profile} />
        </Route>
      </Switch>
    );
  }
}
export default Profile;