import React from 'react';

function Post(props) {
  return (
    <div className="post" key={props._id}>
      <div className="post-user">

      </div>
      <div className="post-options">

      </div>
      <div className="post-content">
        <p>{props.content}</p>
      </div>
      <div className="send-like">

      </div>
      <div className="post-likes">

      </div>
    </div>
  );
}

export default Post;