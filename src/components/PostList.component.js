import React from 'react';
import { NewPost, Post } from './index';
import { AuthContext } from '../state/auth-context';

const PostList = (props) => {
  const { user, postsArray } = props;
  return (
    <React.Fragment>
      <AuthContext.Consumer>
        {({userId}) => ( userId === user._id &&
          <NewPost user={user} onSubmitPost={props.handleSubmitPost}/>    
        )}
      </AuthContext.Consumer>
      {postsArray.map((post) => (
        <Post key={post._id} post={post} 
          onLike={props.handleLike} 
          onUpdate={props.handleUpdatePost}
          onDelete={props.handleDeletePost} />
      ))}
    </React.Fragment>
  );
}

export default PostList;