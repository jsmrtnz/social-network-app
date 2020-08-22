import React from "react";
import axios from 'axios';
import { Sidebar, PostList, PostListData } from './index';
import { Grid } from 'semantic-ui-react';

class Home extends React.Component {
  fetchUsers = async () => {
    try {
      const response = await axios.get('/users?limit=5&skip=0');
      this.props.onUpdateUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  fetchFriendRequests = async () => {
    try {
      let requestsArray = [];
      const response = await axios.get('/fr');
      for (const request of response.data) {
        let user = await axios.get(`/user/meta?id=${request.from}`)
        requestsArray.push({_id: request._id, user: user.data});
      };
      this.props.onUpdateRequests(requestsArray);
    } catch (e) {
      console.log(e);
    }
  }
  fetchPosts = async (callback) => {
    try {
      let data = [];
      const response = await axios.get('/timeline');
      for (const post of response.data) {
        let user = await axios.get(`/user/meta?id=${post.owner}`)
        data.push({...post, ...{owner: user.data}})
      }
      callback(data);
    } catch(e) {
      console.log(e);
    }
  }
  componentDidMount(){
    this.fetchFriendRequests();
    this.fetchUsers();
  }
  componentDidUpdate(prevProps) {
    const { requests } = this.props.user;
    if(requests.length !== prevProps.user.requests.length) {
      this.fetchUsers();
    }
  }
  render(){
    const { user, users } = this.props;
    return (
      <Grid centered>
        <Grid.Column width={8}>
          <PostListData 
            user={user} match={this.props.match} onFetch={this.fetchPosts}
            render={({ ...props }) => <PostList {...props} />} />
        </Grid.Column>
        <Grid.Column width={4}>
          <Sidebar user={user} users={users} onUpdateRequests={this.props.onUpdateRequests} />
        </Grid.Column>
      </Grid>
    );
  }
}
export default Home;