import React from 'react';
import { NewPost, Post } from './index';

const PostList = (props) => {
  const { user, postsArray } = props;
  return (
    <React.Fragment>
      <NewPost user={user} onSubmitPost={props.handleSubmitPost}/>
      {postsArray.map((post) => (
        <Post key={post._id} user={user} {...post} 
          onLike={props.handleLike} 
          onUpdate={props.handleUpdatePost}
          onDelete={props.handleDeletePost} />
      ))}
    </React.Fragment>
  );
}

export default PostList;