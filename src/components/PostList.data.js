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
  }
  handleFetch = (postsArray) => {
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
  fetchData = async () => {
    try {
      let data = [];
      const response = await axios.get(`/${this.props.url}`);
      for (const post of response.data) {
        let user = await axios.get(`/user/meta?id=${post.owner}`)
        data.push({...post, ...{owner: user.data}})
      }
      this.handleFetch(data);
    } catch(e) {
      console.log(e);
    }
  }
  componentDidMount(){
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    const { requests } = this.props.user;
    if(requests.length !== prevProps.user.requests.length) {
      this.fetchData();
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