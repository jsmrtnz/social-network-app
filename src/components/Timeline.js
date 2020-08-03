import React, { useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

function Timeline(props) {
  const postsArray = props.postsArray;
  useEffect(() => {
    async function fetchData(){
      try {
        const response = await axios.get('/timeline');
        // , { headers: {
        //   'Authorization': 'Bearer ' + props.token
        // }}
        props.onUpdateTimeline(response.data);
      } catch(e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const postsList  = postsArray.map(function(post){
    return <Post {...post}/>
    // return <div className="post" key={post._id}><p>{post.content}</p></div>;
  });
  
  return (
    <div className="timeline">
      { postsList }
    </div>
  );
}

export default Timeline;