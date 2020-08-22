import React from "react";

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
      postsArray: prevState.postsArray.filter(post => post._id !== id )
    }));
  }
  handleUpdatePost = (id, content) => {
    let post = this.state.postsArray.find(post => post._id === id);
    if(post) post.content = content;
    this.setState(prevState => ({
      postsArray: prevState.postsArray
    }));
  }
  handleLike = (id, userId) => {
    let post = this.state.postsArray.find(post => post._id === id);
    if(post) post.likes.push(userId);
    this.setState(prevState => ({
      postsArray: prevState.postsArray
    }));
  }
  componentDidMount(){
    this.props.onFetch(this.handleFetch);
  }
  componentDidUpdate(prevProps) {
    const { url } = this.props.match;
    if(url === "/") {
      const { requests } = this.props.user;
      if(requests.length !== prevProps.user.requests.length) {
        this.props.onFetch(this.handleFetch);
      }
    }
    if (this.props.user._id.localeCompare(this.props.match.params.id) !== 0) {
      this.props.onFetch(this.handleFetch);
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