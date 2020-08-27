import React from "react";
import axios from 'axios';

class PostListData extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      postsArray: []
    }
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleUpdatePost = this.handleUpdatePost.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.fetchTimeline = this.fetchTimeline.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
  }
  handleFetch = (postsArray) => {
    this.setState({ postsArray });
  }
  handleSubmitPost = (data) => {
    const newPostsArray = this.state.postsArray.unshift(data);
    this.setState({ ...newPostsArray })
  }
  handleDeletePost = (id) => {
    const newPostsArray = this.state.postsArray.filter(post => post._id !== id )
    this.setState({ postsArray: newPostsArray });
  }
  handleUpdatePost = (id, content) => {
    const newPostsArray = this.state.postsArray.map((post) => {
      if (post._id === id) {
        return { ...post, content };
      }
      return post;
    }); 
    this.setState({ postsArray: newPostsArray })
  }
  handleLike = (id, userId) => {
    let post = this.state.postsArray.find(post => post._id === id);
    if(post) post.likes.push(userId);
    this.setState(prevState => ({
      postsArray: prevState.postsArray
    }));
  }
  fetchTimeline = async () => {
    try {
      let data = [];
      const response = await axios.get('/timeline');
      for (const post of response.data) {
        let user = await axios.get(`/user/meta?id=${post.owner}`)
        data.push({...post, ...{owner: user.data}})
      }
      this.handleFetch(data);
    } catch(e) {
      console.log(e);
    }
  }
  fetchPosts = async () => {
    try {
      let data = [];
      const response = await axios.get(`/posts?id=${this.props.match.params.id}`);
      for (const post of response.data) {
        let user = await axios.get(`/user/meta?id=${post.owner}`)
        data.push({...post, ...{owner: user.data}})
      }
      this.handleFetch(data);
    } catch (e) {
      console.log(e);
    }
  }
  componentDidMount(){
    switch (this.props.match.path){
      case "/":
        this.fetchTimeline();
        break;
      case "/user/:id":
        this.fetchPosts();
        break;
      default:
        throw new Error(`Unhandled path: ${this.props.match.path}`)
    }
  }
  componentDidUpdate(prevProps) {
    switch (this.props.match.path) {
      case "/": {
        if(this.props.user.requests.length !== prevProps.user.requests.length) {
          this.fetchTimeline();
        }
        break;
      }
      case "/user/:id": {
        if (this.props.user._id.localeCompare(this.props.match.params.id) !== 0) {
          this.fetchPosts();
        }
        break;
      }
      default:
        throw new Error(`Unhandled path: ${this.props.match.path}`)
    }
  }
  render(){
    return this.props.render({
      user: this.props.user,
      postsArray: this.state.postsArray,
      handleSubmitPost: this.handleSubmitPost,
      handleDeletePost: this.handleDeletePost,
      handleUpdatePost: this.handleUpdatePost,
      handleLike: this.handleLike
    });
  }
}
export default PostListData;