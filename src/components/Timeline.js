import React, { useEffect } from 'react';
import axios from 'axios';
import { NewPost, Post } from "./index";

function Timeline(props) {
  const { postsArray, user } = props;
  useEffect(() => {
    // Get timeline posts
    (async () => {
      try {
        let data = [];
        const response = await axios.get('/timeline');
        // , { headers: {
        //   'Authorization': 'Bearer ' + props.token
        // }}
        for (const post of response.data) {
          let user = await axios.get(`/user/meta?id=${post.owner}`)
          data.push({...post, ...{owner: user.data}})
        }
        props.onFetch(data);
      } catch(e) {
        console.log(e);
      }
    })();
  },[user]);

  return (
    <div className="timeline">
      <NewPost user={user} onSubmitPost={props.handleSubmitPost}/>
      {postsArray.map((post) => (
        <Post key={post._id} user={user} {...post} 
          onLike={props.handleLike} 
          onUpdate={props.handleUpdatePost}
          onDelete={props.handleDeletePost} />
      ))}
    </div>
  );
}

export default Timeline;