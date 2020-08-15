import React from "react";
import axios from 'axios';
import { Sidebar, Timeline} from './index';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      postsArray: []
    }
    this.handleFetchTimeline = this.handleFetchTimeline.bind(this);
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleUpdatePost = this.handleUpdatePost.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  handleFetchTimeline = (postsArray) => {
    this.setState({ postsArray });
  }
  handleSubmitPost = (data) => {
    this.setState(prevState => ({
      ...prevState.postsArray.unshift(data)
    }))
  }
  handleDeletePost = (id) => {
    this.setState(prevState => ({
      postsArray: prevState.postsArray.filter(post => post._id != id )
    }));
  }
  handleUpdatePost = (id, content) => {
    let post = this.state.postsArray.find(post => post._id == id);
    if(post) post.content = content;
    this.setState(prevState => ({
      postsArray: prevState.postsArray
    }));
  }
  handleLike = (id, userId) => {
    let post = this.state.postsArray.find(post => post._id == id);
    if(post) post.likes.push(userId);
    this.setState(prevState => ({
      postsArray: prevState.postsArray
    }));
  }
  fetchUsers = async () => { // Find people you may know
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
    // const { postsArray } = this.state;
    const { user, users } = this.props;

    const props = {
      user: this.props.user,
      postsArray: this.state.postsArray,
      onFetch: this.handleFetchTimeline,
      handleSubmitPost: this.handleSubmitPost,
      handleDeletePost: this.handleDeletePost,
      handleUpdatePost: this.handleUpdatePost,
      handleLike: this.handleLike
    }
    return (
      <div className='home'>
        <Timeline {...props} />
        <Sidebar user={user} users={users} onUpdateRequests={this.props.onUpdateRequests} />
      </div>
    );
  }
}
export default Home;